import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { DataStorageService } from '../../../../../servicios/localstorage/data-storage.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { debounceTime } from 'rxjs';
import { DateComponent } from "../../../../controles/form/date/date.component";
import { TimeComponent } from "../../../../controles/form/time/time.component";
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-comision-proceso-horario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzGridModule,
    NzIconModule,
    NzSwitchModule,
    NzDividerModule,
    NzButtonModule,
    NzPopconfirmModule,
    NzTableModule,
    NzSpinModule,
    DateComponent,
    TimeComponent,
    NzDatePickerModule,
    NzTimePickerModule
],
  templateUrl: './comision-proceso-horario.component.html',
  styleUrl: './comision-proceso-horario.component.css'
})
export class ComisionProcesoHorarioComponent {
  namespace = 'comision_proceso_horario';

  @Input() accion?: string;
  @Output() isValido = new EventEmitter<boolean>()

  cargando = false;

  form:FormGroup<any> = this.fb.group({
    usa_horarios: [true],
    fecha: [null],
    hora_inicial: [null],
    hora_final: [null],
    horarios: this.fb.array([]),
  });

  miembros: any[] = [];

  constructor(
    private dataStorageSrvc: DataStorageService,
    private fb: NonNullableFormBuilder,
  ) {}

  ngOnInit(): void {
    // Observables
    this.form.valueChanges.pipe(debounceTime(300)).subscribe((v) => {
      this.dataStorageSrvc.guardarEnNamespace(this.namespace, 'form', v, this.accion);
    });

    this.form.get('usa_horarios')?.valueChanges.subscribe((usar) => {
      this.cambiarHorarios(usar);
    });

    this.form.statusChanges.subscribe(status => {
      this.isValido.emit(status === 'VALID');
      console.log(this.form.value, status);
    });

    // Cargar datos
    const form = this.dataStorageSrvc.obtenerDeNamespace<any>(this.namespace, 'form', null, this.accion);    
    this.miembros = this.obtenerMiebros();
    
    // Cargar horarios preexistentes (para edición)
    const horariosPreexistentes = this.dataStorageSrvc.obtenerDeNamespace<any>(this.namespace, 'horarios', [], this.accion);
    if (horariosPreexistentes && horariosPreexistentes.length > 0) {
      this.cargarHorariosExistentes(horariosPreexistentes);
    }
    
    this.parsearFormMiembros(form);
    
    // Aplicar validaciones iniciales después de un breve delay para asegurar que todo esté inicializado
    setTimeout(() => {
      const usaHorarios = this.form.get('usa_horarios')?.value ?? true;
      this.cambiarHorarios(usaHorarios);
    }, 100);
  }

  cambiarHorarios(usar: boolean) {
    const controles = ['fecha', 'hora_inicial', 'hora_final'];
    console.log(`Cambiar horarios: usar=${usar}, controles:`, controles);
    
    (this.horarios.controls as FormGroup[]).forEach((control) => this.toggleFormValidators(control, controles, !usar));
    this.toggleFormValidators(this.form, controles, usar);
    
    // Forzar validación inmediata después del cambio
    setTimeout(() => {
      this.form.updateValueAndValidity();
      console.log('Estado del formulario después del cambio:', this.form.status);
      console.log('Errores del formulario:', this.form.errors);
      
      // Verificar errores en controles individuales
      controles.forEach(control => {
        const formControl = this.form.get(control);
        if (formControl && formControl.errors) {
          console.log(`Errores en ${control}:`, formControl.errors);
        }
      });
    }, 0);
  }
  
  obtenerMiebros(): any[] {
    const comisiones = this.dataStorageSrvc.obtenerDeNamespace<any[]>('comision_proceso_miembro', 'comisionesTransfer', [], this.accion);
    const formComision = this.dataStorageSrvc.obtenerDeNamespace<any>('comision_proceso_comision', 'form', null, this.accion);
    let comisionActualId = 0;
    if (formComision) comisionActualId = formComision.comision_id;
    const comision = comisiones.find(c => c.id === comisionActualId);
    return comision?.miembros || [];
  }

  parsearFormMiembros(form:any): void {
    if (form) {
      this.form.get('usa_horarios')?.setValue(form.usa_horarios);
      this.form.get('fecha')?.setValue(form.fecha);
      this.form.get('hora_inicial')?.setValue(form.hora_inicial);
      this.form.get('hora_final')?.setValue(form.hora_final);
      const horariosFormArray = this.fb.array(
        form.horarios?.map((h: any) => this.fb.group({
          miembro_id: [h.miembro_id],
          miembro: [h.miembro],
          fecha: [h.fecha, Validators.required],
          hora_inicial: [h.hora_inicial, Validators.required],
          hora_final: [h.hora_final, Validators.required]
        })) ?? []
      );
      this.form.setControl('horarios', horariosFormArray);
        
      // Verifica miembros nuevos y eliminados para sincronizar
      const miembrosIds = this.miembros.map(m => m.key);   
      // Elimina horarios de miembros que ya no existen
      for (let i = this.horarios.length - 1; i >= 0; i--) {
        const miembroId = this.horarios.at(i).get('miembro_id')?.value;
        if (!miembrosIds.includes(miembroId)) {
          this.horarios.removeAt(i);
        }
      }
      // Agrega horarios para nuevos miembros
      this.miembros.forEach(miembro => {
        if (!form.horarios.some((h: any) => h.miembro_id === miembro.key)) {
          this.agregarHorario(miembro);
        }
      });
      
      // Aplicar validaciones según el tipo de horario seleccionado
      this.cambiarHorarios(form.usa_horarios);
    } else {
      this.inicializarHorarios();
      // Aplicar validaciones iniciales
      this.cambiarHorarios(true); // Por defecto usa horario general
    }
  }

  setValorForm(control: string, valor: any) {
    this.form.get(control)?.setValue(valor);
  }

  get horarios(): FormArray {
    return this.form.get('horarios') as FormArray;
  }

  agregarHorario(miembro: any): void {
    const grupo = this.fb.group({
      miembro_id: [miembro.key],
      miembro: [miembro.title],
      fecha: [null, Validators.required],
      hora_inicial: [null, Validators.required],
      hora_final: [null, Validators.required]
    });
    this.horarios.push(grupo);
  }

  inicializarHorarios(): void {
    if (this.miembros?.length) {
      this.horarios.clear();
      this.miembros.forEach(miembro => this.agregarHorario(miembro));
    }
  }

  obtenerHorarioForm(index: number): FormGroup {
    return this.horarios.at(index) as FormGroup;
  }

  cargarHorariosExistentes(horariosData: any[]): void {
    this.horarios.clear();
    
    horariosData.forEach(horario => {
      const grupo = this.fb.group({
        miembro_id: [horario.miembro_id],
        miembro: [horario.miembro?.nombres + ' ' + horario.miembro?.apellidos || 'Miembro'],
        fecha: [horario.fecha ? new Date(horario.fecha) : null, Validators.required],
        hora_inicial: [horario.hora_inicial ? new Date(`1970-01-01T${horario.hora_inicial}`) : null, Validators.required],
        hora_final: [horario.hora_final ? new Date(`1970-01-01T${horario.hora_final}`) : null, Validators.required]
      });
      this.horarios.push(grupo);
    });
  }

  toggleFormValidators(form: FormGroup, controlNames: string[], required: boolean) {
  controlNames.forEach(name => {
    const control = form.get(name);
    if (control) {
      if (required) {
        control.setValidators(Validators.required);
      } else {
        control.clearValidators();
      }
      control.updateValueAndValidity();
    }
  });
}

}

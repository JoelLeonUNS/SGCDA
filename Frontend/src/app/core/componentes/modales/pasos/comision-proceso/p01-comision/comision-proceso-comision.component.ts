import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { InputComponent } from '../../../../controles/form/input/input.component';
import { SelectComponent } from "../../../../controles/form/select/select.component";
import { TextAreaComponent } from "../../../../controles/form/text-area/text-area.component";
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { DataStorageService } from '../../../../../servicios/localstorage/data-storage.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ComisionService } from '../../../../../servicios/rest/comision/comision.service';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { BuscarAgregarMultipleComponent } from "../../../../controles/form/buscar-agregar-multiple/buscar-agregar-multiple.component";
import { TablaPagAgregarMultipleAulasComponent } from "../../../../tablas/paginada/agregar-multiple/aulas/tabla-pag-agregar-multiple-aulas.component";
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-comision-proceso-comision',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzGridModule,
    NzIconModule,
    NzSwitchModule,
    SelectComponent,
    NzDividerModule,
    NzButtonModule,
    NzPopconfirmModule,
    TablaPagAgregarMultipleAulasComponent
],
  templateUrl: './comision-proceso-comision.component.html',
  styleUrl: './comision-proceso-comision.component.css'
})
export class ComisionProcesoComisionComponent {
  namespace = 'comision_proceso_comision';
  @Input() accion?: string;
  @Output() isValido = new EventEmitter<boolean>()

  form = this.fb.group({
    comision: [null],
    comision_id: [null, [Validators.required]],
    usa_aulas: [false],
    aula_ids: this.fb.control<any[]>([]),
    aulas: this.fb.control<any[]>([]),
});

  itemsInput = new Map<number, string>();

  get esEdicion(): boolean {
    return this.accion === 'EDITAR';
  }

  constructor(
    private dataStorageSrvc: DataStorageService,
    private fb: NonNullableFormBuilder,
    public comisionSrvc: ComisionService
  ) {}

  ngOnInit(): void {
    // Observables
    this.form.valueChanges.pipe(debounceTime(300)).subscribe((v) => {
      this.dataStorageSrvc.guardarEnNamespace(this.namespace, 'form', v, this.accion);
    });

    this.form.statusChanges.subscribe(status => {
      this.isValido.emit(status === 'VALID');
      console.log(status);
    });

    // Cargar datos
    const form = this.dataStorageSrvc.obtenerDeNamespace<any>(this.namespace, 'form', null, this.accion);
    if (form) this.form.setValue(form);
    this.itemsInput = this.getItemsInput();

    this.setAulasRequeridas(this.form.get('usa_aulas')!.value);

    // Deshabilitar el campo de comisión si está en modo edición
    if (this.esEdicion) {
      this.form.get('comision_id')?.disable();
      this.form.get('comision')?.disable();
    }
  }

  setAulasRequeridas(usa_aulas: boolean) {
    const control = this.form.get('aula_ids');
    if (usa_aulas) {
      control?.setValidators([Validators.required]);
    } else {
      control?.clearValidators();
    }
    control?.updateValueAndValidity();
  }

  setValorForm(control: string, valor: any) {
    this.form.get(control)?.setValue(valor);
  }

  setItemsInput(value: Map<number, string>) {
    if (!value || !(value instanceof Map)) return;
  
    const aula_ids = Array.from(value.keys()); // Extraer las claves (IDs)
    const aulas = Array.from(value.values()); // Extraer los valores (nombres)

    this.form.patchValue({ aula_ids, aulas });
  }
  

  getItemsInput(): Map<number, string> {
    const { aula_ids, aulas } = this.form.value;
    // Asegurar que sean arrays
    const ids: number[] = Array.isArray(aula_ids) ? aula_ids as number[] : [];
    const names: string[] = Array.isArray(aulas) ? aulas as string[] : [];
    // Asegurar que tengan la misma longitud
    if (ids.length !== names.length) return new Map<number, string>();
    return new Map<number, string>(ids.map((id, index) => [id, names[index]]));
  }

}

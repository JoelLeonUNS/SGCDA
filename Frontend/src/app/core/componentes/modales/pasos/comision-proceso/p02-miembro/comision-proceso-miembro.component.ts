import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { SelectComponent } from "../../../../controles/form/select/select.component";
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { DataStorageService } from '../../../../../servicios/localstorage/data-storage.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { ComisionService } from '../../../../../servicios/rest/comision/comision.service';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { TablaPagAgregarMultipleAulasComponent } from "../../../../tablas/paginada/agregar-multiple/aulas/tabla-pag-agregar-multiple-aulas.component";
import { TransferTableComponent } from "../../../../controles/form/transfer-table/transfer-table.component";
import { ColumnItem } from '../../../../../interfaces/utilidades/column-item.interface';
import { TransferChange, TransferItem } from 'ng-zorro-antd/transfer';
import { debounceTime } from 'rxjs';
import { ComisionMiembroService } from '../../../../../servicios/rest/comision-miembro/comision-miembro.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-comision-proceso-miembro',
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
    TransferTableComponent
],
  templateUrl: './comision-proceso-miembro.component.html',
  styleUrl: './comision-proceso-miembro.component.css'
})

export class ComisionProcesoMiembroComponent {
  namespace = 'comision_proceso_miembro';

  @Input() accion?: string;
  @Output() isValido = new EventEmitter<boolean>()

  form = this.fb.group({
    comision: ['Miembros sin comisión'],
    comision_id: [-1, [Validators.required]],
    comision_id_actual: [-1],
    tiene_miembros: [false, [Validators.requiredTrue]], // Para saber si tiene miembros
  });

  comisionActual:string = '';
  comisionesTransfer: any[] = [];

  columnas: ColumnItem[] = [
    { name: 'Nombre/Apellido', attribute: 'title' },
    { name: 'DNI', attribute: 'dni' },
  ]

  lista: TransferItem[] = []

  constructor(
    private msgSrvc: NzMessageService,
    private comisionMiembro: ComisionMiembroService,
    private dataStorageSrvc: DataStorageService,
    private fb: NonNullableFormBuilder,
    public comisionSrvc: ComisionService,
  ) {}

  ngOnInit(): void {

    // Observables
    this.form.valueChanges.pipe(debounceTime(300)).subscribe((v) => {
      this.dataStorageSrvc.guardarEnNamespace(this.namespace, 'form', v, this.accion);
    });

    this.form.get('comision_id')?.valueChanges.pipe(debounceTime(300)).subscribe((v) => {
      this.cargarData(v);
    });

    this.form.statusChanges.subscribe(status => {
      this.isValido.emit(status === 'VALID');
    });

    // Cargar datos
    this.comisionesTransfer = this.dataStorageSrvc.obtenerDeNamespace<any>(this.namespace, 'comisionesTransfer', this.comisionesTransfer, this.accion);
    this.cargarData(-1);
    const form = this.dataStorageSrvc.obtenerDeNamespace<any>(this.namespace, 'form', null, this.accion);
    if (form) this.form.setValue(form);

    const formComision = this.dataStorageSrvc.obtenerDeNamespace<any>('comision_proceso_comision', 'form', null, this.accion);
    if (formComision) {
      this.comisionActual = formComision.comision;
      this.form.get('comision_id_actual')?.setValue(formComision.comision_id);
    }    
  }

  cargarData(id:number) {
    this.comisionMiembro.obtenerMiembrosPorComision(id).subscribe({
      next: (miembros) => {
        this.lista = this.parsearLista(id, miembros);
      },
      error: (err) => console.error(err),
    });
  }

  transferir() {
    this.dataStorageSrvc.guardarEnNamespace(this.namespace, 'comisionesTransfer', this.comisionesTransfer, this.accion);
    const comisionActual = this.comisionesTransfer.find(c => c.id === this.form.get('comision_id_actual')?.value);
    this.form.get('tiene_miembros')?.setValue(comisionActual?.miembros.length > 0);
    this.msgSrvc.success('Se transfirieron los miembros a la comisión actual con éxito');
  }

  parsearLista(comisionId:number, miembros:any[]) {
    const idsMiembrosComisionNoSelect = this.comisionesTransfer.filter(c => c.id !== comisionId).map(c => c.miembros.map((m:any) => m.key)).flat();
    const leftNuevos = miembros.filter((m:any) => !idsMiembrosComisionNoSelect.includes(m.id)).map((m:any) => ({ key: m.id, title: m.nombres + ' ' + m.apellidos, dni: m.dni, direction: 'left' }));
    const right = this.comisionesTransfer.find(c => c.id === this.form.get('comision_id_actual')?.value)?.miembros || [];
    const leftAntiguos = this.comisionesTransfer.find(c => c.id === comisionId)?.miembros || [];
    return this.quitarRepetidos([...leftNuevos, ...right, ...leftAntiguos]);
  }

  setValorForm(control: string, valor: any) {
    this.form.get(control)?.setValue(valor);
  }

  obtenerMiembrosComisionLeft(comisionId: number): any[] {
    const comision = this.comisionesTransfer.find(c => c.id === comisionId);
    return comision ? comision.miembros : [];
  }

  setComisionMiembros(item: TransferChange) {
    let comisionIdAgregar: number = -1;
    let comisionIdEliminar: number = -1;
    if (item.to === 'right') {
      comisionIdAgregar = this.form.get('comision_id_actual')?.value || -1;
      comisionIdEliminar = this.form.get('comision_id')?.value || -1;
    } else {
      comisionIdAgregar = this.form.get('comision_id')?.value || -1;
      comisionIdEliminar = this.form.get('comision_id_actual')?.value || -1;
    }
    const nuevosMiembros = item.list;
    
    // Buscar comisión para agregar miembros
    const comisionAgregar = this.comisionesTransfer.find(c => c.id === comisionIdAgregar);
    const comisionEliminar = this.comisionesTransfer.find(c => c.id === comisionIdEliminar);
    
    if (comisionAgregar) {
      // Agregar solo los miembros que no estén repetidos
      comisionAgregar.miembros = this.agregarMiembros(comisionAgregar.miembros, nuevosMiembros);
    } else {
      // Crear nueva comisión
      this.comisionesTransfer.push({
        id: comisionIdAgregar,
        miembros: nuevosMiembros
      });
    }

    // Eliminar miembros de la comisión original
    if (comisionEliminar) {
      comisionEliminar.miembros = comisionEliminar.miembros.filter((m:any) => !nuevosMiembros.some((nm:any) => nm.key === m.key));
      if (comisionEliminar.miembros.length === 0) {
        this.comisionesTransfer = this.comisionesTransfer.filter(c => c.id !== comisionIdEliminar);
      }
    }
  }
  
  agregarMiembros(miembrosExistentes: any[], nuevosMiembros: any[]): any[] {
    const todosMiembros = [...miembrosExistentes, ...nuevosMiembros];
    return this.quitarRepetidos(todosMiembros);
  }

  quitarRepetidos(lista: any[]): any[] {
    const map = new Map();
    lista.forEach(item => map.set(item.key, item));
    return Array.from(map.values());
  }
}

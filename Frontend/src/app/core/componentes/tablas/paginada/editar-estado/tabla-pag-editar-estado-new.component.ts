import { ChangeDetectorRef, Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { ServicioCrud } from '../../../../servicios/rest/servicio-crud';
import { ModalService } from '../../../../servicios/modal/modal.service';
import { PipeService } from '../../../../servicios/utilidades/pipe/pipe.service';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { BuscadorTablaComponent } from '../../../buscador-tabla/buscador-tabla.component';
import { FiltroItem } from '../../../../interfaces/utilidades/filtro-item.interface';
import { TagsEstados } from '../../../../interfaces/utilidades/tags.interface';
import { CargadorDatosService } from '../../../../servicios/utilidades/cargador-datos/cargador-datos.service';
import { TablaPagNewComponent } from '../tabla-pag-new.component';
import { ServicioParams } from '../../../../servicios/consultor/ServicioParams';
import { FiltroService } from '../../../../servicios/filtro/filtro.service';

@Component({
  selector: 'app-tabla-pag-editar-estado-new',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzFlexModule,
    NzSwitchModule,
    NzButtonModule,
    NzLayoutModule,
    NzSelectModule,
    NzTableModule,
    NzInputModule,
    NzIconModule,
    NzFormModule,
    NzDividerModule,
    NzPopconfirmModule,
    NzTagModule,
    BuscadorTablaComponent
  ],
  template: '',
  styleUrl: './tabla-pag-editar-estado.component.css',
  providers: [FiltroService]
})
export class TablaPagEditarEstadoNewComponent extends TablaPagNewComponent {
  @Input() modal?:string;
  cargarSwitch: boolean = false;
  idSwitch: number = -1;
  estado: string | number | boolean = 'ACTIVO';

  override filtros: FiltroItem[] = [
    {
      attribute: 'estado',
      list: [
        { text: 'Activo', value: 'ACTIVO' },
        { text: 'Dado de Baja', value: 'INACTIVO' },
      ],
    }
  ];
  override tags: TagsEstados = {
    'ACTIVO': { color: 'green' },
    'INACTIVO': { color: 'red' },
  };

  @ViewChild('vcrModal', { read: ViewContainerRef }) vcr!: ViewContainerRef;

  constructor(
    msgService: NzMessageService,
    pipeService: PipeService,
    servicio:ServicioCrud<any>,
    filtroSrvc: FiltroService,
    paramsSrvc: ServicioParams<any>,
    cdr: ChangeDetectorRef,
    protected modalService:ModalService,
  ) {
    super(msgService, pipeService,servicio, filtroSrvc, paramsSrvc, cdr);
  }

  abrirModal(item:any) {
    this.modalService.insertarModalEditar(this.vcr, this.modal!, item);
    this.modalService.obtenerInstancia().onConfirmar.subscribe(() => {
      this.cargarData();
    });
  }

  cambiarEstado(data: any) {
    this.cargarSwitch = true;
    this.idSwitch = data.id;
    if (this.servicio) {
      data.estado = data.estado === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';
      this.servicio.cambiarEstado(data.id, data).subscribe({
        next: () => {
          this.msgService.success('Se cambió el estado correctamente.');
          this.cargarSwitch = false;
        },
        error: () => {
          this.msgService.error('Error al editar');
          this.cargarSwitch = false;
          data.estado = data.estado === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';
        },
      });
    }
  }

  cancelar() {
    this.msgService.info('Se canceló');
  }

  isEstado(estado:any): boolean {
    return estado === this.estado;
  }

  isArray(value: any):boolean {
    return Array.isArray(value);
  }

}

import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { TablaPagComponent } from '../tabla-pag.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { ServicioCrud } from '../../../../servicios/rest/servicio-crud';
import { ModalService } from '../../../../servicios/modal/modal.service';
import { PipeService } from '../../../../servicios/utilidades/pipe/pipe.service';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { BuscadorTablaComponent } from '../../../buscador-tabla/buscador-tabla.component';
import { CargadorDatosService } from '../../../../servicios/utilidades/cargador-datos/cargador-datos.service';

@Component({
  selector: 'app-tabla-pag-editar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzFlexModule,
    NzButtonModule,
    NzLayoutModule,
    NzSelectModule,
    NzTableModule,
    NzInputModule,
    NzMenuModule,
    NzIconModule,
    NzFormModule,
    NzDividerModule,
    NzPaginationModule,
    NzTagModule,
    BuscadorTablaComponent
  ],
  templateUrl: './tabla-pag-editar.component.html',
  styleUrl: './tabla-pag-editar.component.css',
})
export class TablaPagEditarComponent extends TablaPagComponent {
  @Input() modal?:string;

  @ViewChild('vcrModal', { read: ViewContainerRef }) vcr!: ViewContainerRef;

  constructor(
    msgService: NzMessageService,
    pipeService: PipeService,
    servicio:ServicioCrud<any>,
    cdServicio: CargadorDatosService,
    protected modalService:ModalService
  ) {
    super(msgService, pipeService,servicio, cdServicio);
  }

  abrirModal(item:any) {
    this.modalService.insertarModalEditar(this.vcr, this.modal!, item);
    this.modalService.obtenerInstancia().onConfirmar.subscribe(() => {
      this.cargarDatosServidor();
    });
  }

}

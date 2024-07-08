import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { ModalService } from '../../../../../servicios/modal/modal.service';
import { PipeService } from '../../../../../servicios/utilidades/pipe/pipe.service';
import { ColumnItem } from '../../../../../interfaces/utilidades/column-item.interface';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { TablaPagEditarComponent } from '../tabla-pag-editar.component';
import { BuscadorTablaComponent } from '../../../../buscador-tabla/buscador-tabla.component';
import { ColumnaBusqueda } from '../../../../../interfaces/utilidades/columna-busqueda.interface';
import { ComisionService } from '../../../../../servicios/rest/comision/comision.service';
import { ComisionProcesoService } from '../../../../../servicios/rest/comision-proceso/comision-proceso.service';

@Component({
  selector: 'app-tabla-pag-editar-comisiones',
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
    NzIconModule,
    NzFormModule,
    NzDividerModule,
    NzSwitchModule,
    NzPopconfirmModule,
    NzTagModule,
    BuscadorTablaComponent
  ],
  templateUrl: '../tabla-pag-editar.component.html',
  styleUrl: '../tabla-pag-editar.component.css',
})
export class TablaPagEditarComisionesComponent extends TablaPagEditarComponent {
  override modal = 'modalFormComisionProceso'
  override columnasBusqueda?: ColumnaBusqueda[] = [
    {
      name: 'Id',
      columnKey: 'id',
      type: 'NUMBER',
    },
    {
      name: 'Descripción',
      columnKey: 'descripcion',
      default: true,
    },
  ];
  override columnas: ColumnItem[] = [
    {
      name: 'Id',
      attribute: 'id',
      width: '50px',
      showSort: true,
      sortFn: true,
    },
    {
      name: 'Descripción',
      attribute: 'descripcion',
      showSort: true,
      sortFn: true,
    },
    {
      name: 'Miembros',
      attribute: 'nro_miembros',
      showSort: true,
      sortFn: true,
      width: '100px',
    },
    {
      name: 'Fecha',
      attribute: 'fecha',
      showSort: true,
      sortFn: true,
      width: '100px',
    },
    {
      name: 'Hora',
      attribute: 'hora',
      showSort: true,
      sortFn: true,
      width: '80px',
    },
    {
      name: 'Paga',
      attribute: 'paga',
      showSort: true,
      sortFn: true,
      align: 'right',
    },
    {
      name: 'Acción',
      width: '90px',
      right: true,
    },
  ];

  constructor(
    msgService: NzMessageService,
    pipeService: PipeService,
    servicio: ComisionProcesoService,
    modalService: ModalService
  ) {
    super(msgService, pipeService, servicio, modalService);
    this.filtrosExternos.next(true);
    this.filtrosInternos.next(true);
  }
}
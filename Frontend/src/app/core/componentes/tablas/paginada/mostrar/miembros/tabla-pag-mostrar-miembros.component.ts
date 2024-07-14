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
import { TablaPagMostrarComponent } from '../tabla-pag-mostrar.component';
import { BuscadorTablaComponent } from '../../../../buscador-tabla/buscador-tabla.component';
import { ColumnaBusqueda } from '../../../../../interfaces/utilidades/columna-busqueda.interface';
import { ComisionProcesoService } from '../../../../../servicios/rest/comision-proceso/comision-proceso.service';

@Component({
  selector: 'app-tabla-pag-mostrar-miembros',
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
  templateUrl: '../tabla-pag-mostrar.component.html',
  styleUrl: '../tabla-pag-mostrar.component.css',
})
export class TablaPagMostrarMiembrosComponent extends TablaPagMostrarComponent {
  override columnasBusqueda?: ColumnaBusqueda[] = [
    {
      name: 'Id',
      columnKey: 'id',
      type: 'NUMBER',
    },
    {
      name: 'Nombres',
      columnKey: 'nombres',
      default: true,
    },
    {
      name: 'Apellidos',
      columnKey: 'apellidos',
    },
    {
      name: 'Cargo',
      columnKey: 'cargo',
    }
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
      name: 'Nombres',
      attribute: 'nombres',
      showSort: true,
      sortFn: true,
    },
    {
      name: 'Apellidos',
      attribute: 'apellidos',
      showSort: true,
      sortFn: true,
    },
    {
      name: 'Cargo',
      attribute: 'cargo',
      showSort: true,
      sortFn: true,
    },
  ];

  constructor(
    msgService: NzMessageService,
    pipeService: PipeService,
    servicio: ComisionProcesoService,
  ) {
    super(msgService, pipeService, servicio);
    this.filtrosExternos.next(true);
    this.filtrosInternos.next(true);
  }
}

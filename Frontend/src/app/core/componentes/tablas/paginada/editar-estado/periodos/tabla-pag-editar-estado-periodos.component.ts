import { Component} from '@angular/core';
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
import { TablaPagEditarEstadoComponent } from '../tabla-pag-editar-estado.component';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { BuscadorTablaComponent } from '../../../../buscador-tabla/buscador-tabla.component';
import { ColumnaBusqueda } from '../../../../../interfaces/utilidades/columna-busqueda.interface';
import { ProcesoService } from '../../../../../servicios/rest/proceso/proceso.service';

@Component({
  selector: 'app-tabla-pag-editar-estado-periodos',
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
  templateUrl: '../tabla-pag-editar-estado.component.html',
  styleUrl: '../tabla-pag-editar-estado.component.css',
})
export class TablaPagEditarEstadoPeriodosComponent extends TablaPagEditarEstadoComponent {
  override modal = 'modalFormPeriodo';
  override columnasBusqueda?: ColumnaBusqueda[] = [
    {
      name: 'Id',
      columnKey: 'id',
      type: 'NUMBER',
    },
    {
      name: 'Fecha Inicial',
      columnKey: 'fecha_incial',
      default: true,
    },
    {
      name: 'Fecha Final',
      columnKey: 'fecha_final',
    },
    {
      name: 'Año',
      columnKey: 'anio'
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
      name: 'Fecha Inicial',
      attribute: 'fecha_inicial',
      showSort: true,
      sortFn: true,
    },
    {
      name: 'Fecha Final',
      attribute: 'fecha_final',
      showSort: true,
      sortFn: true,
    },
    {
      name: 'Año',
      attribute: 'anio',
      showSort: true,
      sortFn: true,
    },
    {
      name: 'Correlativo',
      attribute: 'correlativo_romano',
      showSort: true,
      sortFn: true,
    },
    {
      name: 'Estado',
      attribute: 'estado',
      width: '100px',
      showFilter: true,
      showSort: true,
      sortFn: true,
      filterFn: true,
      pipe: { nombre: 'state', datos: ['ACTIVO', 'DE BAJA'] },
      etiquetable: true,
    },
    {
      name: 'Acción',
      width: '80px',
      right: true
    },
    {
      name: 'Baja/Alta',
      width: '80px',
      right: true
    }
  ];

  constructor(
    msgService: NzMessageService,
    pipeService: PipeService,
    servicio: ProcesoService,
    modalService:ModalService
  ) {
    super(msgService, pipeService, servicio, modalService);

    this.filtrosExternos.next(true);
    this.filtrosInternos.next(true);
  }
}

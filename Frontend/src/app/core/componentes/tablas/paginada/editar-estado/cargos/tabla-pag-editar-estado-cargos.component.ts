import { ChangeDetectorRef, Component} from '@angular/core';
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
import { BuscadorTablaComponent } from '../../../../buscador-tabla/buscador-tabla.component';
import { ColumnaBusqueda } from '../../../../../interfaces/utilidades/columna-busqueda.interface';
import { CargoService } from '../../../../../servicios/rest/cargo/cargo.service';
import { TablaPagEditarEstadoNewComponent } from '../tabla-pag-editar-estado-new.component';
import { CargoParamsService } from '../../../../../servicios/consultor/cargo/cargo-consultor';
import { FiltroService } from '../../../../../servicios/filtro/filtro.service';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-tabla-pag-editar-estado-cargos',
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
    NzDropDownModule,
    BuscadorTablaComponent
  ],
  templateUrl: '../tabla-pag-editar-estado-new.component.html',
  styleUrl: '../tabla-pag-editar-estado.component.css',
  providers: [FiltroService]
})
export class TablaPagEditarEstadoCargosComponent extends TablaPagEditarEstadoNewComponent {
  override modal = 'modalFormCargo';
  override columnasBusqueda?: ColumnaBusqueda[] = [
    {
      name: 'Id',
      columnKey: 'id',
      type: 'NUMBER',
    },
    {
      name: 'Nombre',
      columnKey: 'nombre',
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
      name: 'Nombre',
      attribute: 'nombre',
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
    servicio: CargoService,
    filtroSrvc: FiltroService,
    paramsSrvc: CargoParamsService,
    cdr: ChangeDetectorRef,
    modalService:ModalService,
  ) {
    super(msgService, pipeService, servicio, filtroSrvc, paramsSrvc, cdr, modalService);
  }
}

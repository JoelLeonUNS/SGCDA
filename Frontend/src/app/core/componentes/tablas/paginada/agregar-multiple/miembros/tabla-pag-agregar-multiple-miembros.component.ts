import { Component } from '@angular/core';
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
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ColumnItem } from '../../../../../interfaces/utilidades/column-item.interface';
import { PipeService } from '../../../../../servicios/utilidades/pipe/pipe.service';
import { ModalService } from '../../../../../servicios/modal/modal.service';
import { TablaPagAgregarMultipleComponent } from '../tabla-pag-agregar-multiple.component';
import { BuscadorTablaComponent } from "../../../../buscador-tabla/buscador-tabla.component";
import { ColumnaBusqueda } from '../../../../../interfaces/utilidades/columna-busqueda.interface';
import { MiembroCargoService } from '../../../../../servicios/rest/miembro-cargo/miembro-cargo.service';

@Component({
    selector: 'app-tabla-pag-agregar-multiple-miembros',
    standalone: true,
    templateUrl: '../tabla-pag-agregar-multiple.component.html',
    styleUrl: '../tabla-pag-agregar-multiple.component.css',
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
        NzCheckboxModule,
        NzEmptyModule,
        BuscadorTablaComponent
    ]
})
export class TablaPagAgregarMultipleMiembrosComponent extends TablaPagAgregarMultipleComponent {
  override entidad:string = 'Miembro'
  override label = 'Miembros';
  override separador: string = ' - ';
  override atributte?: string[] = ['descripcion'];

  override columnasBusqueda: ColumnaBusqueda[] = [
    {
      name: 'Id',
      columnKey: 'id',
      type: 'NUMBER',
    },
    {
      name: 'Tipo de Pago',
      columnKey: 'tipo_pago',
    },
    {
      name: 'Descripcion',
      columnKey: 'descripcion',
      default: true,
    },
  ]
  override columnas:ColumnItem[] = [
    {
      name: '',
      width: '32px',
      checkeable: true,
    },
    {
      name: 'Tipo de Pago',
      attribute: 'tipo_pago',
      width: '170px',
      sortFn: true,
      showSort: true,
    },
    {
      name: 'Descripcion',
      attribute: 'descripcion',
      sortFn: true,
      showSort: true,
    },
    {
      name: 'Monto',
      attribute: 'monto',
      width: '100px',
      sortFn: true,
      showSort: true,
      pipe: {nombre: 'moneda', datos: []},
    },
  ]

  constructor(
    msgService: NzMessageService,
    pipeService: PipeService,
    servicio: MiembroCargoService,
    modalService:ModalService
  ) {
    super(msgService, pipeService, servicio, modalService)
  }
  
}

import { ChangeDetectorRef, Component } from '@angular/core';
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
import { PipeService } from '../../../../../servicios/utilidades/pipe/pipe.service';
import { ColumnItem } from '../../../../../interfaces/utilidades/column-item.interface';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { TablaPagMostrarComponent } from '../tabla-pag-mostrar.component';
import { BuscadorTablaComponent } from '../../../../buscador-tabla/buscador-tabla.component';
import { ColumnaBusqueda } from '../../../../../interfaces/utilidades/columna-busqueda.interface';
import { ComisionMiembroService } from '../../../../../servicios/rest/comision-miembro/comision-miembro.service';
import { FiltroService } from '../../../../../servicios/filtro/filtro.service';
import { ComisionMiembroParamsService } from '../../../../../servicios/consultor/comision-miembro/comision-miembro-consultor';

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
  providers: [FiltroService]
})
export class TablaPagMostrarMiembrosComponent extends TablaPagMostrarComponent {
  override columnasBusqueda?: ColumnaBusqueda[] = [
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
      width: '115px'
    },
  ];

  rangoInicial?: any;
  rangoFinal?: any;

  constructor(
    msgService: NzMessageService,
    pipeService: PipeService,
    servicio: ComisionMiembroService,
    filtroSrvc: FiltroService,
    paramsSrvc: ComisionMiembroParamsService,
    cdr: ChangeDetectorRef,
  ) {
    super(msgService, pipeService, servicio, filtroSrvc, paramsSrvc, cdr);
  }

  
}

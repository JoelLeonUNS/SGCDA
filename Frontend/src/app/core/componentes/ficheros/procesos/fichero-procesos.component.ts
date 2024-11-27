import { ChangeDetectorRef, Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BuscadorTablaComponent } from '../../buscador-tabla/buscador-tabla.component';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { FormsModule } from '@angular/forms';
import { OrganizadorFicheroComponent } from "../../organizador-fichero/organizador-fichero.component";
import { ColumnaBusqueda } from '../../../interfaces/utilidades/columna-busqueda.interface';
import { TarjetaProcesosComponent } from "../../tarjetas/tarjeta-procesos/tarjeta-procesos.component";
import { ProcesoPeriodoService } from '../../../servicios/rest/proceso-periodo/proceso-periodo.service';
import { ProcesoParamsService } from '../../../servicios/consultor/proceso/proceso-consultor.service';
import { FicheroNewComponent } from '../fichero-new.component';

@Component({
  selector: 'app-fichero-procesos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzFlexModule,
    NzGridModule,
    NzEmptyModule,
    NzSpinModule,
    NzTagModule,
    NzDividerModule,
    NzIconModule,
    NzButtonModule,
    NzPaginationModule,
    BuscadorTablaComponent,
    OrganizadorFicheroComponent,
    TarjetaProcesosComponent
],
  templateUrl: './fichero-procesos.component.html',
  styleUrls: ['../fichero.component.css'],
})
export class FicheroProcesosComponent extends FicheroNewComponent {
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
    {
      name: 'Periodo',
      columnKey: 'periodo_numerico',
    },
    {
      name: 'Fecha Inicial',
      columnKey: 'fecha_inicial',
      type: 'DATE',
    },
    {
      name: 'Fecha Final',
      columnKey: 'fecha_final',
      type: 'DATE',
    },
  ];
  
  constructor(
    message: NzMessageService,
    servicio: ProcesoPeriodoService,
    paramsSrvc: ProcesoParamsService,
    cdr: ChangeDetectorRef
  ) {
    super(message, servicio, paramsSrvc, cdr);
  }
}

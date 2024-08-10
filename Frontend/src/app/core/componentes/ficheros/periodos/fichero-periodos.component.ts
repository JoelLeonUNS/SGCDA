import { Component } from '@angular/core';
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
import { FicheroComponent } from '../fichero.component';
import { PeriodoService } from '../../../servicios/rest/periodo/periodo.service';
import { OrganizadorFicheroComponent } from "../../organizador-fichero/organizador-fichero.component";
import { ColumnaBusqueda } from '../../../interfaces/utilidades/columna-busqueda.interface';
import { TarjetaPeriodoComponent } from "../../tarjetas/tarjeta-periodo/tarjeta-periodo.component";
import { CargadorDatosService } from '../../../servicios/utilidades/cargador-datos/cargador-datos.service';
import { PeriodoConsultorService } from '../../../servicios/consultor/periodo/periodo-consultor.service';

@Component({
  selector: 'app-fichero-periodos',
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
    TarjetaPeriodoComponent
],
  templateUrl: './fichero-periodos.component.html',
  styleUrls: ['../fichero.component.css'],
})
export class FicheroPeriodosComponent extends FicheroComponent {
  override columnasBusqueda?: ColumnaBusqueda[] = [
    {
      name: 'Id',
      columnKey: 'id',
      type: 'NUMBER',
    },
    {
      name: 'Año',
      columnKey: 'anio',
      default: true,
      type:'YEAR'
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
    servicio: PeriodoService,
    consultor: PeriodoConsultorService
  ) {
    super(message, servicio, consultor);
    this.consultor.cargarFiltros();
  }

}

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
import { OrganizadorFicheroComponent } from "../../organizador-fichero/organizador-fichero.component";
import { ColumnaBusqueda } from '../../../interfaces/utilidades/columna-busqueda.interface';
import { TarjetaComisionesComponent } from '../../tarjetas/tarjeta-comisiones/tarjeta-comisiones.component';
import { ComisionProcesoService } from '../../../servicios/rest/comision-proceso/comision-proceso.service';
import { CargadorDatosService } from '../../../servicios/utilidades/cargador-datos/cargador-datos.service';
import { ComisionProcesoConsultorService } from '../../../servicios/consultor/comision-proceso/comision-proceso-consultor.service';

@Component({
  selector: 'app-fichero-comisiones',
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
    TarjetaComisionesComponent
],
  templateUrl: './fichero-comisiones.component.html',
  styleUrls: ['../fichero.component.css'],
})
export class FicheroComisionesComponent extends FicheroComponent {
  override columnasBusqueda?: ColumnaBusqueda[] = [
    {
      name: 'Id',
      columnKey: 'id',
      type: 'NUMBER',
    },
    {
      name: 'Comisión',
      columnKey: 'comision',
      default: true,
    },
    {
      name: 'Periodo',
      columnKey: 'periodo_numerico',
    },
    {
      name: 'Fecha',
      columnKey: 'fecha',
      type: 'DATE',
    },
  ];

  rangoInicial?: any;
  rangoFinal?: any;
  
  constructor(
    message: NzMessageService,
    servicio: ComisionProcesoService,
    consultor: ComisionProcesoConsultorService
  ) {
    super(message, servicio, consultor);
    this.consultor.cargarFiltrosInt();
  }

  setRangos(key: string, inicio: any, fin: any) {
    if(inicio) this.rangoInicial = inicio;
    if(fin) this.rangoFinal = fin;
    this.parametrosPag.range = {
      key: key,
      bounds: [this.rangoInicial, this.rangoFinal]
    }
  } 

  setFiltros(key: string, value: any) {
    this.parametrosPag.filter = [{key: key, value: value}];
  }

  filtrarRango(key: string, inicio:any, fin:any) {
    if(inicio) this.rangoInicial = inicio;
    if(fin) this.rangoFinal = fin;
    this.parametrosPag.range = {
      key: key,
      bounds: [this.rangoInicial, this.rangoFinal]
    }
    this.cargarDatosServidor();
  }

  filtrar(key: string, value: any) {
    this.parametrosPag.filter = [{key: key, value: value}];
    this.cargarDatosServidor();
  }

}

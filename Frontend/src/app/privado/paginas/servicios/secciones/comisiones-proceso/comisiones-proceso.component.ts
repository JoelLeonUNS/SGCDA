import { CommonModule } from '@angular/common';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { ControlExportacionCargoComponent } from '../../../../../core/componentes/control-exportacion/cargo/control-exportacion-cargo.component';
import { ModalService } from '../../../../../core/servicios/modal/modal.service';
import { SelectItemComponent } from "../../../../../core/componentes/controles/no-form/select-item/select-item.component";
import { PeriodoService } from '../../../../../core/servicios/rest/periodo/periodo.service';
import { ProcesoService } from '../../../../../core/servicios/rest/proceso/proceso.service';
import { FicheroComisionesComponent } from "../../../../../core/componentes/ficheros/comisiones/fichero-comisiones.component";
import { Range } from '../../../../../core/interfaces/utilidades/range.interface';
import { CargadorDatosService } from '../../../../../core/servicios/utilidades/cargador-datos/cargador-datos.service';

@Component({
    selector: 'app-comisiones-proceso',
    standalone: true,
    templateUrl: './comisiones-proceso.component.html',
    styleUrl: './comisiones-proceso.component.css',
    providers: [ModalService],
    imports: [
    CommonModule,
    NzButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    NzGridModule,
    NzFlexModule,
    NzDividerModule,
    NzIconModule,
    NzStatisticModule,
    NzTagModule,
    NzSpaceModule,
    NzPageHeaderModule,
    ControlExportacionCargoComponent,
    SelectItemComponent,
    FicheroComisionesComponent
]
})
export class ComisionesProcesoComponent {
  
  @ViewChild('vcrModal', { read: ViewContainerRef }) vcr!: ViewContainerRef;
  @ViewChild('ficheroComisiones') ficheroComisiones!: FicheroComisionesComponent;

  nroFiltros: number = 3;
  rango: Range = {
    key: '',
    bounds: []
  }
  filtro: any = {
    key: '',
    value: ''
  }

  constructor(
    private cdService: CargadorDatosService,
    private modalService: ModalService,
    public periodoService: PeriodoService,
    public procesoService: ProcesoService
  ) {
  }

  ngAfterViewInit(): void {
    this.ficheroComisiones.setFiltros(this.filtro.key, this.filtro.value);
    this.ficheroComisiones.setRangos(this.rango.key, this.rango.bounds[0], this.rango.bounds[1]);
    if (this.nroFiltros == 0) {
    this.cdService.cargarDatosServidor();
    }
  }

  filtroCargado() {
    this.nroFiltros--;
    if (this.nroFiltros == 0) {
      this.ficheroComisiones?.setFiltros(this.filtro.key, this.filtro.value);
      this.ficheroComisiones?.setRangos(this.rango.key, this.rango.bounds[0], this.rango.bounds[1]);
      this.cdService.cargarFiltrosExternos();
    }
  }

  filtrar(key:string, value:any) {
    if (this.nroFiltros == 0) {
    this.ficheroComisiones.filtrar(key, value.descripcion);
    } else {
      this.setFiltros(key, value.descripcion);
    }
  }

  filtrarRango(key:string, inicio:any, fin:any) {
    if (this.nroFiltros == 0) {
    this.ficheroComisiones.filtrarRango(key, inicio?.periodo_numerico, fin?.periodo_numerico);
    } else {
      this.setRangos(key, inicio?.periodo_numerico, fin?.periodo_numerico);
    }
  }

  setRangos(key:string, inicio:any, fin:any) {
    this.rango.key = key;
    if (inicio) this.rango.bounds[0] = inicio;
    if (fin) this.rango.bounds[1] = fin;
  }

  setFiltros(key:string, value:any) {
    this.filtro.key = key;
    this.filtro.value = value;
  }


  abrirModal() {
    this.modalService.insertarModalCrear(this.vcr, 'modalFormComisionProceso');
    this.modalService.obtenerInstancia().onConfirmar.subscribe(() => {
      this.ficheroComisiones.cargarDatosServidor();
    });
  }
}

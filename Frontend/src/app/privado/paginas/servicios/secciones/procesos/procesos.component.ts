import { CommonModule } from '@angular/common';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ModalService } from '../../../../../core/servicios/modal/modal.service';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { ControlExportacionCargoComponent } from "../../../../../core/componentes/control-exportacion/cargo/control-exportacion-cargo.component";
import { FicheroProcesosComponent } from "../../../../../core/componentes/ficheros/procesos/fichero-procesos.component";
import { SelectItemComponent } from "../../../../../core/componentes/controles/no-form/select-item/select-item.component";
import { PeriodoService } from '../../../../../core/servicios/rest/periodo/periodo.service';
import { CargadorDatosService } from '../../../../../core/servicios/utilidades/cargador-datos/cargador-datos.service';
import { Range } from '../../../../../core/interfaces/utilidades/range.interface';

@Component({
    selector: 'app-procesos',
    standalone: true,
    templateUrl: './procesos.component.html',
    styleUrl: './procesos.component.css',
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
    FicheroProcesosComponent,
    SelectItemComponent
]
})
export class ProcesosComponent {
  @ViewChild('vcrModal', { read: ViewContainerRef }) vcr!: ViewContainerRef;
  @ViewChild('ficheroProcesoPeriodos') ficheroProcesoPeriodos!: FicheroProcesosComponent;

  nroFiltros: number = 2;
  rango: Range = {
    key: '',
    bounds: []
  }

  constructor(
    private cdService: CargadorDatosService,
    private modalService: ModalService,
    public periodoService: PeriodoService,
  ) { 
  }

  ngAfterViewInit(): void {
    this.ficheroProcesoPeriodos.setRangos(this.rango.key, this.rango.bounds[0], this.rango.bounds[1]);
    if (this.nroFiltros == 0) {
    this.cdService.cargarDatosServidor();
    }
  }

  filtroCargado() {
    this.nroFiltros--;
    if (this.nroFiltros == 0) {
      this.ficheroProcesoPeriodos?.setRangos(this.rango.key, this.rango.bounds[0], this.rango.bounds[1]);
      this.cdService.cargarFiltrosExternos();
    }
  }

  filtrarRango(key:string, inicio:any, fin:any) {
    if (this.nroFiltros == 0) {
    this.ficheroProcesoPeriodos.filtrarRango(key, inicio?.periodo_numerico, fin?.periodo_numerico);
    } else {
      this.setRangos(key, inicio?.periodo_numerico, fin?.periodo_numerico);
    }
  }

  setRangos(key:string, inicio:any, fin:any) {
    this.rango.key = key;
    if (inicio) this.rango.bounds[0] = inicio;
    if (fin) this.rango.bounds[1] = fin;
  }

  abrirModal() {
    this.modalService.insertarModalCrear(this.vcr, 'modalFormProcesoPeriodo');
    this.modalService.obtenerInstancia().onConfirmar.subscribe(() => {
      this.ficheroProcesoPeriodos.cargarDatosServidor();
    });
  }
}

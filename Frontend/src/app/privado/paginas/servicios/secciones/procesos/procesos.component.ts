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
import { ProcesoParamsService } from '../../../../../core/servicios/consultor/proceso/proceso-consultor.service';

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

  inicio:number | null = null;
  fin:number | null = null;

  constructor(
    private paramsSrvc: ProcesoParamsService,
    private modalService: ModalService,
    public periodoService: PeriodoService,
  ) { 
  }

  ranguear(key:string, extremo:string, valor:any) {
    this.inicio = extremo === 'inicial' ? valor.periodo_numerico : this.inicio;
    this.fin = extremo === 'final' ? valor.periodo_numerico : this.fin;
    this.paramsSrvc.updateParametro('range', {
      key: key,
      bounds: [this.inicio, this.fin]
    });
  }

  abrirModal() {
    this.modalService.insertarModalCrear(this.vcr, 'modalFormProcesoPeriodo');
    this.modalService.obtenerInstancia().onConfirmar.subscribe(() => {
      this.ficheroProcesoPeriodos.cargarData();
    });
  }
}

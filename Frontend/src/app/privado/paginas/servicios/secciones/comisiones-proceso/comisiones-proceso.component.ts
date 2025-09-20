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
import { ComisionProcesoParamsService } from '../../../../../core/servicios/consultor/comision-proceso/comision-proceso-consultor.service';

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

  inicio:number | null = null;
  fin:number | null = null;

  constructor(
    private paramsSrvc: ComisionProcesoParamsService,
    private modalService: ModalService,
    public periodoService: PeriodoService,
    public procesoService: ProcesoService
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

  filtrar(key:string, valor:any) {
    let filters = this.paramsSrvc.params.filter;
    const filtro = filters.find(f => f.key === key);
    if (filtro) {
      filtro.value = valor.nombre;
      this.paramsSrvc.updateParametro('filter', [...filters]);
    } else {
      this.paramsSrvc.updateParametro('filter', [...filters, { key, value: valor.nombre }]);
    }
  }

  abrirModal() {
    this.modalService.insertarModalCrear(this.vcr, 'modalPasosComisionProceso');
    this.modalService.obtenerInstancia().onConfirmar.subscribe(() => {
      this.ficheroComisiones.cargarData();
    });
  }
}

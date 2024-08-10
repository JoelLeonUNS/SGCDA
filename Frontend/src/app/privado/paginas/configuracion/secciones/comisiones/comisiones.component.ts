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
import { ModalService } from '../../../../../core/servicios/modal/modal.service';
import { TablaPagEditarEstadoComisionesComponent } from '../../../../../core/componentes/tablas/paginada/editar-estado/comisiones/tabla-pag-editar-estado-comisiones.component';
import { ControlExportacionProcesoComponent } from "../../../../../core/componentes/control-exportacion/comision/control-exportacion-comision.component";

@Component({
    selector: 'app-comisiones',
    standalone: true,
    templateUrl: './comisiones.component.html',
    styleUrl: './comisiones.component.css',
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
    TablaPagEditarEstadoComisionesComponent,
    ControlExportacionProcesoComponent
]
})
export class ComisionesComponent {
  
  @ViewChild('vcrModal', { read: ViewContainerRef }) vcr!: ViewContainerRef;
  @ViewChild('tablaComisiones') tablaComisiones!: TablaPagEditarEstadoComisionesComponent;

  constructor(
    private modalService: ModalService
  ) {
    
  }

  abrirModal() {
    this.modalService.insertarModalCrear(this.vcr, 'modalFormComision');
    this.modalService.obtenerInstancia().onConfirmar.subscribe(() => {
      this.tablaComisiones.cargarDatosServidor();
    });
  }
}

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
import { TablaPagEditarComisionesComponent } from '../../../../../core/componentes/tablas/paginada/editar/comisiones/tabla-pag-editar-comisiones.component';
import { SelectItemComponent } from "../../../../../core/componentes/controles/no-form/select-item/select-item.component";

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
        TablaPagEditarComisionesComponent,
        SelectItemComponent
    ]
})
export class ComisionesProcesoComponent {
  
  @ViewChild('vcrModal', { read: ViewContainerRef }) vcr!: ViewContainerRef;
  @ViewChild('tablaComisiones') tablaComisiones!: TablaPagEditarComisionesComponent;

  constructor(
    private modalService: ModalService
  ) {
    
  }

  abrirModal() {
    this.modalService.insertarModalCrear(this.vcr, 'modalFormComisionProceso');
    this.modalService.obtenerInstancia().onConfirmar.subscribe(() => {
      this.tablaComisiones.cargarDatosServidor();
    });
  }
}

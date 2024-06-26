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
import { TablaPagEditarEstadoProcesosComponent } from '../../../../../core/componentes/tablas/paginada/editar-estado/procesos/tabla-pag-editar-estado-procesos.component';

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
        TablaPagEditarEstadoProcesosComponent
    ]
})
export class ProcesosComponent {
  @ViewChild('vcrModal', { read: ViewContainerRef }) vcr!: ViewContainerRef;
  @ViewChild('tablaProcesos') tablaProcesos!: TablaPagEditarEstadoProcesosComponent;

  constructor(
    private modalService: ModalService
  ) {
    
  }

  abrirModal() {
    this.modalService.insertarModalCrear(this.vcr, 'modalFormProceso');
    this.modalService.obtenerInstancia().onConfirmar.subscribe(() => {
      this.tablaProcesos.cargarDatosServidor();
    });
  }
}

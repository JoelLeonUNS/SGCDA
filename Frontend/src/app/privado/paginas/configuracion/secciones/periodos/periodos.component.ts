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
import { TablaPagEditarEstadoPeriodosComponent } from '../../../../../core/componentes/tablas/paginada/editar-estado/periodos/tabla-pag-editar-estado-periodos.component';
import { ControlExportacionPeriodoComponent } from "../../../../../core/componentes/control-exportacion/periodo/control-exportacion-periodo.component";

@Component({
    selector: 'app-periodos',
    standalone: true,
    templateUrl: './periodos.component.html',
    styleUrl: './periodos.component.css',
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
    TablaPagEditarEstadoPeriodosComponent,
    ControlExportacionPeriodoComponent
]
})
export class PeriodosComponent {
  @ViewChild('vcrModal', { read: ViewContainerRef }) vcr!: ViewContainerRef;
  @ViewChild('tablaPeriodos') tablaPeriodos!: TablaPagEditarEstadoPeriodosComponent;

  constructor(
    private modalService: ModalService
  ) {
    
  }

  abrirModal() {
    this.modalService.insertarModalCrear(this.vcr, 'modalFormPeriodo');
    this.modalService.obtenerInstancia().onConfirmar.subscribe(() => {
      this.tablaPeriodos.cargarDatosServidor();
    });
  }
}

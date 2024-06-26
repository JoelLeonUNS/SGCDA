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
import { TablaPagEditarEstadoCargosComponent } from "../../../../../core/componentes/tablas/paginada/editar-estado/cargos/tabla-pag-editar-estado-cargos.component";
import { ControlExportacionCargoComponent } from "../../../../../core/componentes/control-exportacion/cargo/control-exportacion-cargo.component";

@Component({
    selector: 'app-cargos',
    standalone: true,
    templateUrl: './cargos.component.html',
    styleUrl: './cargos.component.css',
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
        TablaPagEditarEstadoCargosComponent,
        ControlExportacionCargoComponent
    ]
})
export class CargosComponent {
  @ViewChild('vcrModal', { read: ViewContainerRef }) vcr!: ViewContainerRef;
  @ViewChild('tablaCargos') tablaCargos!: TablaPagEditarEstadoCargosComponent;

  constructor(
    private modalService: ModalService
  ) {
    
  }

  abrirModal() {
    this.modalService.insertarModalCrear(this.vcr, 'modalFormCargo');
    this.modalService.obtenerInstancia().onConfirmar.subscribe(() => {
      this.tablaCargos.cargarDatosServidor();
    });
  }
}
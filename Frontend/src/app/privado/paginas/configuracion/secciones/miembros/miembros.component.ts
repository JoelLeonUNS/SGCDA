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
import { TablaPagEditarEstadoMiembrosComponent } from "../../../../../core/componentes/tablas/paginada/editar-estado/miembros/tabla-pag-editar-estado-miembros.component";
import { ControlExportacionMiembroComponent } from "../../../../../core/componentes/control-exportacion/miembro/control-exportacion-miembro.component";

@Component({
    selector: 'app-miembros',
    standalone: true,
    templateUrl: './miembros.component.html',
    styleUrl: './miembros.component.css',
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
    TablaPagEditarEstadoMiembrosComponent,
    ControlExportacionMiembroComponent
]
})
export class MiembrosComponent {
  @ViewChild('vcrModal', { read: ViewContainerRef }) vcr!: ViewContainerRef;
  @ViewChild('tablaMiembros') tablaMiembros!: TablaPagEditarEstadoMiembrosComponent;

  constructor(
    private modalService: ModalService
  ) {
    
  }

  abrirModal() {
    this.modalService.insertarModalCrear(this.vcr, 'modalFormMiembro');
    this.modalService.obtenerInstancia().onConfirmar.subscribe(() => {
      this.tablaMiembros.cargarData();
    });
  }
}

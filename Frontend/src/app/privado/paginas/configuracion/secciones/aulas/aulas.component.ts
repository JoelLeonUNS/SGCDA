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
import { TablaPagEditarEstadoAulasComponent } from '../../../../../core/componentes/tablas/paginada/editar-estado/aulas/tabla-pag-editar-estado-aulas.component';

@Component({
    selector: 'app-aulas',
    standalone: true,
    templateUrl: './aulas.component.html',
    styleUrl: './aulas.component.css',
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
        TablaPagEditarEstadoAulasComponent,
        ControlExportacionCargoComponent
    ]
})
export class AulasComponent {
  @ViewChild('vcrModal', { read: ViewContainerRef }) vcr!: ViewContainerRef;
  @ViewChild('tablaAulas') tablaAulas!: TablaPagEditarEstadoAulasComponent;

  constructor(
    private modalService: ModalService
  ) {
    
  }

  abrirModal() {
    this.modalService.insertarModalCrear(this.vcr, 'modalFormAula');
    this.modalService.obtenerInstancia().onConfirmar.subscribe(() => {
      this.tablaAulas.cargarData();
    });
  }
}

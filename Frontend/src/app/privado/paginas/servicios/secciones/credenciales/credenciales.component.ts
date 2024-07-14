import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
import { SelectItemComponent } from '../../../../../core/componentes/controles/no-form/select-item/select-item.component';
import { PeriodoService } from '../../../../../core/servicios/rest/periodo/periodo.service';
import { ProcesoService } from '../../../../../core/servicios/rest/proceso/proceso.service';
import { ComisionService } from '../../../../../core/servicios/rest/comision/comision.service';
import { ModalService } from '../../../../../core/servicios/modal/modal.service';
import { TablaPagMostrarMiembrosComponent } from "../../../../../core/componentes/tablas/paginada/mostrar/miembros/tabla-pag-mostrar-miembros.component";
import { VistaPreviaCredencialComponent } from "../../../../../core/componentes/vista-previa-credencial/vista-previa-credencial.component";;

@Component({
  selector: 'app-credenciales',
  standalone: true,
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
    TablaPagMostrarMiembrosComponent,
    VistaPreviaCredencialComponent
],
  templateUrl: './credenciales.component.html',
  styleUrl: './credenciales.component.css',
  providers: [ModalService],
})
export class CredencialesComponent {

  constructor(
    public comisionService: ComisionService,
    public periodoService: PeriodoService,
    public procesoService: ProcesoService,
  ) {
  }

}

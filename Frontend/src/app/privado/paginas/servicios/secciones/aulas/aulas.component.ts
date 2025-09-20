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
import { SelectItemComponent } from "../../../../../core/componentes/controles/no-form/select-item/select-item.component";
import { PeriodoService } from '../../../../../core/servicios/rest/periodo/periodo.service';
import { ProcesoParamsService } from '../../../../../core/servicios/consultor/proceso/proceso-consultor.service';
import { ProcesoService } from '../../../../../core/servicios/rest/proceso/proceso.service';
import { PabellonService } from '../../../../../core/servicios/rest/pabellon/pabellon.service';
import { FicheroAulasComponent } from '../../../../../core/componentes/ficheros/aulas/fichero-aulas.component';
import { AulaParamsService } from '../../../../../core/servicios/consultor/aula/aula-consultor';

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
    ControlExportacionCargoComponent,
    SelectItemComponent,
    FicheroAulasComponent
]
})
export class AulasComponent {
  @ViewChild('vcrModal', { read: ViewContainerRef }) vcr!: ViewContainerRef;
  @ViewChild('ficheroAulas') ficheroAulas!: FicheroAulasComponent;

  inicio:number | null = null;
  fin:number | null = null;

  constructor(
    public pabellonService: PabellonService,
    public periodoService: PeriodoService,
    public procesoService: ProcesoService,
    private paramsSrvc: AulaParamsService,
    private modalService: ModalService,
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
    this.modalService.insertarModalCrear(this.vcr, 'modalFormAula');
    this.modalService.obtenerInstancia().onConfirmar.subscribe(() => {
      // this.ficheroAula.cargarData();
    });
  }
}

import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
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
import { VistaPreviaCredencialComponent } from "../../../../../core/componentes/vista-previa-credencial/vista-previa-credencial.component";import { GeneradorPdfService } from '../../../../../core/servicios/exportar/exportar-pdf/context/generador-pdf.service';
import { GenerarCredencialPdfStrategy } from '../../../../../core/servicios/exportar/exportar-pdf/strategies/generar-credencial-pdf-strategy';
import { PipeService } from '../../../../../core/servicios/utilidades/pipe/pipe.service';
import { CargadorDatosService } from '../../../../../core/servicios/utilidades/cargador-datos/cargador-datos.service';
import { Range } from '../../../../../core/interfaces/utilidades/range.interface';
import { ComisionMiembroParamsService } from '../../../../../core/servicios/consultor/comision-miembro/comision-miembro-consultor';

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

  @ViewChild('tablaMiembros') tablaMiembros!: TablaPagMostrarMiembrosComponent;

  inicio:number | null = null;
  fin:number | null = null;

  miembroCargo: any = {
    miembro: 'ALBERTO BOCANEGRA RAMOS',
    cargo: 'DOCENTE UNS',
    proceso_periodo: 'II SUMATIVO CEPUNS 2024 - III',
    comision: 'COMISION DE EVALUACION',
    fecha: '01/01/2024',
    hora: '08:00',
  };

  constructor(
    public comisionService: ComisionService,
    public periodoService: PeriodoService,
    public procesoService: ProcesoService,
    private pipeService: PipeService,
    private paramsSrvc: ComisionMiembroParamsService,
    private generarPdfService: GeneradorPdfService,
    private upperCasePipe: UpperCasePipe
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

 
  mostrar(item:any) {
    this.miembroCargo = {
      miembro: this.upperCasePipe.transform(item.nombres + " " + item.apellidos),
      cargo: this.upperCasePipe.transform(item.cargo + ' UNS'),
      proceso_periodo: this.upperCasePipe.transform(item.proceso_periodo),
      comision: this.upperCasePipe.transform(item.comision),
      fecha: this.upperCasePipe.transform(item.fecha),
      hora: this.upperCasePipe.transform(item.hora)
    }
  }

  generarCredencial(tipo: string) {
    this.generarPdfService.establecerEstrategia(new GenerarCredencialPdfStrategy(this.pipeService));
    const doc = this.generarPdfService.generarPdf({
      titulo: 'Credencial',
      datos: this.miembroCargo,
    });
    if (tipo === 'descargar') this.generarPdfService.guardarPdf(doc, 'Credencial');
    else this.generarPdfService.abrirPdf(doc);
  }
  

}

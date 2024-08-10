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

  nroFiltros: number = 4;
  rango: Range = {
    key: '',
    bounds: []
  }
  filtro: any = {
    key: null,
    value: null
  }

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
    private cdService: CargadorDatosService,
    private generarPdfService: GeneradorPdfService,
    private upperCasePipe: UpperCasePipe
  ) {
  }

  ngAfterViewInit(): void {
    this.tablaMiembros.setFiltros(this.filtro.key, this.filtro.value);
    this.tablaMiembros.setRangos(this.rango.key, this.rango.bounds[0], this.rango.bounds[1]);
    if (this.nroFiltros == 0) {
    this.cdService.cargarDatosServidor();
    }
  }

  filtroCargado() {
    this.nroFiltros--;
    if (this.nroFiltros == 0) {
      this.tablaMiembros?.setFiltros(this.filtro.key, this.filtro.value);
      this.tablaMiembros?.setRangos(this.rango.key, this.rango.bounds[0], this.rango.bounds[1]);
      this.cdService.cargarFiltrosExternos();
    }
  }

  filtrar(key:string, value:any) {
    if (this.nroFiltros == 0) {
    this.tablaMiembros.filtrar(key, value.descripcion);
    } else {
      this.setFiltros(key, value.descripcion);
    }
  }

  filtrarRango(key:string, inicio:any, fin:any) {
    if (this.nroFiltros == 0) {
    this.tablaMiembros.filtrarRango(key, inicio?.periodo_numerico, fin?.periodo_numerico);
    } else {
      this.setRangos(key, inicio?.periodo_numerico, fin?.periodo_numerico);
    }
  }

  setRangos(key:string, inicio:any, fin:any) {
    this.rango.key = key;
    if (inicio) this.rango.bounds[0] = inicio;
    if (fin) this.rango.bounds[1] = fin;
  }

  setFiltros(key:string, value:any) {
    this.filtro.key = key;
    this.filtro.value = value;
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

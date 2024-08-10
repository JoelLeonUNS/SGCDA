import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { GeneradorExcelService } from '../../servicios/exportar/exportar-excel/generador-excel.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { GeneradorPdfService } from '../../servicios/exportar/exportar-pdf/context/generador-pdf.service';
import { GenerarTablaPdfStrategy } from '../../servicios/exportar/exportar-pdf/strategies/generar-tabla-pdf-strategy';
import { ServicioCrud } from '../../servicios/rest/servicio-crud';
import { PipeService } from '../../servicios/utilidades/pipe/pipe.service';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-control-exportacion',
  standalone: true,
  imports: [NzDropDownModule, NzButtonModule, NzFlexModule, NzIconModule],
  templateUrl: './control-exportacion.component.html',
  styleUrl: './control-exportacion.component.css',
})
export class ControlExportacionComponent {
  @Input() parametrosExcel: any = {};
  @Input() parametrosPdf: any = {};
  @Input() exportandoExcel: boolean = false;
  @Input() exportandoPdf: boolean = false;
  @Input() cargando: boolean = false;

  @Output() cargarDatosChange = new EventEmitter<boolean>();

  constructor(
    protected pipeService: PipeService,
    protected generadorExcelService: GeneradorExcelService,
    protected genradorPdfService: GeneradorPdfService,
    protected servicio: ServicioCrud<any>
  ) {}

  exportarExcel() {
    this.exportandoExcel = true;
    this.cargarDatosExportar(() => {
      this.generadorExcelService.generarExcel(this.parametrosExcel);
      this.exportandoExcel = false;
    });  
  }

  exportarPdf(tipo:string) {
    this.exportandoPdf = true;
    this.cargarDatosExportar(() => {
      this.genradorPdfService.establecerEstrategia(new GenerarTablaPdfStrategy(this.pipeService));
      const doc = this.genradorPdfService.generarPdf(this.parametrosPdf);
      if (tipo === 'descargar') this.genradorPdfService.guardarPdf(doc, this.parametrosPdf.titulo);
      else this.genradorPdfService.abrirPdf(doc);
      this.exportandoPdf = false;
    });
  }

  cargarDatosExportar(metodoExportar: () => void) {
    this.servicio.obtenerTodos().subscribe({
      next: (respuesta) => {
        this.manejarRespuestaExportacion(respuesta);
        metodoExportar();
      },
      error: (err) => {
        this.manejarErrorExportacion(err);
      },
    });
  }

  manejarRespuestaExportacion(respuesta:any) {
    this.parametrosExcel.datosTabla = respuesta;
    this.parametrosPdf.datosTabla = respuesta;
  }

  manejarErrorExportacion(err:any) {
    console.log(err);
    this.exportandoExcel = false;
    this.exportandoPdf = false;
  }
}

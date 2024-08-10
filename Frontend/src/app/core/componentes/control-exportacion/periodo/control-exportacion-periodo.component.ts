import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { ControlExportacionComponent } from '../control-exportacion.component';
import { GeneradorExcelService } from '../../../servicios/exportar/exportar-excel/generador-excel.service';
import { GeneradorPdfService } from '../../../servicios/exportar/exportar-pdf/context/generador-pdf.service';
import { ColumnaTabla } from '../../../interfaces/utilidades/columna-tabla.interface';
import { ParametrosExcel } from '../../../interfaces/utilidades/parametros-excel.interface';
import { ParametrosPdf } from '../../../interfaces/utilidades/parametros-pdf.interface';
import { PipeService } from '../../../servicios/utilidades/pipe/pipe.service';
import { PeriodoService } from '../../../servicios/rest/periodo/periodo.service';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-control-exportacion-periodo',
  standalone: true,
  imports: [NzDropDownModule, NzButtonModule, NzFlexModule, NzIconModule],
  templateUrl: '../control-exportacion.component.html',
  styleUrl: '../control-exportacion.component.css',
})
export class ControlExportacionPeriodoComponent extends ControlExportacionComponent {
  constructor(
    pipeService: PipeService,
    generadorExcelService: GeneradorExcelService,
    genradorPdfService: GeneradorPdfService,
    servicio: PeriodoService
  ) {
    super(pipeService,generadorExcelService, genradorPdfService, servicio);
  }

  columnasTabla: ColumnaTabla[] = [
    { 
      encabezado: 'Nro', 
      atributo: 'id', 
      ancho: 33, 
    },
    { 
      encabezado: 'Año',
      atributo: 'anio',
      ancho: 'auto'
    },
    {
      encabezado: 'Correlativo',
      atributo: 'correlativo_romano',
      ancho: 'auto'
    },
    {
      encabezado: 'Fecha de Inicial',
      atributo: 'fecha_inicial',
      ancho: 'auto'
    },
    {
      encabezado: 'Fecha de Final',
      atributo: 'fecha_final',
      ancho: 'auto'
    }
  ]
  
  override parametrosPdf:ParametrosPdf  = {
    titulo: 'Listado de Periodos de SGC-DA',
    mostrarTitulo: true,
    columnasTabla: this.columnasTabla, 
    mostrarPiePagina: true,
    contenidoPiePagina: 'SGC-DA - Sistema de Gestión de Comisiones de la Dirección de Admisión',
    contenidoEncabezado: 'Listado de Periodos',
    mostrarEncabezado: true,
  }
  
  override parametrosExcel:ParametrosExcel = {
    titulo: 'Listado de Periodos de SGC-DA',
    columnasTabla: this.columnasTabla,
  }

}

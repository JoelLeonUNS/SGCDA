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
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { MiembroCargoService } from '../../../servicios/rest/miembro-cargo/miembro-cargo.service';

@Component({
  selector: 'app-control-exportacion-miembro',
  standalone: true,
  imports: [NzDropDownModule, NzButtonModule, NzFlexModule, NzIconModule],
  templateUrl: '../control-exportacion.component.html',
  styleUrl: '../control-exportacion.component.css',
})
export class ControlExportacionMiembroComponent extends ControlExportacionComponent {
  constructor(
    pipeService: PipeService,
    generadorExcelService: GeneradorExcelService,
    genradorPdfService: GeneradorPdfService,
    servicio: MiembroCargoService
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
      encabezado: 'Nombres',
      atributo: 'nombres',
      ancho: 'auto' 
    },
    {
      encabezado: 'Apellidos',
      atributo: 'apellidos',
      ancho: 'auto'
    },
    {
      encabezado: 'Cargo',
      atributo: 'cargo',
      ancho: 'auto'
    }
  ]
  
  override parametrosPdf:ParametrosPdf  = {
    titulo: 'Listado de Miembros de SGC-DA',
    mostrarTitulo: true,
    columnasTabla: this.columnasTabla, 
    mostrarPiePagina: true,
    contenidoPiePagina: 'SGC-DA - Sistema de Gestión de Comisiones de la Dirección de Admisión',
    contenidoEncabezado: 'Listado de Miembros',
    mostrarEncabezado: true,
  }
  
  override parametrosExcel:ParametrosExcel = {
    titulo: 'Listado de Miembros de SGC-DA',
    columnasTabla: this.columnasTabla,
  }

  override cargarDatosExportar(metodoExportar: () => void) {
    this.servicio.obtenerTodosConNombre().subscribe({
      next: (respuesta) => {
        this.manejarRespuestaExportacion(respuesta);
        metodoExportar();
      },
      error: (err) => {
        this.manejarErrorExportacion(err);
      },
    });
  }

}

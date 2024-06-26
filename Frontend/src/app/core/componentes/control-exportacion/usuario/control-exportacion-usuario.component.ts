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
import { UsuarioService } from '../../../servicios/rest/usuario/usuario.service';
import { PipeService } from '../../../servicios/utilidades/pipe/pipe.service';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-control-exportacion-usuario',
  standalone: true,
  imports: [NzDropDownModule, NzButtonModule, NzFlexModule, NzIconModule],
  templateUrl: '../control-exportacion.component.html',
  styleUrl: '../control-exportacion.component.css',
})
export class ControlExportacionUsuarioComponent extends ControlExportacionComponent {
  constructor(
    pipeService: PipeService,
    generadorExcelService: GeneradorExcelService,
    genradorPdfService: GeneradorPdfService,
    servicio: UsuarioService
  ) {
    super(pipeService, generadorExcelService, genradorPdfService, servicio);
  }

  columnasTabla: ColumnaTabla[] = [
    { encabezado: 'Nro', atributo: 'id', ancho: 33 },
    { encabezado: 'Correo', atributo: 'correo', ancho: 'auto' },
    { encabezado: 'Rol', atributo:'rol', ancho: 'auto' },
  ]

  override parametrosPdf:ParametrosPdf = {
    titulo: 'Listado de Usuarios de Vitalmash',
    mostrarTitulo: true,
    columnasTabla: this.columnasTabla, 
    mostrarPiePagina: true,
    contenidoPiePagina: 'Vitalmash - Sistema de Gestión de Pedidos y Producción',
    contenidoEncabezado: 'Listado de Usuarios',
    mostrarEncabezado: true,
  }
  
  override parametrosExcel:ParametrosExcel = {
    titulo: 'Listado de Usuarios de Vitalmash',
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

import { GenerarPdfStrategy } from './generar-pdf-strategy.interface';
import { ParametrosPdf } from '../../../../interfaces/utilidades/parametros-pdf.interface';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ColumnaTabla } from '../../../../interfaces/utilidades/columna-tabla.interface';
import { PipeService } from '../../../utilidades/pipe/pipe.service';

export class GenerarTablaPdfStrategy implements GenerarPdfStrategy {

  doc = new jsPDF();

  constructor(private pipeService: PipeService) {}

  generarPdf(parametros: ParametrosPdf): jsPDF {
    this.doc = new jsPDF({
      orientation: parametros.orientacion || 'portrait',
    });

    // Agregar fuente personalizada
    this.doc.addFont('./fonts/OpenSans-Regular.ttf', 'OpenSans','normal');
    this.doc.addFont('./fonts/OpenSans-Bold.ttf', 'OpenSans','bold');
    this.doc.setFont('OpenSans');

    // Mostrar título
    if (parametros.mostrarTitulo) {
      this.agregarTitulo(parametros.titulo);
    }

    // Agregar tabla
    if (parametros.datosTabla && parametros.columnasTabla) {
      this.agregarTabla(parametros.datosTabla, parametros.columnasTabla);
    }

    // Agregar encabezado
    if (parametros.mostrarEncabezado) {
      this.agregarEncabezado(parametros.contenidoEncabezado, parametros.mostrarFecha);
    }

    // Agregar pie de página
    if (parametros.mostrarPiePagina) {
      this.agregarPiePagina(
        parametros.contenidoPiePagina,
        parametros.mostrarPaginacion,
        parametros.mostrarTotalPaginas
      );
    }

    return this.doc;
  }

  private agregarTitulo(titulo: string) {
    this.doc.setFontSize(15);
    this.doc.text(titulo, this.doc.internal.pageSize.width / 2, 21, {
      align: 'center',
    });
  }

  private agregarEncabezado(contenido: string | undefined , mostrarFecha = true) {
    for (let i = 1; i <= this.doc.getNumberOfPages(); i++) {
      // Cambiar a la página actual
      this.doc.setPage(i);
      // Agregar línea divisoria
      this.doc.setLineWidth(0.5);
      this.doc.line(20, 12, this.doc.internal.pageSize.width - 20, 12);
      // Agregar encabezado
      this.doc.setFontSize(9);
      if(contenido) {
        this.doc.text(contenido, 20, 10);
      }
      // Agregar fecha
      if (mostrarFecha) {
        this.doc.text(
          new Date().toLocaleDateString(),
          this.doc.internal.pageSize.width - 40,
          10
        );
      }
    }
  }

  private agregarPiePagina(contenido: string | undefined, mostrarPaginacion = true, mostrarTotalPaginas = true) {
    for (let i = 1; i <= this.doc.getNumberOfPages(); i++) {
      // Cambiar a la página actual
      this.doc.setPage(i);
      // Agregar línea divisoria
      this.doc.setLineWidth(0.5);
      this.doc.line(
        20,
        this.doc.internal.pageSize.height - 15,
        this.doc.internal.pageSize.width - 20,
        this.doc.internal.pageSize.height - 15
      );
      // Agregar contenido a la izquierda
      this.doc.setFontSize(9);
      if (contenido) {
        this.doc.text(contenido, 20, this.doc.internal.pageSize.height - 10);
      }

      if (mostrarPaginacion) {
        // Agregar número de página
        this.doc.text(
          `Página ${i}`,
          this.doc.internal.pageSize.width - 50,
          this.doc.internal.pageSize.height - 10
        );
      }

      // Agregar número de página y total de páginas
      if (mostrarPaginacion && mostrarTotalPaginas) {
        this.doc.text(
          `Página ${i} de ${this.doc.getNumberOfPages()}`,
          this.doc.internal.pageSize.width - 50,
          this.doc.internal.pageSize.height - 10
        );
      }
    }
  }

  private agregarTabla(datosTabla: any[], columnasTabla: ColumnaTabla[]) {
    const headers = columnasTabla.map((columna) => columna.encabezado);
    const tableData: any[][] = datosTabla.map((item) => {
      return columnasTabla.map((c) => {
        const valor = this.transPipe(item[c.atributo], c.pipe);
        return valor !== null && valor !== '' ? valor : ' ';
      });
    });

    const columnStyles: {
      [key: number]: { cellWidth: 'auto' | 'wrap' | number, halign?: 'left' | 'center' | 'right' | 'justify' };
    } = {};

    columnasTabla.forEach((columna, index) => {
        columnStyles[index] = { 
          cellWidth: columna.ancho??'auto',
          halign: columna.alineacion??'left'
        };
    });

    autoTable(this.doc, {
      head: [headers],
      headStyles: {
        fillColor: [26, 82, 118],
        textColor: [255, 255, 255],
        fontSize: 8.5,
        fontStyle: 'bold',
      },
      body: tableData,
      startY: 27,
      styles: {
        fontSize: 8.5,
        textColor: [0, 0, 0],
        lineColor: [0, 0, 0],
      },
      columnStyles: columnStyles,
    });
  }

  transPipe(dato: any, pipe: any): string | null {
    if (pipe) {
      return this.pipeService.transformar(dato, pipe);
    } else {
      return dato;
    }
  }
}

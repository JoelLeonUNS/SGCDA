import { GenerarPdfStrategy } from './generar-pdf-strategy.interface';
import { ParametrosPdf } from '../../../../interfaces/utilidades/parametros-pdf.interface';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PipeService } from '../../../utilidades/pipe/pipe.service';

export class GenerarCredencialPdfStrategy implements GenerarPdfStrategy {

  doc = new jsPDF();

  constructor(private pipeService: PipeService) {}

  generarPdf(parametros: ParametrosPdf): jsPDF {
    this.doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [85, 55]
    });

    // Agregar fuente personalizada
    this.doc.addFont('./fonts/OpenSans-Regular.ttf', 'OpenSans','normal');
    this.doc.addFont('./fonts/OpenSans-Bold.ttf', 'OpenSans','bold');
    this.doc.setFont('OpenSans');

    this.agregarFondo();
    this.agregarComision(parametros.datos);
    this.agregarMiembro(parametros.datos);
    this.agregarCargo(parametros.datos);
    this.agregarProcesoFechaHora(parametros.datos);

    return this.doc;
  }

  private agregarFondo() {
    this.doc.addImage('./assets/imagenes/carnet.png', 'PNG', 0, -1, 85, 56);
  }

  private agregarComision(datos: any) {
    const data = [[datos.comision]];

    autoTable(this.doc, {
      theme: 'plain',
      body: [['COMISIÓN']],
      startY: 2.5,
      margin: { left: 50, right: 4 },
      styles: {
        fontSize: 9,
        fontStyle: 'bold',
        textColor: [255, 255, 255],
        lineColor: [0, 0, 0],
        valign: 'middle',
        halign: 'left',
      }
    });
    
    autoTable(this.doc, {
      theme: 'plain',
      body: data,
      startY: 6.5,
      margin: { left: 50, right: 4 },
      styles: {
        fontSize: 5.5,
        fontStyle: 'bold',
        textColor: [255, 255, 255],
        lineColor: [0, 0, 0],
        valign: 'middle',
        halign: 'left',
      }
    });
  }

  private agregarMiembro(datos: any) {
    const data = [[datos.miembro]];
    
    autoTable(this.doc, {
      theme: 'plain',
      body: data,
      startY: 25,
      margin: { left: 1, right: 1 },
      styles: {
        fontSize: 10,
        fontStyle: 'bold',
        textColor: [34, 0, 96],
        lineColor: [0, 0, 0],
        valign: 'middle',
        halign: 'center',
      }
    });
  }

  private agregarCargo(datos: any) {
    const data = [[datos.cargo]];
    
    autoTable(this.doc, {
      theme: 'plain',
      body: data,
      startY: 30,
      margin: { left: 1, right: 1 },
      styles: {
        fontSize: 8,
        fontStyle: 'bold',
        textColor: [109, 107, 114],
        lineColor: [0, 0, 0],
        valign: 'middle',
        halign: 'center',
      }
    });
  }

  private agregarProcesoFechaHora(datos: any) {
    const data = [
      ['DIRECCIÓN DE ADMISIÓN', '                  ', 'FECHA:', datos.fecha], 
      [datos.proceso_periodo, '                  ', 'HORA:', datos.hora]
    ];

    autoTable(this.doc, {
      theme: 'plain',
      body: data,
      startY: 42.5,
      margin: { left: 4, right: 4, top: 4, bottom: 4 },
      styles: {
        fontSize: 5.5,
        textColor: [50, 50, 50],
        lineColor: [0, 0, 0],
        valign: 'middle',
        halign: 'left',
        cellPadding: 0.5,
      },
      columnStyles: {
        0: { fontStyle: 'bold' },
        2: { fontStyle: 'bold' },
        3: { halign: 'right' },
      }
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

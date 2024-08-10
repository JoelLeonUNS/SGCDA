import { Injectable } from '@angular/core';
import { GenerarPdfStrategy } from '../strategies/generar-pdf-strategy.interface';
import { ParametrosPdf } from '../../../../interfaces/utilidades/parametros-pdf.interface';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class GeneradorPdfService {
  estrategia?: GenerarPdfStrategy;

  constructor() {
  }

  establecerEstrategia(estrategia: GenerarPdfStrategy): void {
    this.estrategia = estrategia;
  }

  generarPdf(parametros: ParametrosPdf): jsPDF {
    return this.estrategia!.generarPdf(parametros);
  }

  guardarPdf(doc: jsPDF, fileName: string) {
    doc.save(`${fileName}.pdf`);
  }

  abrirPdf(doc: jsPDF) {
    doc.output('dataurlnewwindow');
  }

}

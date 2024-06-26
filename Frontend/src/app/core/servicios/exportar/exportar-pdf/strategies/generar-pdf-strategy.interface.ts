import jsPDF from 'jspdf';
import { ParametrosPdf } from '../../../../interfaces/utilidades/parametros-pdf.interface';

export interface GenerarPdfStrategy {

  generarPdf(parametros: ParametrosPdf): jsPDF;

}

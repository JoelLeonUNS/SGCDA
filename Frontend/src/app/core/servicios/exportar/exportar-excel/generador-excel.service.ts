import { Injectable } from '@angular/core';
import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { ParametrosExcel } from '../../../interfaces/utilidades/parametros-excel.interface';
import { PipeService  } from '../../utilidades/pipe/pipe.service';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class GeneradorExcelService {

  constructor(private pipeService: PipeService) {
  }

  generarExcel(parametros: ParametrosExcel): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
    // Agregar encabezados
    if (parametros.columnasTabla) {
      parametros.columnasTabla.forEach((columna, index) => {
        const cellAddress = XLSX.utils.encode_col(index) + "1";
        worksheet[cellAddress] = { v: columna.encabezado };
  
        if (typeof columna.ancho === 'number') {
          worksheet["!cols"] = worksheet["!cols"] || [];
          worksheet["!cols"][index] = { wch: columna.ancho/2 };
        } else if (columna.ancho === 'auto') { // falta implementar el wrap
          worksheet["!cols"] = worksheet["!cols"] || [];
          worksheet["!cols"][index] = { wpx: 100 };
        }
      });
    }
    // Agregar datos
    if (parametros.datosTabla && parametros.columnasTabla) {
      const datosTabla = parametros.datosTabla.map((dato) => {
        const datosFiltrados: any[] = [];
        parametros.columnasTabla!.forEach((c) => {
          datosFiltrados.push(this.transPipe(dato[c.atributo], c.pipe));
        });
        return datosFiltrados;
      });
      XLSX.utils.sheet_add_json(worksheet, datosTabla, { origin: "A2", skipHeader: true});
    }

    // Agregar fila de Total
    if (parametros.montoTotal) {
    const totalLabel = 'Total';
    const totalValue = this.transPipe(parametros.montoTotal, { nombre: 'moneda', datos: [] });
    const totalRow = new Array(parametros.columnasTabla?.length).fill('');
    totalRow[totalRow.length - 2] = totalLabel;
    totalRow[totalRow.length - 1] = totalValue;

    XLSX.utils.sheet_add_aoa(worksheet, [totalRow], { origin: `A${(parametros.datosTabla?.length??0) + 1}` });
    }

    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.guardarExcel(excelBuffer, parametros.titulo);
  }
  
  guardarExcel(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  transPipe(dato: any, pipe: any): string | null {
    if (pipe) {
      return this.pipeService.transformar(dato, pipe);
    } else {
      return dato;
    }
  }

}

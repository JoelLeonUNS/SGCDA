import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { PipeFormato } from '../../../interfaces/utilidades/pipe-formato.interface';
import { MesPipe } from '../../../pipes/mes/mes.pipe';
import { MonedaPipe } from '../../../pipes/moneda/moneda.pipe';
import { PeriodoMesPipe } from '../../../pipes/periodo-mes/periodo-mes.pipe';
import { PeriodoPipe } from '../../../pipes/periodo/periodo.pipe';

@Injectable({
  providedIn: 'root',
})
export class PipeService {
  constructor(
    private datePipe: DatePipe,
    private monedaPipe: MonedaPipe,
    private periodo: PeriodoPipe,
    private periodoMes: PeriodoMesPipe,
    private mes: MesPipe,
  ) {}

  transformar(dato: any, pipe: PipeFormato): string | null {
    switch (pipe.nombre) {
      case 'date':
        return this.datePipe.transform(dato, pipe.datos[0]);
      case 'moneda':
        return this.monedaPipe.transform(dato, pipe.datos[0]??false);
      case 'periodo':
        return this.periodo.transform(dato);
      case 'periodoMes':
        return this.periodoMes.transform(dato);
      case 'mes':
        return this.mes.transform(dato);
      case 'state':
        return dato ? pipe.datos[0] : pipe.datos[1];
      case 'unidad':
        return (dato??'') + ' ' + pipe.datos[0]; // se concatena la unidad
      default:
        return dato;
    }
  }
}

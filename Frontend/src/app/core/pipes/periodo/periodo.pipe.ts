import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'periodo',
  standalone: true
})
export class PeriodoPipe implements PipeTransform {

  transform(value: any): string {
    // si es un numero pasarlo a string
    if (typeof value === 'number') {
      value = value.toString();
    }
    if (!value.includes('-')) {
      return value;
    }
    let [period, year] = value.split('-');
    if (!period && !year) {
      return '';
    }
    period = period.trim();
    year = year.trim();
    const months = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
    const monthIndex = parseInt(period, 10) - 1;
    return `${months[monthIndex]??''} - ${year??''}`;
  }

}

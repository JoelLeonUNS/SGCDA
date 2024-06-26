import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mes',
  standalone: true
})
export class MesPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }
    const months = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
    const monthIndex = parseInt(value, 10) - 1;
    return `${months[monthIndex]??''}`;
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'periodoMes',
  standalone: true
})
export class PeriodoMesPipe implements PipeTransform {

  transform(value: string): string {
    let [mesInicio, mesFin] = value.split('-');
    mesInicio = mesInicio.trim();
    mesFin = mesFin.trim();
    const months = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
    const inicioIndice = parseInt(mesInicio, 10) - 1;
    const finIndice = parseInt(mesFin, 10) - 1;
    return `${months[inicioIndice]??''} - ${months[finIndice]??''}`;
  }

}

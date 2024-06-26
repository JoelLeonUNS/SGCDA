import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneda',
  standalone: true
})
export class MonedaPipe implements PipeTransform {

  transform(valor: any, junto:boolean): any {
    let valorNumber = parseFloat(valor);
    if (isNaN(valorNumber)) {
      return valor;
    }
    // si el valor es entero le pone 2 decimales, si no, lo deja como esta
    const valorNuevo = valorNumber.toFixed(2);
    if(junto) return `S/.${valorNuevo}`;
    return `S/. ${valorNuevo}`;
  }

}

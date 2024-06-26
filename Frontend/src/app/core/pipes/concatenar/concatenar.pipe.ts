import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'concatenar',
  standalone: true
})
export class ConcatenarPipe implements PipeTransform {
  
  transform(data: any, atributte: string[], separador: string): string {
    if (!data[atributte[0]] || !atributte) return data;
    const valores = atributte!.map((attr) => data[attr]);
    return valores
      .filter((prop) => prop !== null && prop !== undefined)
      .join(separador);
  }
}

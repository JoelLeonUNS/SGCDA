import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { ColumnaBusqueda } from '../../interfaces/utilidades/columna-busqueda.interface';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@Component({
  selector: 'app-buscador-tabla',
  standalone: true,
  imports: [NzDatePickerModule, FormsModule, NzIconModule, NzFlexModule, NzSelectModule, NzInputNumberModule, NzInputModule, NzFormModule],
  templateUrl: './buscador-tabla.component.html',
  styleUrl: './buscador-tabla.component.css',
})
export class BuscadorTablaComponent {
  @Input() columnasBusqueda?: ColumnaBusqueda[];
  
  fechaBusqueda?: Date;
  mesBusqueda?: string;
  anioBusqueda?: number;
  numeroBusqueda?: number;
  terminoBusqueda?: string;
  columnaBusqueda?: ColumnaBusqueda;
  
  @Output() columnaBusquedaChange = new EventEmitter<string>();
  @Output() terminoBusquedaChange = new EventEmitter<string>();

  private datePipe = new DatePipe('en-US');

  constructor() {}

  ngOnInit() {
    // la columnaBusqueda que tiene como default true es la que se selecciona por defecto
    this.columnaBusqueda = this.columnasBusqueda?.find((columna) => columna.default);
    this.columnaBusquedaChange.emit(this.columnaBusqueda?.columnKey);
    // si no hay ninguna columna con default true, se selecciona la primera
    if (!this.columnaBusqueda) {
      this.columnaBusqueda = this.columnasBusqueda?.[0];
      this.columnaBusquedaChange.emit(this.columnaBusqueda?.columnKey);
    }
  }

  buscarPorColumna() {
    this.columnaBusquedaChange.emit(this.columnaBusqueda?.columnKey);
  }

  buscarPorTermino() {
    this.terminoBusquedaChange.emit(this.terminoBusqueda??'');
  }

  buscarPorNumero() {
    this.terminoBusquedaChange.emit(this.numeroBusqueda?.toString()??'');
  }

  buscarPorDate() {
    console.log(this.datePipe.transform(this.fechaBusqueda, 'yyyy-MM-dd')??'');
    this.terminoBusquedaChange.emit(this.datePipe.transform(this.fechaBusqueda, 'yyyy-MM-dd')??'');
  }

  buscarPorMonth() {
    console.log(this.datePipe.transform(this.mesBusqueda, 'M')??'');
    this.terminoBusquedaChange.emit(this.datePipe.transform(this.mesBusqueda, 'M')??'');
  }

  buscarPorYear() {
    console.log(this.datePipe.transform(this.anioBusqueda, 'yyyy')??'');
    this.terminoBusquedaChange.emit(this.datePipe.transform(this.anioBusqueda, 'yyyy')??'');
  }

} 

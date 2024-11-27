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
  @Input() terminoBusqueda?: string;
  @Input() columnaBusqueda?: string;

  @Output() columnaBusquedaChange = new EventEmitter<string>();
  @Output() terminoBusquedaChange = new EventEmitter<string>();
  
  fechaBusqueda?: Date;
  mesBusqueda?: string;
  anioBusqueda?: number;
  numeroBusqueda?: number;
  tipo: string = 'text';
  
  private datePipe = new DatePipe('en-US');

  constructor() {}

  ngOnInit() {
    if (!this.columnaBusqueda) {
      // la columnaBusqueda que tiene como default true es la que se selecciona por defecto
      // si no hay ninguna columna con default true, se selecciona la primera
      const columna = this.columnasBusqueda?.find((columna) => columna.default) ?? this.columnasBusqueda?.[0];
      this.columnaBusqueda = columna?.columnKey;
      this.tipo = columna?.type ?? 'text';
      this.buscarPorColumna();
    }
  }

  buscarPorColumna() {
    this.tipo = this.columnasBusqueda?.find((columna) => columna.columnKey === this.columnaBusqueda)?.type ?? 'text';
    this.columnaBusquedaChange.emit(this.columnaBusqueda);
  }

  buscarPorTermino() {
    this.terminoBusquedaChange.emit(this.terminoBusqueda);
  }

  buscarPorNumero() {
    this.terminoBusquedaChange.emit(this.numeroBusqueda?.toString()??'');
  }

  buscarPorDate() {
    this.terminoBusquedaChange.emit(this.datePipe.transform(this.fechaBusqueda, 'yyyy-MM-dd')??'');
  }

  buscarPorMonth() {
    this.terminoBusquedaChange.emit(this.datePipe.transform(this.mesBusqueda, 'M')??'');
  }

  buscarPorYear() {
    this.terminoBusquedaChange.emit(this.datePipe.transform(this.anioBusqueda, 'yyyy')??'');
  }

} 

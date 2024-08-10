import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ColumnaOrden } from '../../interfaces/utilidades/columna-orden.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-organizador-fichero',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzIconModule,
    NzFlexModule,
    NzSelectModule,
    NzDividerModule
  ],
  templateUrl: './organizador-fichero.component.html',
  styleUrl: './organizador-fichero.component.css'
})
export class OrganizadorFicheroComponent {
  @Input() columnasOrden?: ColumnaOrden[];
  columnaOrden?: ColumnaOrden;
  orden = 'asc' as 'asc' | 'desc';

  @Output() columnaOrdenChange = new EventEmitter<string>();
  @Output() ordenChange = new EventEmitter<string>();
  @Output() distribuirPorChange = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.columnaOrden = this.columnasOrden?.find((columna) => columna.default);
  }

  ordenarPorColumna() {
    this.columnaOrdenChange.emit(this.columnaOrden?.columnKey);
  }

  cambiarOrden() {
    this.orden = this.orden === 'asc' ? 'desc' : 'asc';
    this.ordenChange.emit(this.orden);
  }

  distribuirPor(tipo: string) {
    this.distribuirPorChange.emit(tipo);
  }
}

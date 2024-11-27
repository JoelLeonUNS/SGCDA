import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { ServicioCrud } from '../../servicios/rest/servicio-crud';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-filtrador-tabla',
  standalone: true,
  imports: [
    FormsModule,
    NzButtonModule,
    NzRadioModule,
    NzIconModule,
    NzDividerModule
  ],
  templateUrl: './filtrador-tabla.component.html',
  styleUrl: './filtrador-tabla.component.css'
})
export class FiltradorTablaComponent {
  @Input() atributte:string[] = ['id', 'name'];
  @Input() option?:any[];
  @Input() servicio?:ServicioCrud<any>;
  
  @Output() change:EventEmitter<any> = new EventEmitter<any>();
  
  idValor:number = -1;
  options:any[] = []
  cargando:boolean = false;

  precargarDatos(item:any) {
    this.idValor = item.id;
    this.cargarDatos();
  }

  cargarDatos() {
    this.cargando = true;
    this.servicio?.obtenerTodos().subscribe({
      next: (options) => {
        this.options = options;
        this.cargando = false;
      },
      error: () => this.cargando = false
    });
  }

  cambio(event:any) {
    this.change.emit(event);
  }
 
}

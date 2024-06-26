import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule, NzSelectSizeType } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ServicioCrud } from '../../../../servicios/rest/servicio-crud';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [NzSelectModule, NzFormModule, NzIconModule, FormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
})
export class SelectComponent implements OnInit {
  
  @Input() valor?:any;
  @Input() label?:string;
  @Input() atributte:string[] = ['id', 'name'];
  @Input() item?:any;
  @Input() gender?:string;
  @Input() accion?:string;
  @Input() id:number = 1;
  @Input() servicio?:ServicioCrud<any>;
  @Input() size:NzSelectSizeType = 'default';

  @Output() valorChange = new EventEmitter<any>();
  @Output() cargadoChange = new EventEmitter<boolean>();
  
  options:any[] = []
  cargando:boolean = false;

  get prefijo() {
    return this.gender == 'F' ? 'a' : ''
  }

  ngOnInit(): void {
    this.cargarItem();
  }

  cargarItem() {
    this.servicio?.obtenerPorId(this.id).subscribe({
      next: (respuesta) => {
        this.item = respuesta;
        this.valor = respuesta.id;
        this.valorChange.emit(respuesta.id);
        this.cargadoChange.emit(true);
      },
      error: () => {
        this.item = 1;
      },
    });
  }

  cargarDatos() {
    if(this.accion == 'CREAR' && this.options.length == 0) {
      this.cargarDatosCrear();
    } else if (this.accion == 'EDITAR' && this.options.length == 0) {
      this.cargarDatosEditar();
    } else if (this.options.length == 0) {
      this.cargarDatosEditar()
    }
  }

  cargarDatosEditar() {
    this.cargando = true;
    this.servicio?.obtenerTodos().subscribe({
      next: (options) => {
        this.options = options;
        this.cargando = false;
      },
      error: () => this.cargando = false
    });
  }

  cargarDatosCrear() {
    this.cargando = true;
    this.servicio?.obtenerActivos().subscribe({
      next: (options) => {
        this.options = options;
        this.cargando = false;
      },
      error: () => this.cargando = false
    });
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ServicioCrud } from '../../../../servicios/rest/servicio-crud';

@Component({
    selector: 'app-select-item',
    standalone: true,
    templateUrl: './select-item.component.html',
    styleUrl: './select-item.component.css',
    imports: [
      NzSelectModule, 
      NzFormModule, 
      NzIconModule, 
      FormsModule, 
    ],
})
export class SelectItemComponent implements OnInit {
  
  @Input() valor?:any;
  @Input() label?:string = 'Periodo';
  @Input() atributte:string[] = ['anio','correlativo_romano'];
  @Input() separador:string = ' - ';
  @Input() item?:any;
  @Input() gender?:string;
  @Input() accion?:string;
  @Input() id:number = 1;
  @Input() modo:'ACTUAL' | 'POR_ID' = 'ACTUAL';

  @Output() valorChange = new EventEmitter<any>();
  @Output() itemChange = new EventEmitter<any>();
  @Output() cargadoChange = new EventEmitter<boolean>();
  
  options:any[] = []
  cargando:boolean = false;

  get prefijo() {
    return this.gender == 'F' ? 'a' : ''
  }

  constructor(private servicio:ServicioCrud<any>) {}

  ngOnInit(): void {
    if(this.modo == 'ACTUAL') {
      this.cargarItem();
    } else if (this.modo == 'POR_ID') {
      this.cargarPorId(this.id);
    }
  }

  itemCambiado(event:any) {
    this.valorChange.emit(event);
    this.itemChange.emit(this.options.find((i) => i.id == event));
  }

  cargarItem() {
    // this.servicio.obtenerActual().subscribe({
    //   next: (respuesta) => { 
    //     this.manejarItem(respuesta);
    //   },
    //   error: () => {
    //     this.item = 1;
    //   },
    // });
  }

  cargarPorId(id:number) {
    this.servicio.obtenerPorId(id).subscribe({
      next: (respuesta) => {
        this.manejarItem(respuesta);
      },
      error: () => {
        this.item = 1;
      },
    });
  }

  manejarItem(respuesta:any) {
    this.item = respuesta;
    this.valor = respuesta.id;
    this.valorChange.emit(respuesta.id);
    this.itemChange.emit(respuesta);
    this.cargadoChange.emit(true);
  }

  cargarDatos() {
    // this.servicio.mostrarPeriodosDeuda().subscribe({
    //   next: (respuesta) => {
    //     this.options = respuesta;
    //   },
    //   error: () => {
    //     this.options = [];
    //   },
    // });
  }


}

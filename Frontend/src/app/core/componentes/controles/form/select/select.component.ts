import { Component, EventEmitter, Input, Output, inject} from '@angular/core';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ServicioCrud } from '../../../../servicios/rest/servicio-crud';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [NzSelectModule, NzFormModule, NzIconModule, ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
  viewProviders: [{
    provide: ControlContainer,
    useFactory: () => inject(ControlContainer, { skipSelf: true , host: true })
  }]
})
export class SelectComponent {
  @Input() controlName?:string;
  @Input() label?:string;
  // Atributte es para indicar que atributos se van a mostrar en el select, el primer atributo es el que se va a enviar al form, el segundo es el que se va a mostrar
  @Input() atributte:string[] = ['id', 'name'];
  // Option es para cuando ya hay una opción previamnete seleccionada
  @Input() option?:any[];
  // Options es para cuando se cargan las opciones desde un servicio o estaticamente desde el componente padre
  @Input() options:any[] = []
  // Filtros es para cuando se requiere filtrar las opciones que se van a mostrar, normalmente se filtrarán por el atributo id. Pueden haber filtros incluyentes o excluyentes
  @Input() filtrosExcluyentes?:any[];
  @Input() filtrosIncluyentes?:any[];
  // Mostrar la opción todos en el select
  @Input() isTodos:boolean = false;
  // El texto que se mostrará en la opción todos
  @Input() optionTodos:string = 'Todos';
  @Input() gender?:string;
  @Input() accion?:string;
  @Input() servicio?:ServicioCrud<any>;

  @Input() icon?:string;
  @Input() size:'default' | 'small' | 'large' = 'default';

  @Output() change:EventEmitter<any> = new EventEmitter<any>();
  @Output() valor:EventEmitter<any> = new EventEmitter<any>();
  
  cargando:boolean = false;
  
  get prefijo() {
    return this.gender == 'F' ? 'a' : ''
  }

  cargarDatos() {
    if (this.options.length > 0) {
      this.cargando = false;
      return;
    }

    switch (this.accion) {
      case 'CREAR':
      this.cargarDatosCrear();
      break;
      case 'EDITAR':
      this.cargarDatosEditar();
      break;
      default:
      this.cargarDatosEstaticos();
      break;
    }
  }

  cargarDatosEstaticos() {
    this.cargando = true;
    if (this.options) {
      this.agregarOpcionTodos();
      this.cargando = false;
    } else {
      this.cargando = false;
    }
  }

  cargarDatosEditar() {
    this.cargando = true;
    this.servicio?.obtenerTodos().subscribe({
      next: (options) => {
        this.options = this.filtrarOptions(options);
        this.agregarOpcionTodos();
        this.cargando = false;
      },
      error: () => this.cargando = false
    });
  }

  cargarDatosCrear() {
    this.cargando = true;
    this.servicio?.obtenerActivos().subscribe({
      next: (options) => {
        this.options = this.filtrarOptions(options);
        this.agregarOpcionTodos();
        this.cargando = false;
      },
      error: () => this.cargando = false
    });
  }

  filtrarOptions(options:any[]): any[] {
    if (this.filtrosIncluyentes) {
      return options.filter((o) => this.filtrosIncluyentes!.includes(o.id));
    } else if (this.filtrosExcluyentes) {
      return options.filter((o) => !this.filtrosExcluyentes!.includes(o.id));
    } else {
      return options;
    }
  }

  agregarOpcionTodos() {
    if (this.isTodos) {
      // Agregar la opción todos al final de las opciones, y que esté seleccionada por defecto
      // además debe seguir la estructura de atributos que se le pasó al componente
      this.options.push({ [this.atributte[0]]: -1, [this.atributte[1]]: this.optionTodos });
    }
  }

  cambio(event:any) {
    this.change.emit(event);
    if (this.options.length > 0) {
      this.valor.emit(this.options.find((o) => o[this.atributte[0]] == event));
    }
  }

}

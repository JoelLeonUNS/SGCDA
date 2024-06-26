import { Component, Input, inject} from '@angular/core';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ServicioCrud } from '../../../../servicios/rest/servicio-crud';

@Component({
  selector: 'app-multiple-select',
  standalone: true,
  imports: [NzSelectModule, NzFormModule, NzIconModule, ReactiveFormsModule],
  templateUrl: './multiple-select.component.html',
  styleUrl: './multiple-select.component.css',
  viewProviders: [{
    provide: ControlContainer,
    useFactory: () => inject(ControlContainer, { skipSelf: true , host: true })
  }]
})
export class MultipleSelectComponent {
  @Input() controlName?:string;
  @Input() label?:string;
  @Input() atributte:string[] = ['id', 'name'];
  @Input() option?:any[];
  @Input() gender?:string;
  @Input() accion?:string;
  @Input() servicio?:ServicioCrud<any>;
  
  options:any[] = []
  cargando:boolean = false;
  
  get prefijo() {
    return this.gender == 'F' ? 'a' : ''
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

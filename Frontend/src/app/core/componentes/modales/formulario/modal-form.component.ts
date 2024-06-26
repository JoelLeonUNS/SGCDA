import { Input, Output, EventEmitter, Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ServicioCrud } from '../../../servicios/rest/servicio-crud';
import { ModalComponent } from '../modal.component';

@Component({
  selector: 'app-modal-form-component',
  standalone: true,
  template: ``,
})
export abstract class ModalFormComponent extends ModalComponent {
  @Input() accion?: string;
  
  @Output() accionChange = new EventEmitter<string>();
  @Output() proximaIdChange = new EventEmitter<number>();
  @Output() nuevoChange = new EventEmitter<any>();
  
  item: any = {};
  idDato: number = -1;

  protected abstract modalForm: FormGroup<any>;
  constructor(
    protected msgService: NzMessageService,
    protected servicio: ServicioCrud<any>,
    protected fb: NonNullableFormBuilder
  ) {
    super();
  }

  obtenerProximaId() {
    this.servicio.obtenerUltimaId().subscribe({
      next: (respuesta) => {
        this.proximaIdChange.emit(respuesta.id + 1);
      },
    });
  }

  mostrarValores(data: any) {
    this.item = data;
    Object.keys(this.modalForm.value).forEach((key) => {
      const control = this.modalForm.get(key);
      const valor = data[key];
      if (control && valor) {
        control.setValue(valor);
      }
    });
  }

  editarPorId(id: number) {
    this.idDato = id;
    this.servicio.obtenerPorId(id).subscribe({
      next: (respuesta) => {
        this.llenarFormPorId(respuesta);
      },
      error: () => {
        this.msgService.error('Error al extraer los datos.');
      },
    });
  }

  llenarFormPorId(data: any) {
    Object.entries(data).forEach(([key, value]) => {
      const control = this.modalForm.get(key);
      if (control) { control.setValue(value) }
    });
  }

  enviarForm() {
    this.confirmando = true;
    if (this.modalForm.valid) {
      if (this.accion == 'CREAR') {
        this.enviarNuevo();
      } else {
        this.enviarEditado();
      }
    } else {
      console.log(this.modalForm.value);
      this.confirmando = false;
      this.msgService.error('Datos incompletos o erroneos.');
      Object.values(this.modalForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.markAsTouched();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  enviarNuevo(formParseado?: FormGroup) {
    // formParseado es para cuando se necesita parsear el formulario antes de enviarlo
    const form = formParseado??this.modalForm;
    this.servicio.crear(form.value).subscribe({
      next: (respuesta) => {
        this.nuevoChange.emit(respuesta);
        this.manejarRespuesta('creó', respuesta);
      },
      error: (e) => {
        this.manejarError(e);
      },
    });
  }

  enviarEditado(formParseado?: FormGroup) {
    const form = formParseado??this.modalForm;
    this.servicio.actualizar(this.idDato, form.value).subscribe({
      next: (respuesta) => {
        this.manejarRespuesta('editó', respuesta);
      },
      error: (e) => {
        this.manejarError(e);
      },
    });
  }

  manejarRespuesta(info: string, respuesta: any) {
    this.confirmar(respuesta);
    this.msgService.success(`Se ${info} correctamente el registro`);
  }

  manejarError(e: any) {
    console.log(this.modalForm.value);
    console.log(e.error);
    console.log(e.error.message);
    this.msgService.error(e.error.message);
    this.confirmando = false;
  }

  cerrar(): void {
    this.confirmando = false;
    this.accionChange.emit('');
    this.cancelar(true);
  }
}

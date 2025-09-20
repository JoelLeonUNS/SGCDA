import { Input, Output, EventEmitter, Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ServicioCrud } from '../../../servicios/rest/servicio-crud';
import { ModalComponent } from '../modal.component';
import { DataStorageService } from '../../../servicios/localstorage/data-storage.service';

@Component({
  selector: 'app-modal-pasos-component',
  standalone: true,
  template: ``,
})
export abstract class ModalPasosComponent extends ModalComponent {
  override ancho: number = 850;// antes 750
  override disabledConfirmar: boolean = false;
  @Output() proximaIdChange = new EventEmitter<number>();
  @Output() nuevoChange = new EventEmitter<any>();
  @Input() accion?: string;
  
  disabledAnt: boolean = true;
  disabledSig: boolean = false;
  current:number = 0;
  steps:number = 3;

  // protected abstract modalForm: FormGroup<any>;
  constructor(
    protected msgService: NzMessageService,
    protected servicio: ServicioCrud<any>,
    protected fb: NonNullableFormBuilder,
    protected dataStorageSrvc: DataStorageService
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

  enviarForm() {
    // this.confirmando = true;
    // if (this.modalForm.valid) {
    //    this.enviar();
    // } else {
    //   console.log(this.modalForm.value);
    //   this.confirmando = false;
    //   this.msgService.error('Datos incompletos o erroneos.');
    //   Object.values(this.modalForm.controls).forEach((control) => {
    //     if (control.invalid) {
    //       control.markAsDirty();
    //       control.markAsTouched();
    //       control.updateValueAndValidity({ onlySelf: true });
    //     }
    //   });
    // }
  }

  enviar(formParseado?: FormGroup) {
    // formParseado es para cuando se necesita parsear el formulario antes de enviarlo
    // const form = formParseado??this.modalForm;
    // this.servicio.crear(form.value).subscribe({
    //   next: (respuesta) => {
    //     this.nuevoChange.emit(respuesta);
    //     this.manejarRespuesta('creó', respuesta);
    //   },
    //   error: (e) => {
    //     this.manejarError(e);
    //   },
    // });
  }

  manejarRespuesta(info: string, respuesta: any) {
    this.confirmar(respuesta);
    this.msgService.success(`Se ${info} correctamente el registro`);
  }

  manejarError(e: any) {
    // console.log(this.modalForm.value);
    // console.log(e.error);
    // console.log(e.error.message);
    // this.msgService.error(e.error.message);
    // this.confirmando = false;
  }

  cerrar(): void {
    this.confirmando = false;
    this.cancelar(true);
  }

  irAtras() {
    if (this.current > 0) this.current -= 1;
    this.comprobarBtns();
  }

  irAdelante() {
    if (this.current < this.steps) this.current += 1;
    this.comprobarBtns();
  }

  comprobarBtns() {
    // this.disabledConfirmar = this.current !== (this.steps - 1) && this.modalForm.valid;
    this.disabledAnt = this.current === 0;
    this.disabledSig = this.current === this.steps - 1;
  }
}

import { CommonModule, DatePipe } from '@angular/common';
import { Component} from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ModalFormComponent } from '../modal-form.component';
import { PeriodoService } from '../../../../servicios/rest/periodo/periodo.service';
import { ComisionProcesoService } from '../../../../servicios/rest/comision-proceso/comision-proceso.service';
import { ComisionService } from '../../../../servicios/rest/comision/comision.service';
import { SelectComponent } from "../../../controles/form/select/select.component";
import { DateComponent } from "../../../controles/form/date/date.component";
import { BuscarAgregarMultipleComponent } from '../../../controles/form/buscar-agregar-multiple/buscar-agregar-multiple.component';
import { TimeComponent } from "../../../controles/form/time/time.component";
import { ProcesoService } from '../../../../servicios/rest/proceso/proceso.service';
import { MostrarProcesoPeriodoComponent } from "../../../mostrar-proceso-periodo/mostrar-proceso-periodo.component";

@Component({
    selector: 'app-modal-form-comision-proceso',
    standalone: true,
    templateUrl: './modal-form-comision-proceso.component.html',
    styleUrl: '../modal-form.component.css',
    imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzModalModule,
    NzButtonModule,
    NzRadioModule,
    NzSelectModule,
    NzDatePickerModule,
    NzGridModule,
    SelectComponent,
    DateComponent,
    BuscarAgregarMultipleComponent,
    TimeComponent,
    MostrarProcesoPeriodoComponent
]
})
export class ModalFormComisionProcesoComponent extends ModalFormComponent {
  
  protected override modalForm = this.fb.group({
    comision_id: [null, [Validators.required]],
    miembros_ids: [null, [Validators.required]],
    proceso_periodo_id: [null, [Validators.required]],
    // horario_id: [null],
    fecha: [null, [Validators.required]],
    hora_inicial: [null, [Validators.required]],
    hora_final: [null, [Validators.required]]
  });

  constructor(
    msgService: NzMessageService,
    servicio: ComisionProcesoService,
    fb: NonNullableFormBuilder,
    public procesoService: ProcesoService,
    public periodoService: PeriodoService,
    public comisionService: ComisionService,
    private datePipe: DatePipe
  ) {
    super(msgService, servicio, fb);
  }

  override mostrarValores(data: any) {
    this.item = data;
    Object.keys(this.modalForm.value).forEach((key) => {
      const control = this.modalForm.get(key);
      let valor = data[key];
      if (control && valor) {
        if (key.includes('hora')) {
          valor = this.convertirHora(valor);
          console.log(valor);
        }
        control.setValue(valor);
      }
    });
  }

  override llenarFormPorId(data: any) {
    Object.entries(data).forEach(([key, value]) => {
      const control = this.modalForm.get(key);
      if (control) { 
        if (key.includes('hora')) {
          value = this.convertirHora(value);
        }
        control.setValue(value) 
      }
    });
  }

  setProcesoPeriodoId(proceso_periodo: any) {
    this.modalForm.get('proceso_periodo_id')?.setValue(proceso_periodo.id);
  }

  override enviarNuevo() {
    const formParseado = this.crearFormParseado();
    super.enviarNuevo(formParseado);
  }
  
  override enviarEditado() {
    const formParseado = this.crearFormParseado();
    super.enviarEditado(formParseado);
  }

  private crearFormParseado(): FormGroup {
    let formParseado: FormGroup = this.fb.group({
      comision_id: [null],
      miembros_ids: [null],
      proceso_periodo_id: [null],
      fecha: [null],
      hora_inicial: [null],
      hora_final: [null]
    });

    formParseado.setValue(this.modalForm.getRawValue());
    
    // Parsear la fecha y hora
    let nuevaFecha = this.datePipe.transform(formParseado.get('fecha')?.value, 'yyyy-MM-dd');
    formParseado.get('fecha')?.setValue(nuevaFecha!);
    let nuevaHora = this.datePipe.transform(formParseado.get('hora_inicial')?.value, 'HH:mm');
    formParseado.get('hora_inicial')?.setValue(nuevaHora!);
    nuevaHora = this.datePipe.transform(formParseado.get('hora_final')?.value, 'HH:mm');
    formParseado.get('hora_final')?.setValue(nuevaHora!);
  
    return formParseado;
  }

  convertirHora(hora:any):Date {
    // Asegúrate de que la hora esté en el formato correcto "HH:mm:ss"
    if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(hora)) {
        throw new Error("Formato de hora inválido");
    }

    // Crear una fecha actual y ajustar la hora
    const fechaActual = new Date();
    const [horas, minutos, segundos] = hora.split(':');
    fechaActual.setHours(horas);
    fechaActual.setMinutes(minutos);
    fechaActual.setSeconds(segundos);
    fechaActual.setMilliseconds(0); // Si no quieres incluir milisegundos

    return fechaActual;
}

}

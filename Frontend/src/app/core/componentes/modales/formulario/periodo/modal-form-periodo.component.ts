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
import { InputComponent } from '../../../controles/form/input/input.component';
import { PeriodoService } from '../../../../servicios/rest/periodo/periodo.service';
import { DateRangeComponent } from "../../../controles/form/date-range/date-range.component";
import { DateComponent } from "../../../controles/form/date/date.component";

@Component({
    selector: 'app-modal-form-periodo',
    standalone: true,
    templateUrl: './modal-form-periodo.component.html',
    styleUrl: '../modal-form.component.css',
    imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    InputComponent,
    NzModalModule,
    NzButtonModule,
    NzRadioModule,
    NzSelectModule,
    NzDatePickerModule,
    NzGridModule,
    DateRangeComponent,
    DateComponent
]
})
export class ModalFormPeriodoComponent extends ModalFormComponent {
  
  protected override modalForm = this.fb.group({
    anio: [new Date(), [Validators.required]],
    correlativo_romano: ['I', [Validators.required]],
    fecha_inicial: [null, [Validators.required]],
    fecha_final: [null, [Validators.required]],
  });

  constructor(
    msgService: NzMessageService,
    servicio: PeriodoService,
    fb: NonNullableFormBuilder,
    private datePipe: DatePipe
  ) {
    super(msgService, servicio, fb);
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
      anio: [null],
      correlativo_romano: [null],
      fecha_inicial: [null],
      fecha_final: [null],
    });

    formParseado.setValue(this.modalForm.getRawValue());
    
    // Parsear la fecha
    let nuevaFecha = this.datePipe.transform(formParseado.get('fecha_inicial')?.value, 'yyyy-MM-dd');
    formParseado.get('fecha_inicial')?.setValue(nuevaFecha!);
    nuevaFecha = this.datePipe.transform(formParseado.get('fecha_final')?.value, 'yyyy-MM-dd');
    formParseado.get('fecha_final')?.setValue(nuevaFecha!);
    let nuevoAnio = this.datePipe.transform(formParseado.get('anio')?.value, 'yyyy');
    formParseado.get('anio')?.setValue(nuevoAnio!);
  
    return formParseado;
  }

}

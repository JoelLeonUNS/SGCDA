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
import { ProcesoPeriodoService } from '../../../../servicios/rest/proceso-periodo/proceso-periodo.service';
import { SelectComponent } from "../../../controles/form/select/select.component";
import { ProcesoService } from '../../../../servicios/rest/proceso/proceso.service';
import { DateRangeComponent } from "../../../controles/form/date-range/date-range.component";
import { MostrarPeriodoComponent } from "../../../mostrar-periodo/mostrar-periodo.component";

@Component({
  selector: 'app-modal-form-proceso-periodo',
  standalone: true,
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
    SelectComponent,
    DateRangeComponent,
    MostrarPeriodoComponent
],
  templateUrl: './modal-form-proceso-periodo.component.html',
  styleUrl: '../modal-form.component.css',
})
export class ModalFormProcesoPeriodoComponent extends ModalFormComponent {
  
  protected override modalForm = this.fb.group({
    proceso_id: [null, [Validators.required]],
    periodo_id: [0, [Validators.required]],
    fecha_inicial: [null, [Validators.required]],
    fecha_final: [null, [Validators.required]],
  });

  constructor(
    msgService: NzMessageService,
    servicio: ProcesoPeriodoService,
    fb: NonNullableFormBuilder,
    public procesoService: ProcesoService,
    private datePipe: DatePipe
  ) {
    super(msgService, servicio, fb);
  }

  setPeriodoId(periodo: any) {
    this.modalForm.get('periodo_id')?.setValue(periodo.id);
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
      proceso_id: [null],
      periodo_id: [null],
      fecha_inicial: [null],
      fecha_final: [null],
    });

    formParseado.setValue(this.modalForm.getRawValue());
    
    // Parsear la fecha
    let nuevaFecha = this.datePipe.transform(formParseado.get('fecha_inicial')?.value, 'yyyy-MM-dd');
    formParseado.get('fecha_inicial')?.setValue(nuevaFecha!);
    nuevaFecha = this.datePipe.transform(formParseado.get('fecha_final')?.value, 'yyyy-MM-dd');
    formParseado.get('fecha_final')?.setValue(nuevaFecha!);
  
    return formParseado;
  }

}

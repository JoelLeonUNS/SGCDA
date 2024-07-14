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
import { ComisionProcesoService } from '../../../../servicios/rest/comision-proceso/comision-proceso.service';
import { ComisionService } from '../../../../servicios/rest/comision/comision.service';
import { SelectComponent } from "../../../controles/form/select/select.component";
import { DateComponent } from "../../../controles/form/date/date.component";
import { InputNumberComponent } from "../../../controles/form/input-number/input-number.component";
import { BuscarAgregarMultipleComponent } from '../../../controles/form/buscar-agregar-multiple/buscar-agregar-multiple.component';
import { TimeComponent } from "../../../controles/form/time/time.component";
import { ProcesoService } from '../../../../servicios/rest/proceso/proceso.service';

@Component({
    selector: 'app-modal-form-comision-proceso',
    standalone: true,
    templateUrl: './modal-form-comision-proceso.component.html',
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
    SelectComponent,
    DateComponent,
    InputNumberComponent,
    BuscarAgregarMultipleComponent,
    TimeComponent
]
})
export class ModalFormComisionProcesoComponent extends ModalFormComponent {
  
  protected override modalForm = this.fb.group({
    comision_id: [null, [Validators.required]],
    miembros_ids: [null, [Validators.required]],
    proceso_id: [null, [Validators.required]],
    periodo_id: [null, [Validators.required]],
    fecha: [null, [Validators.required]],
    hora: [null, [Validators.required]],
    paga: [0, [Validators.required]],
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
      proceso: [null],
      periodo: [null],
      fecha: [null],
      hora: [null],
      paga: [null],
    });

    formParseado.setValue(this.modalForm.getRawValue());
    
    // Parsear la fecha y hora
    let nuevaFecha = this.datePipe.transform(formParseado.get('fecha')?.value, 'yyyy-MM-dd');
    formParseado.get('fecha')?.setValue(nuevaFecha!);
    let nuevaHora = this.datePipe.transform(formParseado.get('hora')?.value, 'HH:mm');
    formParseado.get('hora')?.setValue(nuevaHora!);
  
    return formParseado;
  }

}

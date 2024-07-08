import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { InputNumberComponent } from "../../../controles/form/input-number/input-number.component";

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
    ]
})
export class ModalFormPeriodoComponent extends ModalFormComponent {
  
  protected override modalForm = this.fb.group({
    anio: [new Date().getFullYear(), [Validators.required]],
    correlativo_romano: ['I', [Validators.required]],
    fecha_inicial: [null, [Validators.required]],
    fecha_final: [null, [Validators.required]],
  });

  constructor(
    msgService: NzMessageService,
    servicio: PeriodoService,
    fb: NonNullableFormBuilder,
  ) {
    super(msgService, servicio, fb);
  }

}

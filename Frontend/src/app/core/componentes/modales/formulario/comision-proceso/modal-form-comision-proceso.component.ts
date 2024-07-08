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
import { ComisionProcesoService } from '../../../../servicios/rest/comision-proceso/comision-proceso.service';

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
    ]
})
export class ModalFormComisionProcesoComponent extends ModalFormComponent {
  
  protected override modalForm = this.fb.group({
    descripcion: [null, [Validators.required]],
    miembros_ids: [null, [Validators.required]],
    proceso: [null, [Validators.required]],
    periodo: [null, [Validators.required]],
    fecha: [null, [Validators.required]],
    hora: [null, [Validators.required]],
    paga: [null, [Validators.required]],
  });

  constructor(
    msgService: NzMessageService,
    servicio: ComisionProcesoService,
    fb: NonNullableFormBuilder,
  ) {
    super(msgService, servicio, fb);
  }

}

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
import { ProcesoService } from '../../../../servicios/rest/proceso/proceso.service';

@Component({
  selector: 'app-modal-form-proceso',
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
  ],
  templateUrl: './modal-form-proceso.component.html',
  styleUrl: '../modal-form.component.css',
})
export class ModalFormProcesoComponent extends ModalFormComponent {
  
  protected override modalForm = this.fb.group({
    nombre: ['', [Validators.required]],
  });

  constructor(
    msgService: NzMessageService,
    servicio: ProcesoService,
    fb: NonNullableFormBuilder,
  ) {
    super(msgService, servicio, fb);
  }

}

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
import { CargoService } from '../../../../servicios/rest/cargo/cargo.service';

@Component({
  selector: 'app-modal-form-cargo',
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
  templateUrl: './modal-form-cargo.component.html',
  styleUrl: '../modal-form.component.css',
})
export class ModalFormCargoComponent extends ModalFormComponent {
  
  protected override modalForm = this.fb.group({
    nombre: ['', [Validators.required]],
  });

  constructor(
    msgService: NzMessageService,
    servicio: CargoService,
    fb: NonNullableFormBuilder,
  ) {
    super(msgService, servicio, fb);
  }

}

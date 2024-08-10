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
import { MiembroCargoService } from '../../../../servicios/rest/miembro-cargo/miembro-cargo.service';
import { CargoService } from '../../../../servicios/rest/cargo/cargo.service';
import { SelectComponent } from "../../../controles/form/select/select.component";

@Component({
    selector: 'app-modal-form-miembro',
    standalone: true,
    templateUrl: './modal-form-miembro.component.html',
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
        SelectComponent
    ]
})
export class ModalFormMiembroComponent extends ModalFormComponent {
  
  protected override modalForm = this.fb.group({
    miembro_id: [null],
    nombres: [null, [Validators.required]],
    apellidos: [null, [Validators.required]],
    dni: [null], // despues poner required
    cargo_especialidad_id: [null, [Validators.required]],
  });

  constructor(
    msgService: NzMessageService,
    servicio: MiembroCargoService, // Se inyecta el servicio de miembro-cargo
    fb: NonNullableFormBuilder,
    public cargoService: CargoService, // Se inyecta el servicio de cargo
  ) {
    super(msgService, servicio, fb);
  }

}

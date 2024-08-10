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
import { SelectComponent } from "../../../controles/form/select/select.component";
import { AulaService } from '../../../../servicios/rest/aula/aula.service';
import { PabellonService } from '../../../../servicios/rest/pabellon/pabellon.service';

@Component({
    selector: 'app-modal-form-aula',
    standalone: true,
    templateUrl: './modal-form-aula.component.html',
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
export class ModalFormAulaComponent extends ModalFormComponent {
  
  protected override modalForm = this.fb.group({
    pabellon_id: [null, [Validators.required]],
    piso: [null, [Validators.required]],
    correlativo: [null, [Validators.required]],
    aforo: [null, [Validators.required]],
  });

  constructor(
    msgService: NzMessageService,
    servicio: AulaService, // Se inyecta el servicio de miembro-cargo
    fb: NonNullableFormBuilder,
    public pabellonService: PabellonService
  ) {
    super(msgService, servicio, fb);
  }

}

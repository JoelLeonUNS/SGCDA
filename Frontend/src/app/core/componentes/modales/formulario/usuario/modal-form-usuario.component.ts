import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ModalFormComponent } from '../modal-form.component';
import { InputComponent } from '../../../controles/form/input/input.component';
import { UsuarioService } from '../../../../servicios/rest/usuario/usuario.service';
import { RolService } from '../../../../servicios/rest/rol/rol.service';
import { SelectComponent } from '../../../controles/form/select/select.component';
import { InputPasswordComponent } from "../../../controles/form/input-password/input-password.component";

@Component({
    selector: 'app-modal-form-usuario',
    standalone: true,
    templateUrl: './modal-form-usuario.component.html',
    styleUrl: '../modal-form.component.css',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NzFormModule,
        InputComponent,
        NzModalModule,
        NzButtonModule,
        NzRadioModule,
        NzDatePickerModule,
        NzGridModule,
        SelectComponent,
        InputPasswordComponent
    ]
})
export class ModalFormUsuarioComponent extends ModalFormComponent {
  
  isCambiarClave:boolean = false;
  protected override modalForm = this.fb.group({
    rol_id: [null, [Validators.required]],
    login_name: [null, [Validators.required]],
    password: [null],
  });

  constructor(
    msgService: NzMessageService,
    servicio: UsuarioService,
    fb: NonNullableFormBuilder,
    public rolService: RolService
  ) {
    super(msgService, servicio, fb);
  }

  ngOnInit() {
    if(this.accion == 'CREAR') {
      this.cambiarClave();
    }
  }

  cambiarClave() {
    this.isCambiarClave = !this.isCambiarClave;
    this.modalForm .get('password')?.setValidators( this.isCambiarClave ? [Validators.required] : []);
    this.modalForm.get('password')?.updateValueAndValidity();
  }

  

}

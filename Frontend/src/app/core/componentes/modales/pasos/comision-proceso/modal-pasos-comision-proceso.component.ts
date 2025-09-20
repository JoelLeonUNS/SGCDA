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
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { ModalPasosComponent } from '../modal-pasos.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { DataStorageService } from '../../../../servicios/localstorage/data-storage.service';
import { ComisionProcesoService } from '../../../../servicios/rest/comision-proceso/comision-proceso.service';
import { ComisionProcesoComisionComponent } from "./p01-comision/comision-proceso-comision.component";
import { ComisionProcesoMiembroComponent } from "./p02-miembro/comision-proceso-miembro.component";
import { ComisionProcesoHorarioComponent } from "./p03-horario/comision-proceso-horario.component";

@Component({
    selector: 'app-modal-pasos-comision-proceso',
    standalone: true,
    templateUrl: './modal-pasos-comision-proceso.component.html',
    styleUrl: '../modal-pasos.component.css',
    imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzModalModule,
    NzButtonModule,
    NzRadioModule,
    NzSelectModule,
    NzDatePickerModule,
    NzGridModule,
    NzStepsModule,
    NzSpinModule,
    NzIconModule,
    NzAlertModule,
    ComisionProcesoComisionComponent,
    ComisionProcesoMiembroComponent,
    ComisionProcesoHorarioComponent
]
})
export class ModalPasosComisionProcesoComponent extends ModalPasosComponent {
  namespace = 'modal_pasos_comision_proceso';
  override btnPrimario: String = 'Guardar';
  override steps = 3;
   
  mensajeInfos: string[] = [
    'Elija la comisión a la que pertenecerá el proceso. También puede definir sus aulas.',
    'Elija los miembros que participarán en la comisión.',
    'Defina un horario para toda la comisión, o para cada miembro.'
  ];

  pasosValidos:boolean[] = [false, false, false];

  constructor(
    msgService: NzMessageService,
    servicio: ComisionProcesoService,
    fb: NonNullableFormBuilder,
    dataStorageSrvc: DataStorageService,
    private msg: NzMessageService,
  ) {
    super(msgService, servicio, fb, dataStorageSrvc);
  }

  ngOnInit(): void {
    this.current = this.dataStorageSrvc.obtenerDeNamespace<number>(this.namespace, 'current', 0, this.accion);
    this.comprobarBtns();
  }

  override irAtras(): void {
    super.irAtras();
    this.dataStorageSrvc.guardarEnNamespace(this.namespace, 'current', this.current, this.accion);
  }

  override irAdelante(): void {
    super.irAdelante();
    this.dataStorageSrvc.guardarEnNamespace(this.namespace, 'current', this.current, this.accion);
  }

  get isValido(): boolean {
    return this.pasosValidos[this.current];
  }

  guardar(): void {
    // Se va a formatear el formulario para enviarlo al servidor
    const nsComision = 'comision_proceso_comision';
    const nsMiembro = 'comision_proceso_miembro';
    const nsHorario = 'comision_proceso_horario';
    const formComision = this.dataStorageSrvc.obtenerDeNamespace<any>(nsComision, 'form', null, this.accion);
    if (formComision.usa_aula_ids) {
      const comision_id = formComision.comision_id;
      const aula_ids = formComision.aula_ids;
    }
  }

}

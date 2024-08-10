import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { TarjetaComponent } from '../tarjeta.component';
import { NzContextMenuService, NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { ModalService } from '../../../servicios/modal/modal.service';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ProcesoService } from '../../../servicios/rest/proceso/proceso.service';
import { ProcesoPeriodoService } from '../../../servicios/rest/proceso-periodo/proceso-periodo.service';

@Component({
  selector: 'app-tarjeta-procesos',
  standalone: true,
  imports: [
    NzButtonModule,
    NzCardModule,
    NzTagModule,
    NzIconModule,
    NzDropDownModule,
    NzDividerModule,
    NzPopconfirmModule,
    CommonModule
  ],
  templateUrl: './tarjeta-procesos.component.html',
  styleUrl: '../tarjeta.component.css'
})
export class TarjetaProcesosComponent extends TarjetaComponent {
  @Input() titulo?: string;
  @Input() periodo?: string;
  @Input() fechaInicial?: string;
  @Input() fechaFinal?: string;

  override modal: string = 'modalFormProcesoPeriodo';

  constructor(
    nzContextMenuService: NzContextMenuService,
    msg: NzMessageService,
    modalService:ModalService,
    servicioCrud: ProcesoPeriodoService
  ) {
    super(nzContextMenuService, msg, modalService, servicioCrud);
  }

  calcularDuracion(): string {
    if (!this.fechaInicial || !this.fechaFinal) {
      return 'No definido';
    }
    const fechaInicial = new Date(this.fechaInicial);
    const fechaFinal = new Date(this.fechaFinal);
    const diferencia = fechaFinal.getTime() - fechaInicial.getTime();
    const dias = diferencia / (1000 * 3600 * 24);
    return `${dias} días`;
  }

}

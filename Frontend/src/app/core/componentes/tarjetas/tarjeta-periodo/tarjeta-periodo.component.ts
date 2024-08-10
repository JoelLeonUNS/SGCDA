import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { TarjetaComponent } from '../tarjeta.component';
import { NzContextMenuService, NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { ModalService } from '../../../servicios/modal/modal.service';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { PeriodoService } from '../../../servicios/rest/periodo/periodo.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-tarjeta-periodo',
  standalone: true,
  imports: [
    NzButtonModule,
    NzCardModule,
    NzTagModule,
    NzDividerModule,
    NzIconModule,
    NzDropDownModule,
    NzPopconfirmModule,
    CommonModule
  ],
  templateUrl: './tarjeta-periodo.component.html',
  styleUrl: '../tarjeta.component.css'
})
export class TarjetaPeriodoComponent extends TarjetaComponent {
  override modal: string = 'modalFormPeriodo';
  @Input() titulo?: string;
  @Input() fechaInicial?: string;
  @Input() fechaFinal?: string;

  constructor(
    nzContextMenuService: NzContextMenuService,
    msg: NzMessageService,
    modalService:ModalService,
    servicioCrud: PeriodoService
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

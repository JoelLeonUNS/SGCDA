import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzContextMenuService, NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { ModalService } from '../../../servicios/modal/modal.service';
import { TarjetaComponent } from '../tarjeta.component';
import { ComisionProcesoService } from '../../../servicios/rest/comision-proceso/comision-proceso.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@Component({
  selector: 'app-tarjeta-aulas',
  standalone: true,
  imports: [
    NzButtonModule,
    NzCardModule,
    NzDropDownModule,
    NzTagModule,
    NzIconModule,
    NzDividerModule,
    NzPopconfirmModule,
    CommonModule
  ],
  templateUrl: './tarjeta-aulas.component.html',
  styleUrl: '../tarjeta.component.css'
})

export class TarjetaAulasComponent extends TarjetaComponent {
  override modal: string = 'modalFormAula';
  @Input() titulo?: string;
  @Input() encargado?: string;
  @Input() aforo?: number;
  @Input() piso?: number;
  @Input() nroMiembros?: number;

  constructor(
    nzContextMenuService: NzContextMenuService,
    msg: NzMessageService,
    modalService:ModalService,
    servicioCrud: ComisionProcesoService
  ) {
    super(nzContextMenuService, msg, modalService, servicioCrud);
  }

}

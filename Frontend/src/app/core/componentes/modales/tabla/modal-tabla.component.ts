import { Component, Input } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ItemInput } from '../../../interfaces/utilidades/item-input.interface';
import { ModalComponent } from '../modal.component';

@Component({
    selector: 'app-modal-tabla',
    standalone: true,
    imports: [NzModalModule,NzButtonModule],
    template: '',
})
export class ModalTablaComponent extends ModalComponent {
  override ancho: number = 750;
  @Input() itemInput:ItemInput = {
    id: null, valor:''
  };

  @Input() itemsInput = new Map<number, string>();

  cerrar() {
    this.cancelar(true);
  }

  agregar() {
    this.confirmar(this.itemInput)
  }

}

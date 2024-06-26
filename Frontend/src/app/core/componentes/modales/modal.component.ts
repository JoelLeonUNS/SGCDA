import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NzModalModule, NzButtonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() titulo:string = 'Modal';
  @Input() btnPrimario:String = 'Confirmar';
  @Input() btnSecundario:String = 'Cancelar';
  @Input() isVisible:boolean = true;
  @Input() ancho:number = 520;

  @Output() onCancelar = new EventEmitter<any>;
  @Output() onConfirmar = new EventEmitter<any>;
  @Output() isVisibleChange = new EventEmitter<boolean>;

  disabledConfirmar:boolean = false;
  disabledCancelar:boolean = false;
  confirmando:boolean = false;
  cancelando:boolean = false;

  cancelar(data:any) {
    this.onCancelar.emit(data);
    this.isVisible = false;
    this.isVisibleChange.emit(false);
  }

  confirmar(data:any) {
    this.onConfirmar.emit(data);
    this.isVisible = false;
    this.isVisibleChange.emit(false);
  }

  onDisabledConfirmar(valor:boolean) {
    this.disabledConfirmar = valor;
  }

  onDisabledCancelar(valor:boolean) {
    this.disabledCancelar = valor;
  }
  
}

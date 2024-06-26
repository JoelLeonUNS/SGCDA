import { Component, Input, ViewContainerRef, forwardRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, Form, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../../servicios/modal/modal.service';

@Component({
  selector: 'app-buscar-agregar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzFlexModule,
    NzInputModule,
    NzButtonModule,
    NzFormModule,
  ],
  templateUrl: './buscar-agregar.component.html',
  styleUrl: './buscar-agregar.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, 
      useExisting: forwardRef(() => BuscarAgregarComponent),
      multi: true,
    },
  ],
})
export class BuscarAgregarComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() gender?: string;
  @Input() entidad?: string;
  @Input() valor: any;
  @Input() control: any;

  inputId?: number;

  @ViewChild('vcrModal', { read: ViewContainerRef }) vcr!: ViewContainerRef;

  abrirModal(tipo: string) {
    this.modalService.crearModal(this.vcr, tipo + this.entidad);
    this.modalService.obtenerInstancia().titulo = 'Buscar ' + this.entidad;
    this.modalService.obtenerInstancia().itemInput.id = this.inputId;
    this.modalService.obtenerInstancia().itemInput.valor = this.valor;
    this.modalService.obtenerInstancia().onConfirmar.subscribe((data: any) => {
      this.inputId = data.id;
      this.valor = data.valor;
      this.onTouchedCb?.();
      this.onChangeCb?.(data.id);
    });
  }

  constructor(private modalService: ModalService) {}

  isDisabled: boolean = false;

  onChangeCb?: (id: number) => void;
  onTouchedCb?: () => void;

  get prefijo() {
    return this.gender == 'F' ? 'a' : '';
  }

  writeValue(obj: any): void {
    this.inputId = obj;
  }

  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  buscar() {
    this.abrirModal('modalTabla');
  }
}

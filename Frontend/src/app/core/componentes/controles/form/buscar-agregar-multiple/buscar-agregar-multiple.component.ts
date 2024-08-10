import { Component, Input, ViewContainerRef, forwardRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, Form, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../../servicios/modal/modal.service';

@Component({
  selector: 'app-buscar-agregar-multiple',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzFlexModule,
    NzInputModule,
    NzButtonModule,
    NzFormModule,
  ],
  templateUrl: './buscar-agregar-multiple.component.html',
  styleUrl: './buscar-agregar-multiple.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, 
      useExisting: forwardRef(() => BuscarAgregarMultipleComponent),
      multi: true,
    },
  ],
})
export class BuscarAgregarMultipleComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() gender?: string;
  @Input() entidad?: string;
  @Input() valores: any;
  @Input() control: any;
  
  inputIds?: number[];
  inputValores?: string

  @ViewChild('vcrModal', { read: ViewContainerRef }) vcr!: ViewContainerRef;

  abrirModal(tipo: string) {
    this.modalService.crearModal(this.vcr, tipo + this.entidad);
    this.modalService.obtenerInstancia().titulo = 'Buscar ' + this.entidad;
    this.modalService.obtenerInstancia().itemsInput = new Map<number, string>(
      this.inputIds?.map((id, index) => [id, this.valores[index]]) ?? []
    );
    this.modalService.obtenerInstancia().onConfirmar.subscribe((data: Map<number,string>) => {
      this.inputIds = Array.from(data.keys());
      this.valores = Array.from(data.values());
      this.inputValores = this.valores.join('.\n');
      this.onTouchedCb?.();
      this.onChangeCb?.(this.inputIds);
    });
  }

  constructor(private modalService: ModalService) {}

  isDisabled: boolean = false;

  onChangeCb?: (id: number[]) => void;
  onTouchedCb?: () => void;

  get prefijo() {
    return this.gender == 'F' ? 'a' : '';
  }

  writeValue(obj: any): void {
    this.inputIds = obj;
    this.inputValores = this.valores?.join('.\n');
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

import { Component, Input, inject } from '@angular/core';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzIconModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  viewProviders: [{
    provide: ControlContainer,
    useFactory: () => inject(ControlContainer, { skipSelf: true , host: true })
  }]
})
export class InputComponent {
  // controlName: nombre del control en el formulario
  @Input() controlName?: string;
  // label: etiqueta del input
  @Input() label?: string;
  // type: tipo de input
  @Input() type: string = 'text';
  // gender: género del prefijo
  @Input() gender: string = 'M';
  // icon: icono del input
  @Input() icon: string = '';
  // size: tamaño del input
  @Input() size: 'default' | 'large' | 'small' = 'default';

  @Input() readonly:boolean = false;

  constructor() { }

  get prefijo() {
    return this.gender == 'F' ? 'a' : ''
  }

}

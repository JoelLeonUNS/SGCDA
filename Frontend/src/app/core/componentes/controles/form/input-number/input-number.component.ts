import { Component, Input, inject } from '@angular/core';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@Component({
  selector: 'app-input-number',
  standalone: true,
  imports: [ReactiveFormsModule, NzFormModule, NzInputNumberModule],
  templateUrl: './input-number.component.html',
  styleUrl: './input-number.component.css',
  viewProviders: [{
    provide: ControlContainer,
    useFactory: () => inject(ControlContainer, { skipSelf: true , host: true })
  }]
})
export class InputNumberComponent {
  @Input() controlName?: string;
  @Input() label?: string;
  @Input() type: string = '';
  @Input() minimum: number = 0;
  @Input() step: number = 10;
  @Input() gender: string = 'M';

  get prefijo() {
    return this.gender == 'F' ? 'a' : ''
  }

  get formatter() {
    if(this.type == 'soles') {
      return this.formatterSoles
    } else {
      return this.formatterDefault
    }
  }

  formatterDefault = (value: number) => `${value}`;
  formatterSoles = (value: number) => `S/. ${value}`;

}

import { Component, Input, inject } from '@angular/core';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-input-password',
  standalone: true,
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzIconModule],
  templateUrl: './input-password.component.html',
  styleUrl: './input-password.component.css',
  viewProviders: [{
    provide: ControlContainer,
    useFactory: () => inject(ControlContainer, { skipSelf: true , host: true })
  }]
})
export class InputPasswordComponent {
  @Input() controlName?: string;
  @Input() label?: string;
  @Input() type: string = 'text';
  @Input() gender: string = 'M';

  get prefijo() {
    return this.gender == 'F' ? 'a' : ''
  }

  passwordVisible = false;

}

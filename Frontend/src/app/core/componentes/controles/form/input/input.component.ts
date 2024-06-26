import { Component, Input, inject } from '@angular/core';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  viewProviders: [{
    provide: ControlContainer,
    useFactory: () => inject(ControlContainer, { skipSelf: true , host: true })
  }]
})
export class InputComponent {
  @Input() controlName?: string;
  @Input() label?: string;
  @Input() type: string = 'text';
  @Input() gender: string = 'M';

  get prefijo() {
    return this.gender == 'F' ? 'a' : ''
  }

}

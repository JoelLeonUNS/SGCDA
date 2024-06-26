import { Component, Input, inject } from '@angular/core';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-text-area',
  standalone: true,
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule],
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.css',
  viewProviders: [{
    provide: ControlContainer,
    useFactory: () => inject(ControlContainer, { skipSelf: true , host: true })
  }]
})
export class TextAreaComponent {
  @Input() controlName?: string;
  @Input() label?: string;
  @Input() gender: string = 'M';

  get prefijo() {
    return this.gender == 'F' ? 'a' : ''
  }

}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-text-area',
  standalone: true,
  imports: [FormsModule, NzFormModule, NzInputModule],
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.css',
})
export class TextAreaComponent {
  @Input() label?: string;
  @Input() gender: string = 'M';
  @Input() size: NzSizeLDSType = 'default';
  @Input() valor: string = '';

  @Output() valorChange = new EventEmitter<string>();

  constructor() {}

  get prefijo() {
    return this.gender == 'F' ? 'a' : ''
  }

}

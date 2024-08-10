import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [NzDatePickerModule, NzFormModule, ReactiveFormsModule, CommonModule],
  templateUrl: './date.component.html',
  styleUrl: './date.component.css',
  viewProviders: [{
    provide: ControlContainer,
    useFactory: () => inject(ControlContainer, { skipSelf: true , host: true })
  }]
})
export class DateComponent {
  @Input() controlName?:string;
  @Input() label?:string;
  @Input() atributte:string[] = ['id', 'name'];
  @Input() gender?:string;
  @Input() type:string = 'date';

  constructor() { }

  get prefijo() {
    return this.gender == 'F' ? 'a' : ''
  }

  get formato() {
    switch (this.type) {
      case 'date':
        return 'dd/MM/yyyy';
      case 'mouth':
        return 'MM';
      case 'year':
        return 'yyyy';
      default:
        return 'dd/MM/yyyy';
    }
  }
}

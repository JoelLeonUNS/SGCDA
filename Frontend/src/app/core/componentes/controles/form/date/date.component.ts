import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    NzFormModule, 
    NzDatePickerModule, 
    NzIconModule
  ],
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
  @Input() borderless?:boolean = false;

  @Input() icon?:string;
  @Input() size:'default' | 'small' | 'large' = 'default';

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

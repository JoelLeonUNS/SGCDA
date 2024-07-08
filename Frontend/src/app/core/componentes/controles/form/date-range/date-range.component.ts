import { Component, Input, ViewChild, inject } from '@angular/core';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { NzDatePickerComponent, NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';

@Component({
  selector: 'app-date-range',
  standalone: true,
  imports: [NzDatePickerModule, ReactiveFormsModule, NzFormModule],
  templateUrl: './date-range.component.html',
  styleUrl: './date-range.component.css',
  viewProviders: [{
    provide: ControlContainer,
    useFactory: () => inject(ControlContainer, { skipSelf: true , host: true })
  }]
})
export class DateRangeComponent {
  @Input() inicio?: any;
  @Input() fin?: any;
  @Input() controlNames:string[] = ['fecha_inicial', 'fecha_final'];
  @Input() label?:string = 'Fecha de inicio y fin'
  @Input() gender?:string;

  get prefijo() {
    return this.gender == 'F' ? 'a' : ''
  }
  
  constructor() {}

  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;

  disabledStartDate = (inicio: Date): boolean => {
    if (!inicio || !this.fin) {
      return false;
    }
    if (typeof this.fin == 'string') {
      return false
    } else {
      return inicio.getTime() > this.fin.getTime();
    }
  };

  disabledEndDate = (fin: Date): boolean => {
    if (!fin || !this.inicio) {
      return false;
    }
    if (typeof this.inicio == 'string') {
      return false
    } else {
      return fin.getTime() <= this.inicio.getTime()
    }
    
  };

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endDatePicker.open();
    }
  }

  handleEndOpenChange(open: boolean): void {}  
}

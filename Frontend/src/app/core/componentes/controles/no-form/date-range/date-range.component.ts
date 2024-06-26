import { Component, Input, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzDatePickerComponent, NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';

@Component({
  selector: 'app-date-range',
  standalone: true,
  imports: [NzDatePickerModule, ReactiveFormsModule, NzFormModule],
  templateUrl: './date-range.component.html',
  styleUrl: './date-range.component.css',
})
export class DateRangeComponent {
  @Input() fecha_inicio?: any;
  @Input() fecha_fin?: any;
  @Input() gender?:string;

  get prefijo() {
    return this.gender == 'F' ? 'a' : ''
  }
  
  constructor() {}

  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;

  disabledStartDate = (fecha_inicio: Date): boolean => {
    if (!fecha_inicio || !this.fecha_fin) {
      return false;
    }
    if (typeof this.fecha_fin == 'string') {
      return false
    } else {
      return fecha_inicio.getTime() > this.fecha_fin.getTime();
    }
  };

  disabledEndDate = (fecha_fin: Date): boolean => {
    if (!fecha_fin || !this.fecha_inicio) {
      return false;
    }
    if (typeof this.fecha_inicio == 'string') {
      return false
    } else {
      return fecha_fin.getTime() <= this.fecha_inicio.getTime()
    }
    
  };

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endDatePicker.open();
    }
  }

  handleEndOpenChange(open: boolean): void {}  
}

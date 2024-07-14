import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

@Component({
  selector: 'app-time',
  standalone: true,
  imports: [
    NzTimePickerModule, 
    NzFormModule, 
    ReactiveFormsModule, 
    CommonModule
  ],
  templateUrl: './time.component.html',
  styleUrl: './time.component.css',
  viewProviders: [{
    provide: ControlContainer,
    useFactory: () => inject(ControlContainer, { skipSelf: true , host: true })
  }]
})
export class TimeComponent {
  @Input() controlName?:string;
  @Input() label?:string;
  @Input() atributte:string[] = ['id', 'name'];
  @Input() gender?:string;

  get prefijo() {
    return this.gender == 'F' ? 'a' : ''
  }
}

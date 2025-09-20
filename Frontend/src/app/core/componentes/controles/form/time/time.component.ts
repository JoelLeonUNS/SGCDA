import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

@Component({
  selector: 'app-time',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    NzTimePickerModule, 
    NzFormModule, 
    NzIconModule
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
  @Input() borderless?:boolean = false;

  @Input() icon?:string;
  @Input() size:'default' | 'small' | 'large' = 'default';

  get prefijo() {
    return this.gender == 'F' ? 'a' : ''
  }
}

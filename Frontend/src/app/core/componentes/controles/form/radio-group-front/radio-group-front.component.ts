import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzRadioModule } from 'ng-zorro-antd/radio';

@Component({
  selector: 'app-radio-group-front',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzFormModule, NzRadioModule],
  templateUrl: './radio-group-front.component.html',
  styleUrl: './radio-group-front.component.css',
  viewProviders: [{
    provide: ControlContainer,
    useFactory: () => inject(ControlContainer, { skipSelf: true , host: true })
  }]
})
export class RadioGroupFrontComponent {
  @Input() controlName?:string;
  @Input() label?:string;
  @Input() options:any[] = []
  @Input() gender?:string;
  
  @Output() change = new EventEmitter<any>();

  get prefijo() {
    return this.gender == 'F' ? 'a' : ''
  }

  cambio(event:any) {
    this.change.emit(event);
  }
}

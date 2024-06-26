import { Component, EventEmitter, Input, Output, inject} from '@angular/core';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTransferModule, TransferItem } from 'ng-zorro-antd/transfer';
import { ServicioCrud } from '../../../../servicios/rest/servicio-crud';

@Component({
  selector: 'app-transfer-select.',
  standalone: true,
  imports: [NzSelectModule, NzFormModule, NzIconModule, NzTransferModule, ReactiveFormsModule],
  templateUrl: './transfer-select.component.html',
  styleUrl: './transfer-select.component.css',
  viewProviders: [{
    provide: ControlContainer,
    useFactory: () => inject(ControlContainer, { skipSelf: true , host: true })
  }]
})
export class TransferSelectComponent {
  optionsOrigen: any[] = [];
  optionsDestino: any[] = [];

  @Input() controlName?:string[];
  @Input() label?:string[] = ['Origen', 'Destino'];
  @Input() atributte:string[] = ['id', 'name'];
  @Input() options:any[] = []
  @Input() optionOrigen:any;
  @Input() optionDestino:any;
  @Input() lista: TransferItem[] = [];
  @Input() gender?:string;
  @Input() servicio?:ServicioCrud<any>;

  @Output() listaChange = new EventEmitter<TransferItem[]>();
  @Output() recargar = new EventEmitter<any>();

  cargando:boolean = false;
  
  constructor() { }
  
  get prefijo() {
    return this.gender == 'F' ? 'a' : ''
  }

  ngOnInit(): void {
    this.optionsOrigen = this.options;
    this.optionsDestino = this.options;
    this.cambiarOrigen(this.optionOrigen);
    this.cambiarDestino(this.optionDestino);
  }

  cambiarOrigen(value: any): void {
    this.optionsDestino = this.options.filter(item => item.id != value);
    this.recargar.emit();
  }

  cambiarDestino(value: any): void {
    this.optionsOrigen = this.options.filter(item => item.id != value);
    this.recargar.emit();
  }

  select(ret: {}): void {
    console.log(this.lista);
  }

  change(ret: {}): void {
    this.listaChange.emit(this.lista);
  }

}

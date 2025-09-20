import { Component, EventEmitter, Input, Output, inject} from '@angular/core';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTransferModule, TransferChange, TransferItem, TransferSelectChange } from 'ng-zorro-antd/transfer';
import { ServicioCrud } from '../../../../servicios/rest/servicio-crud';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { ColumnItem } from '../../../../interfaces/utilidades/column-item.interface';

@Component({
  selector: 'app-transfer-table',
  standalone: true,
  imports: [NzSelectModule, NzFormModule, NzIconModule, NzTransferModule, NzTableModule, NzTagModule, ReactiveFormsModule],
  templateUrl: './transfer-table.component.html',
  styleUrl: './transfer-table.component.css',
  viewProviders: [{
    provide: ControlContainer,
    useFactory: () => inject(ControlContainer, { skipSelf: true , host: true })
  }]
})
export class TransferTableComponent {
  @Input() controlName?:string;
  @Input() label?:string;
  @Input() titles:string[] = ['Lista de elementos', 'Elementos seleccionados'];
  @Input() lista: TransferItem[] = [
    { key: 1, title: 'One' },
  ];
  @Input() columnas:ColumnItem[] = [
    { name: 'Nombre', attribute: 'title'},
  ];
  @Input() gender?:string;
  @Input() servicio?:ServicioCrud<any>;
  // Se le pasa una función que devuelve un arreglo de TransferItem
  @Input() tranformsItems?: Function;
  @Input() icon:string = 'bars';

  @Output() listaChange = new EventEmitter<TransferItem[]>();
  @Output() transferChange = new EventEmitter<TransferChange>();
  @Output() recargar = new EventEmitter<any>();

  cargando:boolean = false;
  
  list: TransferItem[] = [];
  $asTransferItems = (data: unknown): TransferItem[] => data as TransferItem[];
  disabled = false;
  showSearch = true;
  
  constructor() { }
  
  get prefijo() {
    return this.gender == 'F' ? 'a' : ''
  }

  change(ret: TransferChange): void {
    const listKeys = ret.list.map((l) => l['key']);
    const hasOwnKey = (e: TransferItem): boolean => e.hasOwnProperty('key');
    this.list = this.list.map((e) => {
      if (listKeys.includes(e['key']) && hasOwnKey(e)) {
        if (ret.to === 'left') {
          delete e.hide;
        } else if (ret.to === 'right') {
          e.hide = false;
        }
      }
      return e;
    });
    this.listaChange.emit(ret.list);
    this.transferChange.emit(ret);
  }

}

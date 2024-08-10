import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ServicioCrud } from '../../../../servicios/rest/servicio-crud';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { TablaPagComponent } from '../tabla-pag.component';
import { PipeService } from '../../../../servicios/utilidades/pipe/pipe.service';
import { ModalService } from '../../../../servicios/modal/modal.service';
import { BuscadorTablaComponent } from '../../../buscador-tabla/buscador-tabla.component';
import { CargadorDatosService } from '../../../../servicios/utilidades/cargador-datos/cargador-datos.service';

@Component({
  selector: 'app-tabla-pag-agregar-multiple',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzFlexModule,
    NzButtonModule,
    NzLayoutModule,
    NzSelectModule,
    NzTableModule,
    NzInputModule,
    NzIconModule,
    NzFormModule,
    NzCheckboxModule,
    NzEmptyModule,
    BuscadorTablaComponent
  ],
  templateUrl: './tabla-pag-agregar-multiple.component.html',
  styleUrl: './tabla-pag-agregar-multiple.component.css',
  providers: [ModalService],
})
export class TablaPagAgregarMultipleComponent extends TablaPagComponent implements OnChanges {
  @Input() itemsInput = new Map<number, string>(); // Usa Map en lugar de Set
  @Input() label?:string;
  separador: string = ' ';
  atributte?: string[];
  entidad?: string;
  listaSeleccionada: any[] = [];
  @Output() itemsInputChange = new EventEmitter<Map<number, string>>();
  @Output() crearChange = new EventEmitter<boolean>();

  constructor(
    msgService: NzMessageService,
    pipeService: PipeService,
    servicio: ServicioCrud<any>,
    cdService: CargadorDatosService,
    private modalService: ModalService
  ) {
    super(msgService, pipeService, servicio, cdService);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['itemsInput'] && this.itemsInput) {
      this.refreshCheckedStatus();
    }
  }

  @ViewChild('vcrModal', { read: ViewContainerRef }) vcr!: ViewContainerRef;

  abrirModal() {
    this.modalService.insertarModalCrear(this.vcr, 'modalForm' + this.entidad);
    this.modalService.obtenerInstancia().onConfirmar.subscribe((data: any) => {
      this.itemsInput.set(data.id, this.concatenarAtributos(data));
      this.refreshCheckedStatus();
      this.itemsInputChange.emit(this.itemsInput);
    });
  }

  concatenarAtributos(data: any): string {
    const valores = this.atributte!.map((attr) => data[attr]);
    return valores
      .filter((prop) => prop !== null && prop !== undefined)
      .join(this.separador);
  }

  checked = false;
  indeterminate = false;
  listaDatosPaginaActual: readonly any[] = [];

  actualizarSeleccionados(data: any, checked: boolean): void {
    const id = data.id;
    const valor = this.concatenarAtributos(data);

    if (checked) {
      this.itemsInput.set(id, valor); // Agrega el id y valor al Map
    } else {
      this.itemsInput.delete(id); // Elimina el id del Map
    }
    this.listaSeleccionada = [...Array.from(this.itemsInput.keys())] // Convierte el Map en un Array
    this.itemsInputChange.emit(this.itemsInput);
  }

  deseleccionarItemChange(itemsActuales: number[]) {
    // Deja solo los items actuales, los demás los elimina de la lista de items seleccionados
    this.itemsInput = new Map([...this.itemsInput].filter(([id, _]) => itemsActuales.includes(id)));
    this.refreshCheckedStatus();
    this.itemsInputChange.emit(this.itemsInput);
  }

  onItemSeleccionado(data: any, checked: boolean): void {
    this.actualizarSeleccionados(data, checked);
    this.refreshCheckedStatus();
  }
  
  // Selecciona o deselecciona todos los items de la página actual
  onFilaSeleccionada(data: any): void {
    this.actualizarSeleccionados(data, !this.itemsInput.has(data.id));
    this.refreshCheckedStatus();
  }

  onTodosSeleccionados(value: boolean): void {
    this.listaDatosPaginaActual.forEach(item => this.actualizarSeleccionados(item, value));
    this.refreshCheckedStatus();
  }

  onDatosPaginaActualChange($event: readonly any[]): void {
    this.listaDatosPaginaActual = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.listaSeleccionada = [...Array.from(this.itemsInput.keys())] // Convierte el Map en un Array
    this.checked = this.listaDatosPaginaActual.every(item => this.itemsInput.has(item.id));
    this.indeterminate = this.listaDatosPaginaActual.some(item => this.itemsInput.has(item.id)) && !this.checked;
  }
}

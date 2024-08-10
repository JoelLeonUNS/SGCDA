import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzContextMenuService, NzDropdownMenuComponent, NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { ModalService } from '../../servicios/modal/modal.service';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { ServicioCrud } from '../../servicios/rest/servicio-crud';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-tarjeta',
  standalone: true,
  imports: [
    NzButtonModule,
    NzCardModule,
    NzDropDownModule,
    NzTagModule,
    NzIconModule,
    NzDividerModule,
    CommonModule,
    NzPopconfirmModule
  ],
  template: '',
})
export class TarjetaComponent {
 @Input() item: any;
 @Input() estado?: string;
 @Output() refrescar = new EventEmitter<boolean>();

  modal:string = 'modal';
  estadoLoading = false;

  @ViewChild('vcrModal', { read: ViewContainerRef }) vcr!: ViewContainerRef;

  constructor(
    private nzContextMenuService: NzContextMenuService,
    private msg: NzMessageService,
    private modalService: ModalService,
    private servicioCrud: ServicioCrud<any>,
  ) { }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  closeMenu(): void {
    this.nzContextMenuService.close();
  }

  verDetalles() {
    console.log('Ver detalles');
  }

  editar(event: Event) {
    event.stopPropagation();
    const modal = this.modalService.insertarModalEditar(this.vcr, this.modal, this.item);
    modal.onConfirmar.subscribe(() => {
      this.refrescar.emit(true);
    });
  }

  cerrar() {
    this.servicioCrud.cambiarEstado(this.item.id, { estado: 'CERRADO' }).subscribe({
      next: () => {
        this.msg.success('Cerrado correctamente');
        this.estado = 'CERRADO';
      },
      error: () => {
        this.msg.error('Ocurrió un error al cerrar');
    }});
  }
  

  eliminar() {
    console.log('Eliminar');
  }
}

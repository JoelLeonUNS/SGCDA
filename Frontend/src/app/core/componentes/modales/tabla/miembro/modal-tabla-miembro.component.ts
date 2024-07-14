import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ModalTablaComponent } from '../modal-tabla.component';
import { ModalService } from '../../../../servicios/modal/modal.service';
import { TablaPagAgregarMultipleMiembrosComponent } from '../../../tablas/paginada/agregar-multiple/miembros/tabla-pag-agregar-multiple-miembros.component';

@Component({
    selector: 'app-modal-tabla-miembro',
    standalone: true,
    templateUrl: './modal-tabla-miembro.component.html',
    imports: [NzModalModule, NzButtonModule, TablaPagAgregarMultipleMiembrosComponent]
})
export class ModalTablaMiembroComponent extends ModalTablaComponent {
    separador: string = ' ';
    atributte?: string[] = ['nombres', 'apellidos'];

    constructor(private modalService: ModalService) {
        super();
    }

    @ViewChild('vcrModal', { read: ViewContainerRef }) vcr!: ViewContainerRef;
    @ViewChild('tabla') tabla!: TablaPagAgregarMultipleMiembrosComponent

    abrirModal() {
        this.modalService.insertarModalCrear(this.vcr, 'modalFormMiembro')
        this.modalService.obtenerInstancia().onConfirmar.subscribe((data: any) => {
            this.itemsInput.set(data.id, this.concatenarAtributos(data));
            this.tabla.refreshCheckedStatus();
        });
    }

    concatenarAtributos(data: any): string {
    const valores = this.atributte!.map((attr) => data[attr]);
    return valores
        .filter((prop) => prop !== null && prop !== undefined)
        .join(this.separador);
    }

    override agregar() {
        this.confirmar(this.itemsInput)
    }

}

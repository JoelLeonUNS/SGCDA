import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ModalTablaComponent } from '../modal-tabla.component';
import { ModalService } from '../../../../servicios/modal/modal.service';
import { TablaPagAgregarMultipleTarifaComponent } from "../../../tablas/tabla-pag/tabla-pag-agregar-multiple/tabla-pag-agregar-multiple-tarifa/tabla-pag-agregar-multiple-tarifa.component";

@Component({
    selector: 'app-modal-tabla-tarifa',
    standalone: true,
    templateUrl: './modal-tabla-tarifa.component.html',
    imports: [NzModalModule, NzButtonModule, TablaPagAgregarMultipleTarifaComponent]
})
export class ModalTablaTarifaComponent extends ModalTablaComponent {
    separador: string = ' ';
    atributte?: string[] = ['descripcion'];

    constructor(private modalService: ModalService) {
        super();
    }

    @ViewChild('vcrModal', { read: ViewContainerRef }) vcr!: ViewContainerRef;
    @ViewChild('tabla') tabla!: TablaPagAgregarMultipleTarifaComponent

    abrirModal() {
        this.modalService.insertarModalCrear(this.vcr, 'modalFormTarifa')
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

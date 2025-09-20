import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ModalTablaComponent } from '../modal-tabla.component';
import { ModalService } from '../../../../servicios/modal/modal.service';
import { TablaPagAgregarMultipleAulasComponent } from '../../../tablas/paginada/agregar-multiple/aulas/tabla-pag-agregar-multiple-aulas.component';

@Component({
    selector: 'app-modal-tabla-aula',
    standalone: true,
    templateUrl: './modal-tabla-aula.component.html',
    imports: [NzModalModule, NzButtonModule, TablaPagAgregarMultipleAulasComponent]
})
export class ModalTablaAulaComponent extends ModalTablaComponent {
    separador: string = ' - ';
    atributte?: string[] = ['pabellon', 'correlativo'];

    constructor(private modalService: ModalService) {
        super();
    }

    @ViewChild('vcrModal', { read: ViewContainerRef }) vcr!: ViewContainerRef;
    @ViewChild('tabla') tabla!: TablaPagAgregarMultipleAulasComponent

    abrirModal() {
        this.modalService.insertarModalCrear(this.vcr, 'modalFormAula')
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

import { Injectable, Type } from '@angular/core';
import { ModalFormCargoComponent } from '../../componentes/modales/formulario/cargo/modal-form-cargo.component';

@Injectable({
  providedIn: 'root',
})
export class FabricaComponenteService {
  private componentes: { [key: string]: Type<any> } = {
    modalFormCargo: ModalFormCargoComponent,
  };

  obtenerRef(nombre: string) {
    const component = this.componentes[nombre];
    if (!component) {
      throw new Error(`Componente '${nombre}' no encontrado.`);
    }
    return component;
  }
}

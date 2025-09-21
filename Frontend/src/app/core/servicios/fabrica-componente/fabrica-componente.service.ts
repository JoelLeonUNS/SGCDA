import { Injectable, Type } from '@angular/core';
import { ModalFormCargoComponent } from '../../componentes/modales/formulario/cargo/modal-form-cargo.component';
import { ModalFormMiembroComponent } from '../../componentes/modales/formulario/miembro/modal-form-miembro.component';
import { ModalFormComisionComponent } from '../../componentes/modales/formulario/comision/modal-form-comision.component';
import { ModalFormProcesoComponent } from '../../componentes/modales/formulario/proceso/modal-form-proceso.component';
import { ModalFormPeriodoComponent } from '../../componentes/modales/formulario/periodo/modal-form-periodo.component';
import { ModalTablaMiembroComponent } from '../../componentes/modales/tabla/miembro/modal-tabla-miembro.component';
import { ModalFormComisionProcesoComponent } from '../../componentes/modales/formulario/comision-proceso/modal-form-comision-proceso.component';
import { ModalFormProcesoPeriodoComponent } from '../../componentes/modales/formulario/proceso-periodo/modal-form-proceso-periodo.component';
import { ModalFormEspecialidadComponent } from '../../componentes/modales/formulario/especialidad/modal-form-especialidad.component';
import { ModalFormAulaComponent } from '../../componentes/modales/formulario/aula/modal-form-aula.component';
import { ModalFormPabellonComponent } from '../../componentes/modales/formulario/pabellon/modal-form-pabellon.component';
import { FiltradorTablaComponent } from '../../componentes/filtrador-tabla/filtrador-tabla.component';
import { ModalPasosComisionProcesoComponent } from '../../componentes/modales/pasos/comision-proceso/modal-pasos-comision-proceso.component';
import { ModalTablaAulaComponent } from '../../componentes/modales/tabla/aula/modal-tabla-aula.component';
import { ModalAsignacionAulaMiembrosComponent } from '../../componentes/modales/asignacion/aula-miembros/modal-asignacion-aula-miembros.component';
@Injectable({
  providedIn: 'root',
})
export class FabricaComponenteService {
  private componentes: { [key: string]: Type<any> } = {
    // Utilidades
    // Filtro
    filtradorTabla: FiltradorTablaComponent,
    // Modales
    // Pabellon
    modalFormPabellon: ModalFormPabellonComponent,
    // Aula
    modalFormAula: ModalFormAulaComponent,
    modalTablaAula: ModalTablaAulaComponent,
    modalAsignacionAulaMiembros: ModalAsignacionAulaMiembrosComponent,
    // Especialidad
    modalFormEspecialidad: ModalFormEspecialidadComponent,
    // Cargo
    modalFormCargo: ModalFormCargoComponent,
    // Miembro
    modalFormMiembro: ModalFormMiembroComponent,
    modalTablaMiembro: ModalTablaMiembroComponent,
    // Comisión
    modalFormComision: ModalFormComisionComponent,
    modalFormComisionProceso: ModalFormComisionProcesoComponent,
    modalPasosComisionProceso: ModalPasosComisionProcesoComponent,
    // Proceso
    modalFormProceso: ModalFormProcesoComponent,
    modalFormProcesoPeriodo: ModalFormProcesoPeriodoComponent,
    // Periodo
    modalFormPeriodo: ModalFormPeriodoComponent,
  };

  obtenerRef(nombre: string) {
    const component = this.componentes[nombre];
    if (!component) {
      throw new Error(`Componente '${nombre}' no encontrado.`);
    }
    return component;
  }
}

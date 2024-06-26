import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { FabricaComponenteService } from '../fabrica-componente/fabrica-componente.service';

@Injectable()
export class ModalService {
  private componentRef?: ComponentRef<any>;
  private componentesCreados: ComponentRef<any>[] = [];

  constructor(private fabricaComponenteService:FabricaComponenteService) { }

  insertarModalEditar(vcr: ViewContainerRef, component: string, item?: any):any {
    const instancia = this.crearModal(vcr, component);
    instancia.mostrarValores(item);
    instancia.editarPorId(item.id);
    instancia.titulo = 'Edición ID: ' + item.id
    instancia.accion = 'EDITAR';
    return instancia;
  }

  //const existeMetodo = (metodo: string) => typeof instancia[metodo] === 'function';

  insertarModalCrear(vcr: ViewContainerRef, component: string):any {
    const instancia = this.crearModal(vcr, component);
    instancia.obtenerProximaId();
    instancia.titulo = 'Nuevo ID:'
    instancia.accion = 'CREAR';
    instancia.proximaIdChange.subscribe((id: number) => { instancia.titulo = 'Nuevo ID: ' + id; });
    return instancia;
  }

  crearModal(vcr: ViewContainerRef, component: string): any {
    this.eliminarModalNoUsado();
    
    const tipoComponente = this.fabricaComponenteService.obtenerRef(component);
    // Verificar si ya existe un componente del mismo tipo
    const componenteExistente = this.componentesCreados.find(
      (comp) => comp.instance instanceof tipoComponente
    );
    if (componenteExistente) {
      console.log('Ya existe un componente de este tipo');
      // Si ya existe, no crear uno nuevo
      return componenteExistente.instance;;
    }
    // Crear una nueva instancia del componente
    this.componentRef = vcr.createComponent(tipoComponente);
    this.componentesCreados.push(this.componentRef);

    return this.componentRef?.instance;
  }

  eliminarModalNoUsado() {
    const componenteAEliminar = this.componentesCreados.find(c => !c.instance.isVisible);
    if (componenteAEliminar) {
      this.componentesCreados = this.componentesCreados.filter(c => c !== componenteAEliminar);
      componenteAEliminar.destroy();
    }
  }

  obtenerInstancia():any{
    return this.componentRef?.instance;
  }

  obtenerInstanciaPorIndice(indice: number):any{
    return this.componentesCreados[indice].instance;
  }
}

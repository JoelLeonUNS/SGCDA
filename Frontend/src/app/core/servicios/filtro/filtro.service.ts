import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { FabricaComponenteService } from '../fabrica-componente/fabrica-componente.service';
import { ServicioCrud } from '../rest/servicio-crud';

@Injectable()
export class FiltroService {
  private componentRef?: ComponentRef<any>;
  private componentesCreados: ComponentRef<any>[] = [];

  constructor(
    private fabricaComponenteService:FabricaComponenteService
  ) { }

  insertarFiltro(vcr: ViewContainerRef, servicio:ServicioCrud<any>, item?: any):any {
    const instancia = this.crearFiltro(vcr, 'filtradorTabla');
    instancia.servicio = servicio;
    if(item){
      instancia.precargarDatos(item);
    } else {
      instancia.cargarDatos();
    }
    return instancia;
  }

  private crearFiltro(vcr: ViewContainerRef, component: string): any {
    const tipoComponente = this.fabricaComponenteService.obtenerRef(component);
    // Verificar si ya existe un componente del mismo tipo
    const componenteExistente = this.componentesCreados.find(
      (comp) => comp.instance instanceof tipoComponente
    );
    if (componenteExistente) {
      console.log('Ya existe un componente de este tipo');
      // Si ya existe, no crear uno nuevo
      return componenteExistente.instance;
    }
    // Crear una nueva instancia del componente
    this.componentRef = vcr.createComponent(tipoComponente);
    this.componentesCreados.push(this.componentRef);

    return this.componentRef?.instance;
  }

  obtenerInstancia():any{
    return this.componentRef?.instance;
  }
}

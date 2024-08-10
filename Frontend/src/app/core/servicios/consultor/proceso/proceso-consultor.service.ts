import { Injectable } from "@angular/core";
import { ServicioConsultor } from "../consultor";

@Injectable({
  providedIn: 'root'
})

export class ProcesoConsultorService extends ServicioConsultor {
  constructor() {
    super();
  }
}
import { Injectable } from "@angular/core";
import { ServicioConsultor } from "../consultor";

@Injectable({
  providedIn: 'root'
})

export class ComisionProcesoConsultorService extends ServicioConsultor {
  constructor() {
    super();
  }
}
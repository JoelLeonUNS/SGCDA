import { Injectable } from "@angular/core";
import { ServicioConsultor } from "../consultor";

@Injectable({
  providedIn: 'root'
})

export class EspecialidadConsultorService extends ServicioConsultor {
  constructor() {
    super();
  }
}
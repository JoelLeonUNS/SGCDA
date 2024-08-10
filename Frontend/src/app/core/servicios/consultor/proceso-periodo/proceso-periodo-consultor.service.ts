import { Injectable } from "@angular/core";
import { ServicioConsultor } from "../consultor";

@Injectable({
  providedIn: 'root'
})

export class ProcesoPeriodoConsultorService extends ServicioConsultor {
  constructor() {
    super();
  }
}
import { Injectable } from "@angular/core";
import { ServicioConsultor } from "../consultor";

@Injectable({
  providedIn: 'root'
})

export class PeriodoConsultorService extends ServicioConsultor {
  constructor() {
    super();
  }
}
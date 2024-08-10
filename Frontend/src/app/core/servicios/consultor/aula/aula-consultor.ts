import { Injectable } from "@angular/core";
import { ServicioConsultor } from "../consultor";

@Injectable({
  providedIn: 'root'
})

export class AulaConsultorService extends ServicioConsultor {
  constructor() {
    super();
  }
}
import { Injectable } from "@angular/core";
import { ServicioConsultor } from "../consultor";

@Injectable({
  providedIn: 'root'
})

export class PabellonConsultorService extends ServicioConsultor {
  constructor() {
    super();
  }
}
import { Injectable } from "@angular/core";
import { ServicioConsultor } from "../consultor";

@Injectable({
  providedIn: 'root'
})

export class ComisionMiembroConsultorService extends ServicioConsultor {
  constructor() {
    super();
  }
}
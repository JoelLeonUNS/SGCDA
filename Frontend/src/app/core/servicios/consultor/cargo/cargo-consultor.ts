import { Injectable } from "@angular/core";
import { ServicioConsultor } from "../consultor";

@Injectable({
  providedIn: 'root'
})

export class CargoConsultorService extends ServicioConsultor {
  constructor() {
    super();
  }
}
import { Injectable } from "@angular/core";
import { ServicioParams } from "../ServicioParams";

@Injectable({
  providedIn: 'root'
})

export class ComisionAulaParamsService extends ServicioParams<any> {
  constructor() {
    super();
  }
}
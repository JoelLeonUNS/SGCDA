import { Injectable } from "@angular/core";
import { ServicioParams } from "../ServicioParams";

@Injectable({
  providedIn: 'root'
})

export class ComisionProcesoParamsService extends ServicioParams<any> {
  constructor() {
    super();
  }
}
import { Injectable } from "@angular/core";
import { ServicioParams } from "../ServicioParams";

@Injectable({
  providedIn: 'root'
})

export class ProcesoParamsService extends ServicioParams<any> {
  constructor() {
    super();
  }
}
import { Injectable } from "@angular/core";
import { ServicioParams } from "../ServicioParams";

@Injectable({
  providedIn: 'root'
})

export class PabellonParamsService extends ServicioParams<any> {
  constructor() {
    super();
  }
}
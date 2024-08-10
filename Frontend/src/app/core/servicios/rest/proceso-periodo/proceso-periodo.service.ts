import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ServicioCrud } from '../servicio-crud';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProcesoPeriodoService extends ServicioCrud<any> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiURL}/proceso-periodos`);
  }

  obtenerActual():Observable<any> {
    return this.http.get<any>(`${this.API_URL}-actual`);
  }
}

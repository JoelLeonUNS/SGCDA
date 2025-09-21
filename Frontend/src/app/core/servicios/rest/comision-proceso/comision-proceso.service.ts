import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ServicioCrud } from '../servicio-crud';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComisionProcesoService extends ServicioCrud<any> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiURL}/comision-procesos`);
  }

  /**
   * Crea una comisión proceso completa con horarios y aulas
   */
  crearCompleto(data: any): Observable<any> {
    return this.http.post(`${environment.apiURL}/comision-procesos-completo`, data);
  }

  /**
   * Obtiene una comisión proceso completa con todos sus datos relacionados
   */
  obtenerCompleto(id: number): Observable<any> {
    return this.http.get(`${environment.apiURL}/comision-procesos-completo/${id}`);
  }

  /**
   * Actualiza una comisión proceso completa con horarios y aulas
   */
  actualizarCompleto(id: number, data: any): Observable<any> {
    return this.http.put(`${environment.apiURL}/comision-procesos-completo/${id}`, data);
  }
}

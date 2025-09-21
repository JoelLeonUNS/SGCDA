import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ServicioCrud } from '../servicio-crud';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ComisionMiembroService extends ServicioCrud<any> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiURL}/comision-miembros`);
  }

  obtenerMiembrosPorComision(comisionId: number) {
    return this.http.get<any[]>(`${this.API_URL}/comision/${comisionId}`);
  }

  // Obtener miembros de una comisión que no están asignados a ningún aula
  obtenerMiembrosDisponiblesParaAula(comisionProcesoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/disponibles-aula/${comisionProcesoId}`);
  }

  // Obtener miembros ya asignados a un aula específica
  obtenerMiembrosAsignadosAula(aulaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/asignados-aula/${aulaId}`);
  }

  // Asignar miembros a un aula
  asignarMiembrosAula(asignacionData: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/asignar-aula`, asignacionData);
  }

  // Remover miembros de un aula
  removerMiembrosAula(aulaId: number, miembrosIds: number[]): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/remover-aula/${aulaId}`, { miembros_ids: miembrosIds });
  }
}

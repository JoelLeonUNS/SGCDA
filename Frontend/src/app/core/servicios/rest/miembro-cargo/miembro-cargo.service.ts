import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ServicioCrud } from '../servicio-crud';
import { ParametroPaginado } from '../../../interfaces/utilidades/parametro-paginado';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MiembroCargoService extends ServicioCrud<any> {
  
  constructor(http: HttpClient) {
    super(http, `${environment.apiURL}/miembro-cargos`);
  }

  obtenerSegunAsignacionPag(p: ParametroPaginado): Observable<any> {
    const params = this.manejarParametrosPaginado(p);
    return this.http.get<any>(`${this.API_URL}-participacion-pag`, { params });
  }

}

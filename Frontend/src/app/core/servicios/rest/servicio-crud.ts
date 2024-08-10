import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParametroPaginado } from '../../interfaces/utilidades/parametro-paginado';

export abstract class ServicioCrud<T> {
  protected constructor(
    protected http: HttpClient,
    protected API_URL: string
  ) {}

  obtenerTodos(): Observable<T[]> {
    return this.http.get<T[]>(this.API_URL);
  }

  obtenerTodosConNombre(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}-nombres`); // para pdf o excel
  }

  obtenerPorId(id: number): Observable<T> {
    return this.http.get<T>(`${this.API_URL}/${id}`);
  }

  crear(data: T): Observable<T> {
    return this.http.post<T>(this.API_URL, data);
  }

  actualizar(id: number, data: T): Observable<T> {
    return this.http.put<T>(`${this.API_URL}/${id}`, data);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  cambiarEstado(id: number, data: any): Observable<any> {
    return this.http.patch(`${this.API_URL}/${id}/cambiar-estado`, data);
  }

  obtenerUltimo(): Observable<T> {
    return this.http.get<T>(`${this.API_URL}-ultimo`);
  }

  obtenerActivos(): Observable<T[]> {
    return this.http.get<T[]>(`${this.API_URL}-activos`);
  }

  //extras

  obtenerUltimaId(): Observable<any> {
    return this.http.get(`${this.API_URL}-ultimo-id`);
  }

  obtenerTodoPag(p: ParametroPaginado): Observable<any> {
    const params = this.manejarParametrosPaginado(p);
    return this.http.get<any>(`${this.API_URL}-pag`, { params });
  }

  // Método para manejar los parámetros de paginado
  protected manejarParametrosPaginado(p: ParametroPaginado): HttpParams {
    let params = new HttpParams()
      .append('page', `${p.pageIndex}`)
      .append('pageSize', `${p.pageSize}`)
      .append('sortField', `${p.sortField}`)
      .append('sortOrder', `${p.sortOrder}`)
      .append('searchTerm', `${p.searchTerm}`)
      .append('searchColumn', `${p.searchColumn}`)
    if (p.range) {
      const start = p.range.bounds[0];
      const end = p.range.bounds[1];
      params = params.append(`rangeField`, `${p.range.key}`)
        .append(`rangeValues[start]`, `${start}`)
        .append(`rangeValues[end]`, `${end}`);
    }
    if (Array.isArray(p.filter) && p.filter.length > 0) {
      p.filter.forEach((f) => {
        if (Array.isArray(f.value) && f.value.length > 0) { // multiple
          f.value.forEach((value) => {
            params = params.append(`filters[${f.key}]`, value);
          });
        } else if(f.value !== null) { // no multiple
            params = params.append(`filters[${f.key}]`, f.value as string);
        }
      });
    }
    return params;
  }
  // Otros métodos
}
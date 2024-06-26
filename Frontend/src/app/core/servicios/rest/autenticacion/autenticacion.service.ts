import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, from, fromEvent, map, mergeMap } from 'rxjs';
import {
  Usuario,
  UsuarioCredenciales,
  UsuarioRegistro,
} from '../../../interfaces/modelos/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class AutenticacionService {
  private readonly API_URL = environment.apiURL;

  usuario?: Usuario;
  constructor(private http: HttpClient) {}


  ingreso(credenciales: UsuarioCredenciales): Observable<any> {
    return this.http.post(`${this.API_URL}/ingreso`, credenciales);
  }

  registro(usuario: UsuarioRegistro): Observable<any> {
    return this.http.post(`${this.API_URL}/registro`, usuario);
  }

  salida(): Observable<any> {
    return this.http.delete(`${this.API_URL}/salida`);
  }

  guardarIdUsuario(id:number) {
    localStorage.setItem('id_sesion', id.toString());
  }

  obtenerIdUsuario(): number | null {
    const idUsuario = localStorage.getItem('id_sesion')
    return idUsuario !== null ? Number(idUsuario) : null;
  }

  recordarUsuario(estado: boolean, nombreUsuario: string): any {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('recordar_usuario', estado.toString());
      localStorage.setItem('nombre_usuario', nombreUsuario);
    }
  }

  obtenerUsuarioRecordado(): { recordarUsuario: string | null; nombreUsuario: string | null } {
    if (this.isLocalStorageAvailable()) {
      return {
        recordarUsuario: localStorage.getItem('recordar_usuario'),
        nombreUsuario: localStorage.getItem('nombre_usuario'),
      };
    }
    return { recordarUsuario: null, nombreUsuario: null };
  }

  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined'
  }

}

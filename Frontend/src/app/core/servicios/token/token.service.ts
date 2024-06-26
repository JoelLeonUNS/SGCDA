import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  router = new Router();
  constructor() {}

  manejarToken(token: string): void {
    localStorage.setItem('acceso_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('acceso_token');
  }

  revocarToken(): void {
    localStorage.removeItem('acceso_token');
    localStorage.removeItem('id_sesion');
  }

  esAutenticado(): boolean {
    return !!this.getToken();
  }

  isLocalStorageAvailable$(): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      const isAvailable = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
      observer.next(isAvailable);
      observer.complete();
    });
  }
}

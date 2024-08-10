import { Injectable } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CargadorDatosService {
  private filtrosInternos = new Subject<boolean>();
  private filtrosExternos = new Subject<boolean>();
  private cargarDatos = new Subject<boolean>();

  filtrosInternos$ = this.filtrosInternos.asObservable();
  filtrosExternos$ = this.filtrosExternos.asObservable();
  cargarDatos$ = this.cargarDatos.asObservable();

  constructor() {
    combineLatest([this.filtrosInternos$, this.filtrosExternos$]).subscribe(
      ([internos, externos]) => {
        if (internos && externos) {
          this.cargarDatosServidor();
          this.filtrosInternos.next(false);
          this.filtrosExternos.next(false);
        }
      }
    );
  }

  cargarDatosServidor(): void {
    this.cargarDatos.next(true);
  }

  cargarFiltrosExternos(): void {
    this.filtrosExternos.next(true);
  }

  cargarFiltrosInternos(): void {
    this.filtrosInternos.next(true);
  }

  cargarFiltros(): void {
    this.filtrosInternos.next(true);
    this.filtrosExternos.next(true);
  }
}

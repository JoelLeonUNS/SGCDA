import { Subject, combineLatest } from "rxjs";
import { ParametroPaginado } from "../../interfaces/utilidades/parametro-paginado";

export abstract class ServicioConsultor {
  
  parametrosPag: ParametroPaginado = {
    pageIndex: 1,
    pageSize: 10,
    sortField: null,
    sortOrder: null,
    searchTerm: null,
    searchColumn: null,
    range: null,
    filter: [],
  };

  total = 1;

  private filtrosInternos = new Subject<boolean>();
  private filtrosExternos = new Subject<boolean>();
  private cargar = new Subject<boolean>();

  filtrosInternos$ = this.filtrosInternos.asObservable();
  filtrosExternos$ = this.filtrosExternos.asObservable();
  cargar$ = this.cargar.asObservable();

  constructor() {
    combineLatest([this.filtrosInternos$, this.filtrosExternos$]).subscribe(
      ([internos, externos]) => {
        if (internos && externos) {
          this.cargarDatos();
          this.filtrosInternos.next(false);
          this.filtrosExternos.next(false);
        }
      }
    );
  }

  cargarDatos(): void {
    this.cargar.next(true);
  }

  cargarFiltrosExt(): void {
    this.filtrosExternos.next(true);
  }

  cargarFiltrosInt(): void {
    this.filtrosInternos.next(true);
  }

  cargarFiltros(): void {
    this.filtrosInternos.next(true);
    this.filtrosExternos.next(true);
  }

}
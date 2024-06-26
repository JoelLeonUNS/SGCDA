import { Component, Input } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ColumnItem } from '../../../interfaces/utilidades/column-item.interface';
import { ServicioCrud } from '../../../servicios/rest/servicio-crud';
import { Observable, Subject, catchError, combineLatest, debounceTime, map, of, tap } from 'rxjs';
import { ParametroPaginado } from '../../../interfaces/utilidades/parametro-paginado';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PipeService } from '../../../servicios/utilidades/pipe/pipe.service';
import { FiltroItem } from '../../../interfaces/utilidades/filtro-item.interface';
import { TagsEstados } from '../../../interfaces/utilidades/tags.interface';
import { ColumnaBusqueda } from '../../../interfaces/utilidades/columna-busqueda.interface';

@Component({
  selector: 'app-tabla-pag',
  standalone: true,
  template: '',
})
export class TablaPagComponent {
  @Input() scroll?: any;
  @Input() columnas?: ColumnItem[];
  @Input() columnasBusqueda?: ColumnaBusqueda[];
  @Input() listaBusqueda?: ColumnItem[];
  @Input() tags: TagsEstados = {};

  datos$?: Observable<any>; // datos a mostrar en la tabla paginada
  datos: any[] = []; // datos locales de la tabla
  parametrosPag: ParametroPaginado = {
    pageIndex: 1,
    pageSize: 20,
    sortField: null,
    sortOrder: null,
    searchTerm: '',
    searchColumn: 'id',
    filter: [],
  };
  total = 1;
  loading = true;
  busqueda = new Subject<string>();
  filtros: FiltroItem[] = [];
  filtrosInternos = new Subject<boolean>();
  filtrosExternos = new Subject<boolean>();
  filtrosCargados = false;

  constructor(
    protected msgService: NzMessageService,
    protected pipeService: PipeService,
    protected servicio: ServicioCrud<any>
  ) {
    this.busqueda.pipe(debounceTime(500)).subscribe((termino) => {
      this.parametrosPag.pageIndex = 1;
      this.parametrosPag.searchTerm = termino;
      this.cargarDatosServidor();
    });
    
    const filtrosInternos$ = this.filtrosInternos.asObservable();
    const filtrosExternos$ = this.filtrosExternos.asObservable();

    combineLatest([filtrosInternos$, filtrosExternos$]).subscribe(
      ([internos, externos]) => {
        if (internos && externos) {
          this.filtrosCargados = true;
          this.reiniciarFiltros()
        }
      }
    );

  }

  cargarDatosServidor(): void {
    this.loading = true;
    this.datos$ = this.servicio?.obtenerTodoPag(this.parametrosPag).pipe(
      tap(d => {
        this.manejarRespuesta(d);
      }),
      catchError(error => {
        this.manejarError(error);
        return of(null);
      }),
      map(d => d.data)
    );
  }

  manejarRespuesta(respuesta: any): void {
    this.datos = respuesta.data;
    this.total = respuesta.total;
    this.loading = false;
  }

  manejarError(error: any): void {
    this.msgService.error('Error en la solicitud');
    console.error('Error en la solicitud:', error);
    this.loading = false;
  }

  onQueryParamsChange(params: NzTableQueryParams): void { 
    if (this.filtrosCargados) {
    this.tratarParametros(params);
    this.cargarDatosServidor();
    }
  }

  tratarParametros(params: NzTableQueryParams) {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = currentSort && currentSort.value === 'ascend'
        ? 'asc' : currentSort && currentSort.value === 'descend'
        ? 'desc' : null;
    this.parametrosPag = { ...this.parametrosPag, pageIndex: pageIndex,
      pageSize: pageSize, sortField: sortField, sortOrder: sortOrder,
      filter: filter
    };
  }

  // verificarFiltrosVacios(): boolean {
  //   return this.columnas!.filter((columna) => columna.showFilter).every(
  //     (columna) => columna.listOfFilter!.length > 0
  //   );
  // }

  reiniciarFiltros() {
    console.log('reiniciar filtros');
    this.filtros.forEach((filtro) => {
      let index =
        this.columnas?.findIndex(
          (columna) => columna.attribute == filtro.attribute
        ) ?? -1;
      if (index !== -1) {
        this.columnas![index].listOfFilter = [...filtro.list];
      }
    });
  }

  reiniciarOrden() {
    console.log('reiniciar orden');
    this.columnas = this.columnas?.map((columna) => ({
      ...columna,
      sortOrder: null,
    }));
  }

  transPipe(dato: any, pipe: any): string | null {
    if (pipe) {
      return this.pipeService.transformar(dato, pipe);
    } else {
      return dato;
    }
  }
}

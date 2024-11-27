import { ChangeDetectorRef, Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ColumnItem } from '../../../interfaces/utilidades/column-item.interface';
import { ServicioCrud } from '../../../servicios/rest/servicio-crud';
import { Observable, catchError, debounceTime, map, of, tap } from 'rxjs';
import { ParametroPaginado } from '../../../interfaces/utilidades/parametro-paginado';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PipeService } from '../../../servicios/utilidades/pipe/pipe.service';
import { FiltroItem } from '../../../interfaces/utilidades/filtro-item.interface';
import { TagsEstados } from '../../../interfaces/utilidades/tags.interface';
import { ColumnaBusqueda } from '../../../interfaces/utilidades/columna-busqueda.interface';
import { ServicioParams } from '../../../servicios/consultor/ServicioParams';
import { FiltroService } from '../../../servicios/filtro/filtro.service';

@Component({
  selector: 'app-tabla-pag-new',
  standalone: true,
  template: '',
  providers: [FiltroService]
})
export class TablaPagNewComponent {
  @Input() scroll?: any;
  @Input() columnas?: ColumnItem[];
  @Input() columnasBusqueda?: ColumnaBusqueda[];
  @Input() listaBusqueda?: ColumnItem[];
  @Input() tags: TagsEstados = {};

  datos$?: Observable<any>; // datos a mostrar en la tabla paginada
  datos: any[] = []; // datos locales de la tabla
  parametros?: ParametroPaginado;
  total = 1;
  loading = true;
  filtros: FiltroItem[] = [];

  @ViewChild('vcrFiltro', { read: ViewContainerRef }) vcrFiltro!: ViewContainerRef;

  constructor(
    protected msgService: NzMessageService,
    protected pipeService: PipeService,
    protected servicio: ServicioCrud<any>,
    protected filtroSrvc: FiltroService,
    protected paramsSrvc: ServicioParams<any>,
    protected cdr: ChangeDetectorRef
  ) {
    this.paramsSrvc.params$.pipe(debounceTime(300)).subscribe(() => this.cargarData());
  }

  cargarData(): void {
    this.loading = true;
    this.datos$ = this.servicio?.obtenerTodoPag(this.paramsSrvc.params).pipe(
      tap(d => this.manejarRespuesta(d)),
      catchError(e => {
        this.manejarError(e);
        return of(null);
      }),
      map(d => d.data)
    );
    console.warn('se recargaron los datos');
  }

  manejarRespuesta(res: any): void {
    this.datos = res.data;
    this.total = res.total;
    this.loading = false;
  }

  manejarError(e: any): void {
    this.msgService.error('Error en la solicitud');
    this.loading = false;
    console.error('Error en la solicitud:', e);
  }

  buscarTermino(searchTerm:string):void {
    this.paramsSrvc.updateParametros({ searchTerm, pageIndex: 1 });
    this.cdr.detectChanges();
  }

  get termino(): string {
    return this.paramsSrvc.params.searchTerm??'';
  }

  buscarColumna(searchColumn:string): void {
    this.paramsSrvc.updateParametros({ searchColumn, pageIndex: 1 });
    this.cdr.detectChanges();
  }  

  get columna(): string {
    return this.paramsSrvc.params.searchColumn??'';
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    const { key: sortField = null, value } = sort.find((item) => item.value) || {};
    const sortOrder = value === 'ascend' ? 'asc' : value === 'descend' ? 'desc' : null;
    this.paramsSrvc.updateParametros({ pageSize, pageIndex, sortField, sortOrder, filter });
    console.log('params', this.paramsSrvc.params);
  }

  mostrarFiltro(key?:string): void {
    if(!key){
      this.filtroSrvc.insertarFiltro(this.vcrFiltro, this.servicio);
      console.log('No se encontró el filtro');
      return;
    } else {
      this.filtroSrvc.insertarFiltro(this.vcrFiltro, this.servicio);
    }
  }

  reiniciarFiltros() {
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

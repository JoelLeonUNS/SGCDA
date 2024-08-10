import { Component, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Subject, debounceTime, tap, catchError, of, map, combineLatest } from 'rxjs';
import { ColumnaBusqueda } from '../../interfaces/utilidades/columna-busqueda.interface';
import { ParametroPaginado } from '../../interfaces/utilidades/parametro-paginado';
import { ServicioCrud } from '../../servicios/rest/servicio-crud';
import { BuscadorTablaComponent } from "../buscador-tabla/buscador-tabla.component";
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { FormsModule } from '@angular/forms';
import { OrganizadorFicheroComponent } from '../organizador-fichero/organizador-fichero.component';
import { ColumnaOrden } from '../../interfaces/utilidades/columna-orden.interface';
import { CargadorDatosService } from '../../servicios/utilidades/cargador-datos/cargador-datos.service';
import { ServicioConsultor } from '../../servicios/consultor/consultor';

@Component({
  selector: 'app-fichero',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzFlexModule,
    NzGridModule,
    NzEmptyModule,
    NzSpinModule,
    NzTagModule,
    NzDividerModule,
    NzIconModule,
    NzButtonModule,
    NzPaginationModule,
    BuscadorTablaComponent,
    OrganizadorFicheroComponent
  ],
  template: '',
})
export class FicheroComponent {
  @Input() scroll?: any;
  @Input() columnasBusqueda?: ColumnaBusqueda[];
  @Input() columnasOrden?: ColumnaOrden[];

  datos$?: Observable<any[]>;
  datos: any[] = [];
  parametrosPag: ParametroPaginado = {
    pageIndex: 1,
    pageSize: 10,
    sortField: null,
    sortOrder: null,
    searchTerm: '',
    searchColumn: 'id',
    filter: [],
  };
  total = 0;
  loading = true;
  busqueda = new Subject<string>();

  constructor(
    protected msgService: NzMessageService,
    protected servicio: ServicioCrud<any>,
    protected consultor: ServicioConsultor
  ) {
    
    this.busqueda.pipe(debounceTime(500)).subscribe((termino) => {
      this.parametrosPag.pageIndex = 1;
      this.parametrosPag.searchTerm = termino;
      this.cargarDatosServidor();
    });

    this.consultor.cargar$.subscribe(() => {
      this.cargarDatosServidor();
    });
  }

  ngOnInit(): void {
    this.columnasOrden == null ? this.columnasOrden = this.columnasBusqueda : this.columnasOrden;
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

  ordenarPor(columnKey: string): void {
    this.parametrosPag.sortField = columnKey;
    this.cargarDatosServidor();
  }

  cambiarOrden(orden: string): void {
    this.parametrosPag.sortOrder = orden;
    this.cargarDatosServidor();
  }

}

import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Subject, debounceTime, tap, catchError, of, map } from 'rxjs';
import { ColumnaBusqueda } from '../../interfaces/utilidades/columna-busqueda.interface';
import { ParametroPaginado } from '../../interfaces/utilidades/parametro-paginado';
import { ServicioCrud } from '../../servicios/rest/servicio-crud';
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
import { ColumnaOrden } from '../../interfaces/utilidades/columna-orden.interface';
import { ServicioParams } from '../../servicios/consultor/ServicioParams';

@Component({
  selector: 'app-fichero-new',
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
  ],
  template: '',
})
export class FicheroNewComponent {
  @Input() scroll?: any;
  @Input() columnasBusqueda?: ColumnaBusqueda[];
  @Input() columnasOrden?: ColumnaOrden[];

  datos$?: Observable<any[]>;
  datos: any[] = [];
  parametros?: ParametroPaginado;
  total = 0;
  loading = true;

  constructor(
    protected msgService: NzMessageService,
    protected servicio: ServicioCrud<any>,
    protected paramsSrvc: ServicioParams<any>,
    protected cdr: ChangeDetectorRef
  ) {
    this.paramsSrvc.params$.pipe(debounceTime(300)).subscribe(() => this.cargarData());
  }

  ngOnInit(): void {
    this.columnasOrden == null ? this.columnasOrden = this.columnasBusqueda : this.columnasOrden;
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
    console.warn(this.paramsSrvc.params);
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

  ordenarPor(columnKey: string): void {
    this.paramsSrvc.updateParametros({ sortField: columnKey });
  }

  cambiarOrden(orden: string): void {
    this.paramsSrvc.updateParametros({ sortOrder: orden });
  }

}

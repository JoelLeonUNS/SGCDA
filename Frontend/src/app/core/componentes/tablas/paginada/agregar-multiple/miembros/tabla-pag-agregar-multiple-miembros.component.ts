import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ColumnItem } from '../../../../../interfaces/utilidades/column-item.interface';
import { PipeService } from '../../../../../servicios/utilidades/pipe/pipe.service';
import { ModalService } from '../../../../../servicios/modal/modal.service';
import { TablaPagAgregarMultipleComponent } from '../tabla-pag-agregar-multiple.component';
import { BuscadorTablaComponent } from "../../../../buscador-tabla/buscador-tabla.component";
import { ColumnaBusqueda } from '../../../../../interfaces/utilidades/columna-busqueda.interface';
import { MiembroCargoService } from '../../../../../servicios/rest/miembro-cargo/miembro-cargo.service';
import { catchError, map, of, tap } from 'rxjs';
import { CargadorDatosService } from '../../../../../servicios/utilidades/cargador-datos/cargador-datos.service';

@Component({
    selector: 'app-tabla-pag-agregar-multiple-miembros',
    standalone: true,
    templateUrl: '../tabla-pag-agregar-multiple.component.html',
    styleUrl: '../tabla-pag-agregar-multiple.component.css',
    imports: [
        CommonModule,
        FormsModule,
        NzFlexModule,
        NzButtonModule,
        NzLayoutModule,
        NzSelectModule,
        NzTableModule,
        NzInputModule,
        NzIconModule,
        NzFormModule,
        NzCheckboxModule,
        NzEmptyModule,
        BuscadorTablaComponent
    ]
})
export class TablaPagAgregarMultipleMiembrosComponent extends TablaPagAgregarMultipleComponent {
  override entidad:string = 'Miembro'
  override label = 'Miembros';
  override separador: string = ' ';
  override atributte?: string[] = ['nombres', 'apellidos'];

  override columnasBusqueda: ColumnaBusqueda[] = [
    {
      name: 'Id',
      columnKey: 'id',
      type: 'NUMBER',
    },
    {
      name: 'Nombres',
      columnKey: 'nombres',
      default: true,
    },
    {
      name: 'Apellidos',
      columnKey: 'apellidos',
    },
    {
      name: 'Cargo',
      columnKey: 'cargo',
    }
  ]
  override columnas:ColumnItem[] = [
    {
      name: '',
      width: '32px',
      checkeable: true,
    },
    {
      name: 'Nombres',
      attribute: 'nombres',
      sortFn: true,
      showSort: true,
    },
    {
      name: 'Apellidos',
      attribute: 'apellidos',
      sortFn: true,
      showSort: true,
    },
    {
      name: 'Cargo',
      attribute: 'cargo',
      sortFn: true,
      showSort: true,
    }
  ]

  constructor(
    msgService: NzMessageService,
    pipeService: PipeService,
    override servicio: MiembroCargoService,
    cdService: CargadorDatosService,
    modalService:ModalService,
  ) {
    super(msgService, pipeService, servicio, cdService, modalService);
    this.cdService.cargarFiltros();
  }

  override cargarDatosServidor(): void {
    this.loading = true;
    this.datos$ = this.servicio?.obtenerSegunAsignacionPag(this.parametrosPag).pipe(
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
  
}

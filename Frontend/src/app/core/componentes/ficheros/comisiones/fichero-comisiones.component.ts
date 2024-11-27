import { ChangeDetectorRef, Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BuscadorTablaComponent } from '../../buscador-tabla/buscador-tabla.component';
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
import { OrganizadorFicheroComponent } from "../../organizador-fichero/organizador-fichero.component";
import { ColumnaBusqueda } from '../../../interfaces/utilidades/columna-busqueda.interface';
import { TarjetaComisionesComponent } from '../../tarjetas/tarjeta-comisiones/tarjeta-comisiones.component';
import { ComisionProcesoService } from '../../../servicios/rest/comision-proceso/comision-proceso.service';
import { ComisionProcesoParamsService } from '../../../servicios/consultor/comision-proceso/comision-proceso-consultor.service';
import { FicheroNewComponent } from '../fichero-new.component';

@Component({
  selector: 'app-fichero-comisiones',
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
    OrganizadorFicheroComponent,
    TarjetaComisionesComponent
],
  templateUrl: './fichero-comisiones.component.html',
  styleUrls: ['../fichero.component.css'],
})
export class FicheroComisionesComponent extends FicheroNewComponent {
  override columnasBusqueda?: ColumnaBusqueda[] = [
    {
      name: 'Id',
      columnKey: 'id',
      type: 'NUMBER',
    },
    {
      name: 'Comisión',
      columnKey: 'comision',
      default: true,
    },
    {
      name: 'Periodo',
      columnKey: 'periodo_numerico',
    },
    {
      name: 'Fecha',
      columnKey: 'fecha',
      type: 'DATE',
    },
  ];
  
  constructor(
    message: NzMessageService,
    servicio: ComisionProcesoService,
    paramsSrvc: ComisionProcesoParamsService,
    cdr: ChangeDetectorRef
  ) {
    super(message, servicio, paramsSrvc, cdr);
  }

}

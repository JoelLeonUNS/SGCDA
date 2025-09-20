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
import { FicheroNewComponent } from '../fichero-new.component';
import { TarjetaAulasComponent } from '../../tarjetas/tarjeta-aulas/tarjeta-aulas.component';
import { ComisionAulaParamsService } from '../../../servicios/consultor/comisiom-aula/comision-aula-params';
import { ComisionAulaService } from '../../../servicios/rest/comision-aula/comision-aula.service';

@Component({
  selector: 'app-fichero-aulas',
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
    TarjetaAulasComponent
],
  templateUrl: './fichero-aulas.component.html',
  styleUrls: ['../fichero.component.css'],
})

export class FicheroAulasComponent extends FicheroNewComponent {
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
    servicio: ComisionAulaService,
    paramsSrvc: ComisionAulaParamsService,
    cdr: ChangeDetectorRef
  ) {
    super(message, servicio, paramsSrvc, cdr);
  }

}

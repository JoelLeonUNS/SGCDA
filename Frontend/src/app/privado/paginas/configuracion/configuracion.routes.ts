import { Routes } from '@angular/router';
import { CargosComponent } from './secciones/cargos/cargos.component';
import { MiembrosComponent } from './secciones/miembros/miembros.component';
import { ProcesosComponent } from './secciones/procesos/procesos.component';
import { PeriodosComponent } from './secciones/periodos/periodos.component';

export const CONFIGURACION_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'miembros',
    pathMatch: 'full',
  },
  {
    path: 'miembros',
    component: MiembrosComponent,
    data: {
      breadcrumb: 'Miembros'
    },
  },
  {
    path: 'cargos',
    component: CargosComponent,
    data: {
      breadcrumb: 'Cargos'
    },
  },
  {
    path: 'procesos',
    component: ProcesosComponent,
    data: {
      breadcrumb: 'Procesos'
    }
  },
  {
    path: 'periodos',
    component: PeriodosComponent,
    data: {
      breadcrumb: 'Periodos'
    }
  }
];

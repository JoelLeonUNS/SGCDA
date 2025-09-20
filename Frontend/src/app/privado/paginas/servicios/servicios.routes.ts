import { Routes } from '@angular/router';
import { CredencialesComponent } from './secciones/credenciales/credenciales.component';
import { ComisionesProcesoComponent } from './secciones/comisiones-proceso/comisiones-proceso.component';
import { PeriodosComponent } from './secciones/periodos/periodos.component';
import { ProcesosComponent } from './secciones/procesos/procesos.component';
import { AulasComponent } from './secciones/aulas/aulas.component';

export const SERVICIOS_ROUTES: Routes = [
  {
    path: 'periodos',
    component: PeriodosComponent,
    data: {
      breadcrumb: 'Periodos'
    }
  },
  {
    path: 'procesos',
    component: ProcesosComponent,
    data: {
      breadcrumb: 'Procesos'
    }
  },
  {
    path: 'comisiones',
    component: ComisionesProcesoComponent,
    data: {
      breadcrumb: 'Comisiones'
    }
  },
  {
    path: 'aulas',
    component: AulasComponent,
    data: {
      breadcrumb: 'Aulas'
    }
  },
  {
    path: 'credenciales',
    component: CredencialesComponent,
    data: {
      breadcrumb: 'Credenciales'
    }
  }
];

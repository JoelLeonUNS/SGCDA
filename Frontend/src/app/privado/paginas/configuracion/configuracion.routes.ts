import { Routes } from '@angular/router';
import { CargosComponent } from './secciones/cargos/cargos.component';
import { MiembrosComponent } from './secciones/miembros/miembros.component';
import { ProcesosComponent } from './secciones/procesos/procesos.component';
import { PeriodosComponent } from './secciones/periodos/periodos.component';
import { ComisionesComponent } from './secciones/comisiones/comisiones.component';
import { AulasComponent } from './secciones/aulas/aulas.component';
import { PabellonesComponent } from './secciones/pabellones/pabellones.component';
import { EspecialidadesComponent } from './secciones/especialidades/especialidades.component';

export const CONFIGURACION_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'comisiones',
    pathMatch: 'full',
  },
  {
    path: 'comisiones',
    component: ComisionesComponent,
    data: {
      breadcrumb: 'Comisiones'
    }
  },
  {
    path: 'miembros',
    component: MiembrosComponent,
    data: {
      breadcrumb: 'Miembros'
    },
  },
  {
    path: 'aulas',
    component: AulasComponent,
    data: {
      breadcrumb: 'Aulas'
    }
  },
  {
    path: 'pabellones',
    component: PabellonesComponent,
    data: {
      breadcrumb: 'Pabellones'
    }
  },
  {
    path: 'cargos',
    component: CargosComponent,
    data: {
      breadcrumb: 'Cargos'
    },
  },
  {
    path: 'especialidades',
    component: EspecialidadesComponent,
    data: {
      breadcrumb: 'Especialidades'
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
    path: 'periodos',
    component: PeriodosComponent,
    data: {
      breadcrumb: 'Periodos'
    }
  }
];

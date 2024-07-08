import { Routes } from '@angular/router';
import { CredencialesComponent } from './secciones/credenciales/credenciales.component';
import { ComisionesProcesoComponent } from './secciones/comisiones-proceso/comisiones-proceso.component';

export const SERVICIOS_ROUTES: Routes = [
  {
    path: 'comisiones',
    component: ComisionesProcesoComponent,
    data: {
      breadcrumb: 'Comisiones'
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

import { Routes } from '@angular/router';
import { ComisionesComponent } from './secciones/comisiones/comisiones.component';
import { CredencialesComponent } from './secciones/credenciales/credenciales.component';

export const SERVICIOS_ROUTES: Routes = [
  {
    path: 'comisiones',
    component: ComisionesComponent,
  },
  {
    path: 'credenciales',
    component: CredencialesComponent
  }
];

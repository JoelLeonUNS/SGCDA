import { Routes } from '@angular/router';
import { PrivadoComponent } from './privado.component';

export const PRIVADO_ROUTES: Routes = [
  {
    path: '',
    component: PrivadoComponent,
    children: [
      {
        path: '',
        redirectTo: 'credenciales',
        pathMatch: 'full',
      },
      {
        path: 'credenciales',
        loadChildren: () =>
          import('./paginas/credenciales/credenciales.routes').then(
            (m) => m.CREDENCIALES_ROUTES
          ),
      },
      {
        path: 'comisiones',
        loadChildren: () =>
          import('./paginas/comisiones/comisiones.routes').then(
            (m) => m.COMISIONES_ROUTES
          ),
      },
      {
        path: 'procesos',
        loadChildren: () =>
          import('./paginas/procesos/procesos.routes').then(
            (m) => m.PROCESOS_ROUTES
          ),
      },
      {
        path: 'miembros',
        loadChildren: () =>
          import('./paginas/miembros/miembros.routes').then(
            (m) => m.MIEMBROS_ROUTES
          ),
      },
    ],
  },
];

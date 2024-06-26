import { Routes } from '@angular/router';
import { PrivadoComponent } from './privado.component';

export const PRIVADO_ROUTES: Routes = [
  {
    path: '',
    component: PrivadoComponent,
    children: [
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full',
      },
      {
        path: 'inicio',
        loadChildren: () =>
          import('./paginas/inicio/inicio.routes').then(
            (m) => m.Inicio_ROUTES
          ),
        data: {
          breadcrumb: 'Inicio'
        },
      },
      {
        path: 'servicios',
        loadChildren: () =>
          import('./paginas/servicios/servicios.routes').then(
            (m) => m.SERVICIOS_ROUTES
          ),
        data: {
          breadcrumb: 'Servicios'
        },
      },
      {
        path: 'configuracion',
        loadChildren: () =>
          import('./paginas/configuracion/configuracion.routes').then(
            (m) => m.CONFIGURACION_ROUTES
          ),
        data: {
          breadcrumb: 'Configuración'
        },
      },
    ],
  },
];

import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
    },
    {
        path: '',
        loadChildren: () =>
        import('./privado/privado.routes').then((m) => m.PRIVADO_ROUTES),
    },
];

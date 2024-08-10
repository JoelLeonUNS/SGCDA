import { Injectable } from '@angular/core';
import { MenuItem } from '../../../interfaces/utilidades/menu-item.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuLateralService {

  constructor() { }

  scrollTopMenu: number = 0;

  menuItems: MenuItem[] = [
    {
      level: 1,
      title: 'Inicio',
      icon: 'home',
      routerLink: '/inicio'
    },
    {
      level: 1,
      title: 'Servicios',
      icon: 'tool',
      children: [
        {
          level: 2,
          title: 'Periodos',
          icon: 'calendar',
          routerLink: '/servicios/periodos',
        },
        {
          level: 2,
          title: 'Procesos',
          icon: 'control',
          routerLink: '/servicios/procesos',
        },
        // {
        //   level: 2,
        //   title: 'Miembros',
        //   icon: 'user',
        //   routerLink: '/servicios/miembros',
        // },
        {
          level: 2,
          title: 'Comisiones',
          icon: 'team',
          routerLink: '/servicios/comisiones',
        },
        {
          level: 2,
          title: 'Credenciales',
          icon: 'idcard',
          routerLink: '/servicios/credenciales',
        },
      ]
    },
    {
      level: 1,
      title: 'Configuración',
      icon: 'setting',
      children: [
        {
          level: 2,
          title: 'Comisiones',
          icon: 'team',
          routerLink: '/configuracion/comisiones',
        },
        {
          level: 2,
          title: 'Miembros',
          icon: 'user',
          routerLink: '/configuracion/miembros',
        },
        {
          level: 2,
          title: 'Aulas',
          icon: 'appstore',
          routerLink: '/configuracion/aulas',
        },
        {
          level: 2,
          title: 'Pabellones',
          icon: 'bank',
          routerLink: '/configuracion/pabellones',
        },
        {
          level: 2,
          title: 'Cargos',
          icon: 'apartment',
          routerLink: '/configuracion/cargos',
        },
        {
          level: 2,
          title: 'Especialidades',
          icon: 'aim',
          routerLink: '/configuracion/especialidades',
        },
        {
          level: 2,
          title: 'Procesos',
          icon: 'control',
          routerLink: '/configuracion/procesos',
        },
        {
          level: 2,
          title: 'Periodos',
          icon: 'calendar',
          routerLink: '/configuracion/periodos',
        },
      ]
    },
  ]
}

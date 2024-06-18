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
      title: 'Credenciales',
      icon: 'credit-card',
      routerLink: '/credenciales',
    },
    {
      level: 1,
      title: 'Comisiones',
      icon: 'team',
      routerLink: '/comisiones',
    },
    {
      level: 1,
      title: 'Miembros',
      icon: 'user',
      routerLink: '/miembros',
    },
    {
      level: 1,
      title: 'Cargos',
      icon: 'apartment',
      routerLink: '/cargos',
    },
    {
      level: 1,
      title: 'Procesos',
      icon: 'control',
      routerLink: '/procesos',
    },
    {
      level: 1,
      title: 'Periodos',
      icon: 'calendar',
      routerLink: '/periodos',
    },
  ]
}

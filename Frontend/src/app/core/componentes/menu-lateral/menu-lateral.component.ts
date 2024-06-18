import { Component } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [
        MenuModule,
        RouterLink,
        RouterLinkActive
  ],
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.css',
})
export class MenuLateralComponent {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Gestionar',
        items: [
          {
            label: 'Credenciales',
            icon: 'pi pi-fw pi-id-card',
            routerLink: '/credenciales',
            routerLinkActiveOptions: { exact: true },
          },
          {
            label: 'Procesos',
            icon: 'pi pi-fw pi-objects-column',
            routerLink: '/procesos',
          },
          {
            label: 'Periodos',
            icon: 'pi pi-fw pi-calendar',
            routerLink: '/periodos',
          },
          {
            label: 'Comisiones',
            icon: 'pi pi-fw pi-users',
            routerLink: '/comisiones',
          },
          {
            label: 'Miembros',
            icon: 'pi pi-fw pi-user',
            routerLink: '/miembros',
          },
          {
            label: 'Cargos',
            icon: 'pi pi-fw pi-briefcase',
            routerLink: '/cargos',
          },
        ],
      },
    ];
  }    
}

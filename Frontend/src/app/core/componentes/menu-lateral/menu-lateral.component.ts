import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { MenuItem } from '../../interfaces/utilidades/menu-item.interface';
import { MenuLateralService } from '../../servicios/utilidades/menu-lateral/menu-lateral.service';


@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzToolTipModule,
  ],
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.css'
})
export class MenuLateralComponent {
  @Input() isCollapsed: boolean = false;

  url: string = '';
  menuItems?: MenuItem[];
  itemsPadres: MenuItem[] = [];

  @ViewChild('sideBar', { static: true }) private sideBar!: ElementRef;

  constructor(    
    private menuLateralService:MenuLateralService,
    private router: Router,
  ) { 
  }
  
  ngOnInit(): void {
    this.menuItems = this.menuLateralService.menuItems;
    this.openMenuByUrl(this.router.url);
  }

  ngAfterViewInit(): void {
    (this.sideBar.nativeElement as HTMLElement).scrollTop = this.menuLateralService.scrollTopMenu;
  }

  onMenuClick(event: MouseEvent): void {
    event.stopPropagation();
    this.menuLateralService.scrollTopMenu = (this.sideBar.nativeElement as HTMLElement).scrollTop;
  }

  openMenuByUrl(url: string): void {
    const menuItems = this.menuItems || [];
    this.url = url;
  
    this.openMenuRecursively(menuItems);
  }

  openMenuRecursively(items: MenuItem[]) {
    for (const item of items) {
      if (item.routerLink && item.routerLink == this.url) {
        if(this.itemsPadres.length > 0) {
          for (const itemPadre of this.itemsPadres) {
            itemPadre.open = true;
          }
        }
        return;
      }

      if (item.children) {
        this.itemsPadres.push(item);
        this.openMenuRecursively(item.children);
        this.itemsPadres.pop();
      }
    }
  };
}

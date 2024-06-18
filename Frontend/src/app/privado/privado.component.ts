import { Component } from '@angular/core';
import { MenuLateralComponent } from '../core/componentes/menu-lateral/menu-lateral.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-privado',
  standalone: true,
  imports: [MenuLateralComponent, RouterOutlet],
  templateUrl: './privado.component.html',
  styleUrl: './privado.component.css'
})
export class PrivadoComponent {

  constructor() {}

    
}

import { Component, NgZone } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { TokenService } from '../../servicios/token/token.service';

@Component({
  selector: 'app-redirigiendo-ruta',
  standalone: true,
  imports: [NzSpinModule, RouterLink],
  templateUrl: './redirigiendo-ruta.component.html',
  styleUrl: './redirigiendo-ruta.component.css'
})
export class RedirigiendoRutaComponent {
  constructor(private router: Router) {}

  // espera un tiempo y redirige a la ruta de ingreso
  
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { PeriodoPipe } from '../../pipes/periodo/periodo.pipe';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PeriodoService } from '../../servicios/rest/periodo/periodo.service';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-mostrar-periodo',
  standalone: true,
  imports: [NzTagModule, NzIconModule, PeriodoPipe],
  templateUrl: './mostrar-periodo.component.html',
  styleUrl: './mostrar-periodo.component.css'
})
export class MostrarPeriodoComponent {
  periodo: string = '- Sin periodo -';
  cargando: boolean = true;
 
  @Input() id: number = 0;
  @Input() modo: 'ACTUAL' | 'POR_ID' = 'ACTUAL';

  @Output() periodoChange = new EventEmitter<any>();

  constructor( private periodoService: PeriodoService, private msgService: NzMessageService ) {}

  ngOnInit() {
    this.establacerPeriodo();
  }

  establacerPeriodo() {
    if(this.modo === 'ACTUAL') {
      this.obtenerPeriodoActual();
    } else if(this.modo === 'POR_ID') {
      this.obtenerPeriodo();
    } else {
      this.obtenerPeriodoActual();
    }
  }

  obtenerPeriodoActual() {
    this.periodoService.obtenerActual().subscribe({
      next: (respuesta) => {
        this.cargando = false;
        this.periodo = respuesta.periodo;
        this.periodoChange.emit(respuesta);
      },
      error: () => {
        this.cargando = false;
        this.msgService.error('Error al obtener el periodo actual');
      },
    });
  }

  obtenerPeriodo() {
    this.periodoService.obtenerPorId(this.id).subscribe({
      next: (respuesta) => {
        this.cargando = false;
        this.periodo = respuesta.periodo;
        this.periodoChange.emit(respuesta);
      },
      error: (error) => {
        this.cargando = false;
        console.log('Error al extraer los datos.', error);
      },
    });
  }
}

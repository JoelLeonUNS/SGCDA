import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { PeriodoPipe } from '../../pipes/periodo/periodo.pipe';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ProcesoPeriodoService } from '../../servicios/rest/proceso-periodo/proceso-periodo.service';

@Component({
  selector: 'app-mostrar-proceso-periodo',
  standalone: true,
  imports: [NzTagModule, NzIconModule, PeriodoPipe],
  templateUrl: './mostrar-proceso-periodo.component.html',
  styleUrl: './mostrar-proceso-periodo.component.css'
})
export class MostrarProcesoPeriodoComponent {
  proceso: string = '- Sin proceso -';
  cargando: boolean = true;
 
  @Input() id: number = 0;
  @Input() modo: 'ACTUAL' | 'POR_ID' = 'ACTUAL';

  @Output() procesoChange = new EventEmitter<any>();

  constructor( private procesoPeriodoService: ProcesoPeriodoService, private msgService: NzMessageService ) {}

  ngOnInit() {
    this.establacerProcesoPeriodo();
  }

  establacerProcesoPeriodo() {
    if(this.modo === 'ACTUAL') {
      this.obtenerActual();
    } else if(this.modo === 'POR_ID') {
      this.obtenerPeriodo();
    } else {
      this.obtenerActual();
    }
  }

  obtenerActual() {
    this.procesoPeriodoService.obtenerActual().subscribe({
      next: (respuesta) => {
        this.cargando = false;
        this.proceso = respuesta.proceso + " " + respuesta.periodo;
        this.procesoChange.emit(respuesta);
      },
      error: () => {
        this.cargando = false;
        this.msgService.error('Error al obtener el periodo actual');
      },
    });
  }

  obtenerPeriodo() {
    this.procesoPeriodoService.obtenerPorId(this.id).subscribe({
      next: (respuesta) => {
        this.cargando = false;
        this.proceso = respuesta.proceso + " " + respuesta.periodo;
        this.procesoChange.emit(respuesta);
      },
      error: (error) => {
        this.cargando = false;
        console.log('Error al extraer los datos.', error);
      },
    });
  }
}

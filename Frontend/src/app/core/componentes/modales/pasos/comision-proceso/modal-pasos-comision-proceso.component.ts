import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { ModalPasosComponent } from '../modal-pasos.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { DataStorageService } from '../../../../servicios/localstorage/data-storage.service';
import { ComisionProcesoService } from '../../../../servicios/rest/comision-proceso/comision-proceso.service';
import { ProcesoPeriodoService } from '../../../../servicios/rest/proceso-periodo/proceso-periodo.service';
import { ComisionProcesoComisionComponent } from "./p01-comision/comision-proceso-comision.component";
import { ComisionProcesoMiembroComponent } from "./p02-miembro/comision-proceso-miembro.component";
import { ComisionProcesoHorarioComponent } from "./p03-horario/comision-proceso-horario.component";

@Component({
    selector: 'app-modal-pasos-comision-proceso',
    standalone: true,
    templateUrl: './modal-pasos-comision-proceso.component.html',
    styleUrl: '../modal-pasos.component.css',
    imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzModalModule,
    NzButtonModule,
    NzRadioModule,
    NzSelectModule,
    NzDatePickerModule,
    NzGridModule,
    NzStepsModule,
    NzSpinModule,
    NzIconModule,
    NzAlertModule,
    ComisionProcesoComisionComponent,
    ComisionProcesoMiembroComponent,
    ComisionProcesoHorarioComponent
]
})
export class ModalPasosComisionProcesoComponent extends ModalPasosComponent {
  namespace = 'modal_pasos_comision_proceso';
  override btnPrimario: String = 'Guardar';
  override steps = 3;
  
  // Propiedades para manejar edición
  modoEdicion: boolean = false;
  idComisionParaEditar?: number;
  datosOriginales?: any;
   
  mensajeInfos: string[] = [
    'Elija la comisión a la que pertenecerá el proceso. También puede definir sus aulas.',
    'Elija los miembros que participarán en la comisión.',
    'Defina un horario para toda la comisión, o para cada miembro.'
  ];

  pasosValidos:boolean[] = [false, false, false];

  constructor(
    msgService: NzMessageService,
    servicio: ComisionProcesoService,
    fb: NonNullableFormBuilder,
    dataStorageSrvc: DataStorageService,
    private msg: NzMessageService,
    private procesoPeriodoService: ProcesoPeriodoService,
  ) {
    super(msgService, servicio, fb, dataStorageSrvc);
  }

  ngOnInit(): void {
    this.current = this.dataStorageSrvc.obtenerDeNamespace<number>(this.namespace, 'current', 0, this.accion);
    this.comprobarBtns();
  }

  /**
   * Abre el modal para crear una nueva comisión
   */
  abrirParaCrear(): void {
    this.modoEdicion = false;
    this.idComisionParaEditar = undefined;
    this.datosOriginales = undefined;
    this.btnPrimario = 'Guardar';
    this.current = 0;
    this.limpiarStorage();
    this.isVisible = true;
  }

  /**
   * Abre el modal para editar una comisión existente
   */
  abrirParaEditar(id: number): void {
    this.modoEdicion = true;
    this.idComisionParaEditar = id;
    this.btnPrimario = 'Actualizar';
    this.current = 0;
    this.isVisible = true;
    
    // Cargar datos de la comisión para editar
    this.cargarDatosParaEdicion(id);
  }

  /**
   * Carga los datos de una comisión existente para edición
   */
  private cargarDatosParaEdicion(id: number): void {
    (this.servicio as ComisionProcesoService).obtenerCompleto(id).subscribe({
      next: (datos: any) => {
        this.datosOriginales = datos;
        this.precargarDatosEnPasos(datos);
      },
      error: (error: any) => {
        console.error('Error al cargar datos para edición:', error);
        this.msg.error('Error al cargar los datos de la comisión');
      }
    });
  }

  /**
   * Precarga los datos en cada paso del formulario
   */
  private precargarDatosEnPasos(datos: any): void {
    const nsComision = 'comision_proceso_comision';
    const nsMiembro = 'comision_proceso_miembro';
    const nsHorario = 'comision_proceso_horario';

    // Precarga paso 1: Comisión y aulas
    const formComision = {
      comision: datos.comision_nombre,
      comision_id: datos.comision_id,
      usa_aulas: datos.usa_aulas,
      aula_ids: datos.aulas || [],
      aulas: datos.aulas_data ? datos.aulas_data.map((a: any) => a.nombre) : []
    };
    
    this.dataStorageSrvc.guardarEnNamespace(nsComision, 'form', formComision, this.accion);

    // Precarga paso 2: Miembros
    // Crear estructura de comisionesTransfer para el componente de miembros
    const comisionTransfer = {
      id: datos.comision_id,
      miembros: datos.miembros.map((m: any) => ({
        key: m.miembro_cargo_id,
        title: `${m.miembro_nombre} - ${m.cargo_nombre}`,
        description: `DNI: ${m.miembro_dni}`,
        direction: 'right' // Miembros ya están asignados (en el lado derecho del transfer)
      }))
    };

    // Guardar la estructura de transfer y el formulario de miembros
    this.dataStorageSrvc.guardarEnNamespace(nsMiembro, 'comisionesTransfer', [comisionTransfer], this.accion);
    this.dataStorageSrvc.guardarEnNamespace(nsMiembro, 'form', {
      comision: datos.comision_nombre,
      comision_id: -1, // Miembros sin comisión para el transfer
      comision_id_actual: datos.comision_id,
      tiene_miembros: datos.miembros && datos.miembros.length > 0
    }, this.accion);
    
    // Guardar datos adicionales para que estén disponibles en el componente
    this.dataStorageSrvc.guardarEnNamespace(nsMiembro, 'comision', datos.comision_nombre, this.accion);
    this.dataStorageSrvc.guardarEnNamespace(nsMiembro, 'comision_id_actual', datos.comision_id, this.accion);
    this.dataStorageSrvc.guardarEnNamespace(nsMiembro, 'tiene_miembros', datos.miembros && datos.miembros.length > 0, this.accion);

    // Precarga paso 3: Horarios
    const formHorario: any = {
      usa_horarios: !datos.usa_horarios_individuales
    };

    if (datos.usa_horarios_individuales && datos.horarios_individuales && datos.horarios_individuales.length > 0) {
      // Horarios individuales - convertir fechas/horas al formato correcto
      formHorario.horarios = datos.horarios_individuales.map((h: any) => ({
        miembro_id: h.miembro_id,
        fecha: new Date(h.fecha + 'T00:00:00'),
        hora_inicial: this.convertirHoraStringADate(h.hora_inicial),
        hora_final: this.convertirHoraStringADate(h.hora_final)
      }));
    } else if (!datos.usa_horarios_individuales && datos.horario_general) {
      // Horario general
      formHorario.fecha = new Date(datos.horario_general.fecha + 'T00:00:00');
      formHorario.hora_inicial = this.convertirHoraStringADate(datos.horario_general.hora_inicial);
      formHorario.hora_final = this.convertirHoraStringADate(datos.horario_general.hora_final);
    }

    this.dataStorageSrvc.guardarEnNamespace(nsHorario, 'form', formHorario, this.accion);
  }

  /**
   * Convierte una hora en formato string (HH:mm:ss) a Date para ng-zorro
   */
  private convertirHoraStringADate(horaString: string): Date {
    const [horas, minutos, segundos] = horaString.split(':');
    const fecha = new Date();
    fecha.setHours(parseInt(horas, 10));
    fecha.setMinutes(parseInt(minutos, 10));
    fecha.setSeconds(parseInt(segundos || '0', 10));
    fecha.setMilliseconds(0);
    return fecha;
  }

  override irAtras(): void {
    super.irAtras();
    this.dataStorageSrvc.guardarEnNamespace(this.namespace, 'current', this.current, this.accion);
  }

  override irAdelante(): void {
    super.irAdelante();
    this.dataStorageSrvc.guardarEnNamespace(this.namespace, 'current', this.current, this.accion);
  }

  get isValido(): boolean {
    return this.pasosValidos[this.current];
  }

  guardar(): void {
    this.confirmando = true;
    
    // Primero obtener el proceso periodo actual
    this.procesoPeriodoService.obtenerActual().subscribe({
      next: (procesoPeriodoActual: any) => {
        this.procesarGuardadoConProcesoPeriodo(procesoPeriodoActual.id);
      },
      error: (error: any) => {
        console.error('Error al obtener proceso periodo actual:', error);
        this.msg.error('Error al obtener el proceso periodo actual');
        this.confirmando = false;
      }
    });
  }

  private procesarGuardadoConProcesoPeriodo(procesoPeriodoId: number): void {
    // Se va a formatear el formulario para enviarlo al servidor
    const nsComision = 'comision_proceso_comision';
    const nsMiembro = 'comision_proceso_miembro';
    const nsHorario = 'comision_proceso_horario';
    
    const formComision = this.dataStorageSrvc.obtenerDeNamespace<any>(nsComision, 'form', null, this.accion);
    const formMiembro = this.dataStorageSrvc.obtenerDeNamespace<any>(nsMiembro, 'form', null, this.accion);
    const formHorario = this.dataStorageSrvc.obtenerDeNamespace<any>(nsHorario, 'form', null, this.accion);

    if (!formComision || !formMiembro || !formHorario) {
      this.msg.error('Faltan datos en el formulario');
      this.confirmando = false;
      return;
    }

    // Obtener los miembros seleccionados
    const comisionesTransfer = this.dataStorageSrvc.obtenerDeNamespace<any[]>(nsMiembro, 'comisionesTransfer', [], this.accion);
    const comisionActual = comisionesTransfer.find(c => c.id === formComision.comision_id);
    
    if (!comisionActual || !comisionActual.miembros || comisionActual.miembros.length === 0) {
      this.msg.error('No se han seleccionado miembros para la comisión');
      this.confirmando = false;
      return;
    }

    // Preparar datos para enviar
    const datosComision: any = {
      comision_id: formComision.comision_id,
      proceso_periodo_id: procesoPeriodoId, // Usar el ID obtenido del servicio
      miembros: comisionActual.miembros.map((m: any) => ({
        miembro_cargo_id: m.key,
        es_encargado: false // Puede expandirse para manejar encargados
      })),
      usa_horarios_individuales: !formHorario.usa_horarios,
      aulas: formComision.usa_aulas && formComision.aula_ids ? formComision.aula_ids : []
    };

    // Agregar horarios según el tipo
    if (formHorario.usa_horarios) {
      // Horario general para todos
      datosComision.usa_horarios_individuales = false;
      datosComision.horario_general = {
        fecha: formHorario.fecha,
        hora_inicial: formHorario.hora_inicial,
        hora_final: formHorario.hora_final
      };
    } else {
      // Horarios individuales
      datosComision.usa_horarios_individuales = true;
      datosComision.horarios_individuales = formHorario.horarios.map((h: any) => ({
        miembro_id: h.miembro_id,
        fecha: h.fecha,
        hora_inicial: h.hora_inicial,
        hora_final: h.hora_final
      }));
    }

    console.log('Datos a enviar:', datosComision);

    // Enviar al backend según el modo
    if (this.modoEdicion && this.idComisionParaEditar) {
      // Modo edición - actualizar
      (this.servicio as ComisionProcesoService).actualizarCompleto(this.idComisionParaEditar, datosComision).subscribe({
        next: (response: any) => {
          this.msg.success('Comisión actualizada exitosamente');
          this.limpiarStorage();
          this.confirmar(response);
        },
        error: (error: any) => {
          console.error('Error al actualizar comisión:', error);
          this.msg.error('Error al actualizar la comisión: ' + (error.error?.message || error.message));
          this.confirmando = false;
        }
      });
    } else {
      // Modo creación - crear
      (this.servicio as ComisionProcesoService).crearCompleto(datosComision).subscribe({
        next: (response: any) => {
          this.msg.success('Comisión creada exitosamente');
          this.limpiarStorage();
          this.confirmar(response);
        },
        error: (error: any) => {
          console.error('Error al crear comisión:', error);
          this.msg.error('Error al crear la comisión: ' + (error.error?.message || error.message));
          this.confirmando = false;
        }
      });
    }
  }

  private limpiarStorage(): void {
    // Limpiar datos del storage después de guardar exitosamente
    const namespaces = ['comision_proceso_comision', 'comision_proceso_miembro', 'comision_proceso_horario', 'modal_pasos_comision_proceso'];
    namespaces.forEach(ns => {
      this.dataStorageSrvc.limpiarNamespace(ns, this.accion);
    });
  }

}

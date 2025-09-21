import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { TransferItem } from 'ng-zorro-antd/transfer';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComisionMiembroService } from '../../../../servicios/rest/comision-miembro/comision-miembro.service';

interface MiembroTransfer extends TransferItem {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  cargo: string;
  miembro_cargo_id: number;
}

@Component({
  selector: 'app-modal-asignacion-aula-miembros',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzModalModule,
    NzButtonModule,
    NzTransferModule,
    NzRadioModule,
    NzFormModule,
    NzTagModule,
    NzIconModule,
    NzCardModule,
    NzListModule,
    NzGridModule,
    NzAlertModule,
    NzSpinModule,
    NzStatisticModule
  ],
  templateUrl: './modal-asignacion-aula-miembros.component.html',
  styleUrls: ['./modal-asignacion-aula-miembros.component.css']
})
export class ModalAsignacionAulaMiembrosComponent {
  @Output() onConfirmar = new EventEmitter<any>();
  @Output() onCancelar = new EventEmitter<void>();
  @Input() aulaData: any;

  isVisible = false;
  loading = false;
  titulo = 'Asignar Miembros al Aula';

  miembrosDisponibles: MiembroTransfer[] = [];
  miembrosAsignados: MiembroTransfer[] = [];
  encargadoId: number | null = null;

  asignacionForm: FormGroup;

  // Datos inmutables para el transfer
  private _allMiembros: MiembroTransfer[] = [];
  private _targetKeys: string[] = [];

  constructor(
    private msg: NzMessageService,
    private fb: FormBuilder,
    private comisionMiembroService: ComisionMiembroService,
    private cdr: ChangeDetectorRef
  ) {
    this.asignacionForm = this.fb.group({
      encargado_id: [null, Validators.required]
    });
  }

  mostrar(aulaData: any) {
    this.aulaData = aulaData;
    this.isVisible = true;
    this.loading = true;
    this.encargadoId = null;
    this.miembrosDisponibles = [];
    this.miembrosAsignados = [];
    this._allMiembros = [];
    this._targetKeys = [];
    this.asignacionForm.reset();

    // Cargar datos
    this.cargarDatos();
  }

  private cargarDatos() {
    Promise.all([
      this.cargarMiembrosDisponibles(),
      this.cargarMiembrosAsignados()
    ]).finally(() => {
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  private cargarMiembrosDisponibles(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.aulaData?.comision_proceso_id) {
        this.msg.error('Faltan datos de la comisión');
        reject();
        return;
      }

      this.comisionMiembroService.obtenerMiembrosDisponiblesParaAula(
        this.aulaData.id
      ).subscribe({
        next: (miembros: any[]) => {
          this.miembrosDisponibles = miembros.map((miembro: any) => ({
            id: miembro.id,
            key: miembro.id.toString(),
            title: `${miembro.nombre} ${miembro.apellido}`,
            description: `DNI: ${miembro.dni || 'Sin DNI'} - ${miembro.cargo}`,
            nombre: miembro.nombre,
            apellido: miembro.apellido,
            dni: miembro.dni || '',
            cargo: miembro.cargo,
            miembro_cargo_id: miembro.miembro_cargo_id,
            direction: 'left'
          }));
          this.updateTransferData();
          resolve();
        },
        error: (error: any) => {
          this.msg.error('Error al cargar miembros disponibles');
          reject(error);
        }
      });
    });
  }

  private cargarMiembrosAsignados(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.aulaData?.comision_proceso_id) {
        resolve();
        return;
      }

      this.comisionMiembroService.obtenerMiembrosAsignadosAula(
        this.aulaData.id
      ).subscribe({
        next: (miembros: any[]) => {
          this.miembrosAsignados = miembros.map((miembro: any) => ({
            id: miembro.id,
            key: miembro.id.toString(),
            title: `${miembro.nombre} ${miembro.apellido}`,
            description: `DNI: ${miembro.dni || 'Sin DNI'} - ${miembro.cargo}`,
            nombre: miembro.nombre,
            apellido: miembro.apellido,
            dni: miembro.dni || '',
            cargo: miembro.cargo,
            miembro_cargo_id: miembro.miembro_cargo_id,
            direction: 'right'
          }));

          // Buscar si hay un encargado actual
          const encargado = miembros.find((m: any) => m.es_encargado);
          if (encargado) {
            this.encargadoId = encargado.id;
            this.asignacionForm.patchValue({ encargado_id: encargado.id });
          }
          
          this.updateTransferData();
          resolve();
        },
        error: (error: any) => {
          this.msg.error('Error al cargar miembros asignados');
          reject(error);
        }
      });
    });
  }

  private updateTransferData() {
    // Crear una nueva lista inmutable combinando disponibles y asignados
    this._allMiembros = [
      ...this.miembrosDisponibles,
      ...this.miembrosAsignados
    ];
    
    // Crear nueva lista inmutable de target keys
    this._targetKeys = [...this.miembrosAsignados.map(m => m['key'])];
    
    this.cdr.detectChanges();
  }

  // Métodos públicos para el template
  getAllMiembros(): MiembroTransfer[] {
    return this._allMiembros;
  }

  getTargetKeys(): string[] {
    return this._targetKeys;
  }

  onTransferChange(event: any) {
    const { from, to, list } = event;
    
    // Crear nuevas copias de los arrays para mantener inmutabilidad
    if (to === 'right') {
      // Miembros siendo asignados al aula
      const newAsignados = [...this.miembrosAsignados];
      list.forEach((item: any) => {
        const existingIndex = newAsignados.findIndex(m => m.id === item.id);
        if (existingIndex === -1) {
          // Remover de disponibles
          this.miembrosDisponibles = this.miembrosDisponibles.filter(m => m.id !== item.id);
          // Agregar a asignados
          newAsignados.push({
            ...item,
            direction: 'right'
          });
        }
      });
      this.miembrosAsignados = newAsignados;
    } else {
      // Miembros siendo removidos del aula
      const newDisponibles = [...this.miembrosDisponibles];
      list.forEach((item: any) => {
        const existingIndex = newDisponibles.findIndex(m => m.id === item.id);
        if (existingIndex === -1) {
          // Agregar a disponibles
          newDisponibles.push({
            ...item,
            direction: 'left'
          });
        }
      });
      
      this.miembrosDisponibles = newDisponibles;
      this.miembrosAsignados = this.miembrosAsignados.filter(
        m => !list.some((item: any) => item.id === m.id)
      );
      
      // Si el encargado fue removido, limpiar la selección
      if (list.some((item: any) => item.id === this.encargadoId)) {
        this.encargadoId = null;
        this.asignacionForm.patchValue({ encargado_id: null });
      }
    }
    
    // Actualizar datos del transfer sin causar detección de cambios
    setTimeout(() => {
      this.updateTransferData();
    }, 0);
  }

  onEncargadoChange(encargadoId: number) {
    this.encargadoId = encargadoId;
    this.cdr.detectChanges();
  }

  getEncargadoNombre(): string {
    const encargado = this.miembrosAsignados.find(m => m.id === this.encargadoId);
    return encargado ? `${encargado.nombre} ${encargado.apellido}` : '';
  }

  confirmar() {
    if (this.miembrosAsignados.length === 0) {
      this.msg.warning('Debe asignar al menos un miembro al aula');
      return;
    }

    if (!this.encargadoId) {
      this.msg.warning('Debe seleccionar un encargado del aula');
      return;
    }

    this.loading = true;

    const payload = {
      aula_id: this.aulaData.id,
      comision_proceso_id: this.aulaData.comision_proceso_id,
      miembros_ids: this.miembrosAsignados.map(m => m.id),
      encargado_id: this.encargadoId
    };

    this.comisionMiembroService.asignarMiembrosAula(payload).subscribe({
      next: (response: any) => {
        this.msg.success('Miembros asignados correctamente al aula');
        this.onConfirmar.emit({
          miembrosIds: payload.miembros_ids,
          encargadoId: payload.encargado_id,
          aulaId: payload.aula_id,
          comisionProcesoId: payload.comision_proceso_id
        });
        this.cerrar();
      },
      error: (error: any) => {
        this.loading = false;
        this.msg.error('Error al asignar miembros al aula');
        console.error('Error:', error);
      }
    });
  }

  cancelar() {
    this.onCancelar.emit();
    this.cerrar();
  }

  private cerrar() {
    this.isVisible = false;
    this.loading = false;
    this.encargadoId = null;
    this.miembrosDisponibles = [];
    this.miembrosAsignados = [];
    this._allMiembros = [];
    this._targetKeys = [];
    this.asignacionForm.reset();
    this.cdr.detectChanges();
  }
}
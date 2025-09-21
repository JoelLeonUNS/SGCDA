<?php

namespace App\Services;

use App\Repositories\ComisionAulaRepository;
use App\Repositories\ComisionMiembroRepository;
use App\Repositories\ComisionProcesoRepository;
use App\Repositories\HorarioRepository;
use App\Repositories\ProcesoPeriodoRepository;
use App\Traits\General\FechaFormatoABarraTrait;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Log;


class ComisionProcesoService
{
    use FechaFormatoABarraTrait;
    protected ProcesoPeriodoRepository $procesoPeriodoRepository;
    protected ComisionMiembroRepository $comisionMiembroRepository;
    protected ComisionProcesoRepository $comisionProcesoRepository;
    protected ComisionAulaRepository $comisionAulaRepository;
    protected HorarioRepository $horarioRepository;

    public function __construct(ComisionProcesoRepository $comisionProcesoRepository, ComisionMiembroRepository $comisionMiembroRepository, ProcesoPeriodoRepository $procesoPeriodoRepository, HorarioRepository $horarioRepository, ComisionAulaRepository $comisionAulaRepository)
    {
        $this->comisionMiembroRepository = $comisionMiembroRepository;
        $this->comisionProcesoRepository = $comisionProcesoRepository;
        $this->procesoPeriodoRepository = $procesoPeriodoRepository;
        $this->horarioRepository = $horarioRepository;
        $this->comisionAulaRepository = $comisionAulaRepository;
    }

    /**
     * Obtiene todos los comision procesos.
     *
     * @return Collection
     */
    public function getAll(): Collection
    {
        return $this->comisionProcesoRepository->obtenerTodos();
    }

    /**
     * Obtiene una comisión por su ID.
     *
     * @param int $id
     * @return Model
     */
    public function getById(int $id): Model
    {
        $comisionProceso = $this->comisionProcesoRepository->obtenerPorId($id);
        $comisionProceso->fecha = $this->convertirFecha($comisionProceso->fecha);
    
        $comisionMiembros = $this->comisionMiembroRepository->obtenerMiembros($comisionProceso->id);
         // Inicializa los arrays para nombres completos e IDs
        $miembrosNombres = [];
        $miembrosIds = [];
        // Recorre los miembros para obtener los nombres completos e IDs
        foreach ($comisionMiembros as $cm) {
            $miembrosNombres[] = $cm->miembroCargo->miembro->nombres . ' ' . $cm->miembroCargo->miembro->apellidos;
            $miembrosIds[] = $cm->miembroCargo->id;
        }
        // Asigna los valores procesados al objeto comisionProceso
        $comisionProceso->miembros = $miembrosNombres;
        $comisionProceso->miembros_ids = $miembrosIds;
        return $comisionProceso;
    }

    /**
     * Obtiene una comisión proceso completa con todos sus datos relacionados.
     *
     * @param int $id
     * @return array
     */
    public function getCompletoById(int $id): array
    {
        $comisionProceso = $this->comisionProcesoRepository->obtenerPorId($id);
        if (!$comisionProceso) {
            throw new \Exception('Comisión proceso no encontrada');
        }

        // Cargar la relación comision explícitamente
        $comisionProceso->load('comision');

        // Obtener miembros con sus horarios
        $miembros = $this->comisionMiembroRepository->obtenerPorComisionProceso($id);
        
        // Cargar las relaciones necesarias para los miembros
        $miembros->load(['miembroCargo.miembro', 'miembroCargo.cargoEspecialidad.cargo', 'horario']);
        $miembrosData = [];
        $horariosIndividuales = [];
        $horarioGeneral = null;
        $usaHorariosIndividuales = true;

        // Procesar miembros y horarios
        if ($miembros->isNotEmpty()) {
            $primerHorarioId = $miembros->first()->horario_id;
            $usaHorariosIndividuales = false;
            
            // Verificar si todos los miembros tienen el mismo horario
            foreach ($miembros as $miembro) {
                if ($miembro->horario_id !== $primerHorarioId) {
                    $usaHorariosIndividuales = true;
                    break;
                }
            }

            foreach ($miembros as $miembro) {
                // Verificar que las relaciones existen
                if (!$miembro->miembroCargo || !$miembro->miembroCargo->miembro || 
                    !$miembro->miembroCargo->cargoEspecialidad || 
                    !$miembro->miembroCargo->cargoEspecialidad->cargo) {
                    Log::warning("Relaciones faltantes para miembro ID: {$miembro->id}");
                    continue;
                }

                $miembrosData[] = [
                    'miembro_cargo_id' => $miembro->miembro_cargo_id,
                    'es_encargado' => $miembro->es_encargado,
                    'horario_id' => $miembro->horario_id,
                    // Datos adicionales para el frontend
                    'miembro_nombre' => $miembro->miembroCargo->miembro->nombres . ' ' . $miembro->miembroCargo->miembro->apellidos,
                    'miembro_dni' => $miembro->miembroCargo->miembro->dni,
                    'cargo_nombre' => $miembro->miembroCargo->cargoEspecialidad->cargo->nombre
                ];

                if ($usaHorariosIndividuales && $miembro->horario) {
                    $horariosIndividuales[] = [
                        'miembro_id' => $miembro->miembro_cargo_id,
                        'fecha' => $miembro->horario->fecha,
                        'hora_inicial' => $miembro->horario->hora_inicial,
                        'hora_final' => $miembro->horario->hora_final
                    ];
                }
            }

            // Si es horario general, tomar el horario del primer miembro
            if (!$usaHorariosIndividuales && $miembros->first()->horario) {
                $horario = $miembros->first()->horario;
                $horarioGeneral = [
                    'fecha' => $horario->fecha,
                    'hora_inicial' => $horario->hora_inicial,
                    'hora_final' => $horario->hora_final
                ];
            }
        }

        // Obtener aulas
        $aulas = $this->comisionAulaRepository->obtenerPorComisionProceso($id);
        
        // Cargar relación con aula para obtener nombres
        $aulas->load('aula');
        
        $aulasIds = $aulas->pluck('aula_id')->toArray();
        $aulasData = $aulas->map(function($comisionAula) {
            return [
                'id' => $comisionAula->aula_id,
                'nombre' => $comisionAula->aula ? $comisionAula->aula->nombre : 'Aula sin nombre'
            ];
        })->toArray();

        // Obtener información adicional de la comisión
        $comision = $comisionProceso->comision;
        $comisionNombre = null;
        
        if ($comision) {
            $comisionNombre = $comision->nombre;
        } else {
            Log::warning("Comisión no encontrada para ComisionProceso ID: {$id}, comision_id: {$comisionProceso->comision_id}");
        }

        return [
            'id' => $comisionProceso->id,
            'comision_id' => $comisionProceso->comision_id,
            'comision_nombre' => $comisionNombre,
            'proceso_periodo_id' => $comisionProceso->proceso_periodo_id,
            'estado' => $comisionProceso->estado,
            'miembros' => $miembrosData,
            'usa_horarios_individuales' => $usaHorariosIndividuales,
            'horario_general' => $horarioGeneral,
            'horarios_individuales' => $horariosIndividuales,
            'aulas' => $aulasIds,
            'aulas_data' => $aulasData,
            'usa_aulas' => !empty($aulasIds)
        ];
    }

    /**
     * Crea un nuevo comision.
     *
     * @param array $data
     * @return Model
     */
    public function create(array $data): Model
    {
        Log::debug('data: ' . json_encode($data));
        // Desacoplar cada id de miembros_ids
        $miembros_ids = $data['miembros_ids'];
        // Desacoplar fecha y hora inicial y final
        $fecha = $data['fecha'];
        $hora_inicial = $data['hora_inicial'];
        $hora_final = $data['hora_final'];
        // Eliminar miembros_ids, fecha y hora del array de datos
        unset($data['miembros_ids']);
        unset($data['fecha']);
        unset($data['hora_inicial']);
        unset($data['hora_final']);

        // Crear la comisión proceso
        $comisionProceso = $this->comisionProcesoRepository->crear($data);
        // Crear el horario
        $horario = $this->horarioRepository->crear([
            'fecha' => date('Y-m-d', strtotime($fecha)),
            'hora_inicial' => date('H:i:s', strtotime($hora_inicial)),
            'hora_final' => date('H:i:s', strtotime($hora_final)),
        ]);
        // Asignar los miembros a la comisión
        foreach ($miembros_ids as $miembro_id) {
            $this->comisionMiembroRepository->crear([
                'comision_proceso_id' => $comisionProceso->id,
                'miembro_cargo_id' => $miembro_id,
                'horario_id' => $horario->id,
            ]);
        }
        return $comisionProceso;
    }

    /**
     * Crea una nueva comisión proceso completa con horarios y aulas.
     *
     * @param array $data
     * @return Model
     */
    public function createCompleto(array $data): Model
    {
        Log::debug('Datos recibidos para crear comisión completa: ' . json_encode($data));

        // Extraer datos de la comisión proceso
        $comisionProcesoData = [
            'comision_id' => $data['comision_id'],
            'proceso_periodo_id' => $data['proceso_periodo_id'],
            'estado' => $data['estado'] ?? 'ABIERTO',
        ];

        // Crear la comisión proceso
        $comisionProceso = $this->comisionProcesoRepository->crear($comisionProcesoData);

        // Manejar horarios y miembros
        $miembros = $data['miembros'] ?? [];
        $usaHorariosIndividuales = $data['usa_horarios_individuales'] ?? true;

        if ($usaHorariosIndividuales) {
            // Horarios individuales por miembro
            $horariosIndividuales = $data['horarios_individuales'] ?? [];
            
            foreach ($miembros as $miembro) {
                $miembroId = $miembro['miembro_cargo_id'];
                $horarioData = null;
                
                // Buscar el horario correspondiente a este miembro
                foreach ($horariosIndividuales as $horario) {
                    if ($horario['miembro_id'] == $miembroId) {
                        $horarioData = $horario;
                        break;
                    }
                }
                
                if ($horarioData) {
                    // Crear horario individual
                    $horario = $this->horarioRepository->crear([
                        'fecha' => date('Y-m-d', strtotime($horarioData['fecha'])),
                        'hora_inicial' => date('H:i:s', strtotime($horarioData['hora_inicial'])),
                        'hora_final' => date('H:i:s', strtotime($horarioData['hora_final'])),
                        'estado' => 'ACTIVO',
                    ]);
                    
                    // Crear comision_miembro con horario individual
                    $this->comisionMiembroRepository->crear([
                        'comision_proceso_id' => $comisionProceso->id,
                        'miembro_cargo_id' => $miembroId,
                        'horario_id' => $horario->id,
                        'es_encargado' => $miembro['es_encargado'] ?? false,
                        'estado' => true, // boolean: true para activo
                    ]);
                }
            }
        } else {
            // Horario general para todos los miembros
            $horarioGeneral = $data['horario_general'];
            
            // Crear un solo horario general
            $horario = $this->horarioRepository->crear([
                'fecha' => date('Y-m-d', strtotime($horarioGeneral['fecha'])),
                'hora_inicial' => date('H:i:s', strtotime($horarioGeneral['hora_inicial'])),
                'hora_final' => date('H:i:s', strtotime($horarioGeneral['hora_final'])),
                'estado' => 'ACTIVO',
            ]);
            
            // Asignar el mismo horario a todos los miembros
            foreach ($miembros as $miembro) {
                $this->comisionMiembroRepository->crear([
                    'comision_proceso_id' => $comisionProceso->id,
                    'miembro_cargo_id' => $miembro['miembro_cargo_id'],
                    'horario_id' => $horario->id,
                    'es_encargado' => $miembro['es_encargado'] ?? false,
                    'estado' => true, // boolean: true para activo
                ]);
            }
        }

        // Manejar aulas si se proporcionan
        if (isset($data['aulas']) && !empty($data['aulas'])) {
            foreach ($data['aulas'] as $aulaId) {
                $this->comisionAulaRepository->crear([
                    'comision_proceso_id' => $comisionProceso->id,
                    'aula_id' => $aulaId,
                    'estado' => 'ACTIVO',
                ]);
            }
        }

        Log::debug('Comisión proceso creada exitosamente con ID: ' . $comisionProceso->id);
        
        return $comisionProceso;
    }

    /**
     * Actualiza una comisión proceso completa con horarios y aulas.
     *
     * @param int $id
     * @param array $data
     * @return Model
     */
    public function updateCompleto(int $id, array $data): Model
    {
        Log::debug('Datos recibidos para actualizar comisión completa: ' . json_encode($data));

        // Obtener la comisión proceso existente
        $comisionProceso = $this->comisionProcesoRepository->obtenerPorId($id);
        if (!$comisionProceso) {
            throw new \Exception('Comisión proceso no encontrada');
        }

        // Actualizar datos básicos de la comisión proceso (excluyendo comision_id por seguridad)
        $comisionProcesoData = [
            'proceso_periodo_id' => $data['proceso_periodo_id'],
            'estado' => $data['estado'] ?? 'ABIERTO',
        ];
        
        // No permitir cambios en comision_id para evitar problemas de integridad
        if (isset($data['comision_id']) && $data['comision_id'] !== $comisionProceso->comision_id) {
            Log::warning("Intento de cambiar comision_id en actualización ignorado. ComisionProceso ID: {$id}");
        }
        
        $this->comisionProcesoRepository->actualizar($id, $comisionProcesoData);

        // Obtener datos actuales para comparar
        $miembrosActuales = $this->comisionMiembroRepository->obtenerPorComisionProceso($id);
        $aulasActuales = $this->comisionAulaRepository->obtenerPorComisionProceso($id);

        // Manejar actualización de miembros y horarios
        $miembrosNuevos = $data['miembros'] ?? [];
        $usaHorariosIndividuales = $data['usa_horarios_individuales'] ?? true;

        // Eliminar todos los miembros actuales (soft delete) para recrear
        foreach ($miembrosActuales as $miembroActual) {
            $this->comisionMiembroRepository->eliminar($miembroActual->id);
        }

        if ($usaHorariosIndividuales) {
            // Horarios individuales por miembro
            $horariosIndividuales = $data['horarios_individuales'] ?? [];
            
            foreach ($miembrosNuevos as $miembro) {
                $miembroId = $miembro['miembro_cargo_id'];
                $horarioData = null;
                
                // Buscar el horario correspondiente a este miembro
                foreach ($horariosIndividuales as $horario) {
                    if ($horario['miembro_id'] == $miembroId) {
                        $horarioData = $horario;
                        break;
                    }
                }
                
                if ($horarioData) {
                    // Crear horario individual
                    $horario = $this->horarioRepository->crear([
                        'fecha' => date('Y-m-d', strtotime($horarioData['fecha'])),
                        'hora_inicial' => date('H:i:s', strtotime($horarioData['hora_inicial'])),
                        'hora_final' => date('H:i:s', strtotime($horarioData['hora_final'])),
                        'estado' => 'ACTIVO',
                    ]);
                    
                    // Crear comision_miembro con horario individual
                    $this->comisionMiembroRepository->crear([
                        'comision_proceso_id' => $comisionProceso->id,
                        'miembro_cargo_id' => $miembroId,
                        'horario_id' => $horario->id,
                        'es_encargado' => $miembro['es_encargado'] ?? false,
                        'estado' => true, // boolean: true para activo
                    ]);
                }
            }
        } else {
            // Horario general para todos los miembros
            $horarioGeneral = $data['horario_general'];
            
            // Crear un solo horario general
            $horario = $this->horarioRepository->crear([
                'fecha' => date('Y-m-d', strtotime($horarioGeneral['fecha'])),
                'hora_inicial' => date('H:i:s', strtotime($horarioGeneral['hora_inicial'])),
                'hora_final' => date('H:i:s', strtotime($horarioGeneral['hora_final'])),
                'estado' => 'ACTIVO',
            ]);
            
            // Asignar el mismo horario a todos los miembros
            foreach ($miembrosNuevos as $miembro) {
                $this->comisionMiembroRepository->crear([
                    'comision_proceso_id' => $comisionProceso->id,
                    'miembro_cargo_id' => $miembro['miembro_cargo_id'],
                    'horario_id' => $horario->id,
                    'es_encargado' => $miembro['es_encargado'] ?? false,
                    'estado' => true, // boolean: true para activo
                ]);
            }
        }

        // Manejar actualización de aulas
        $aulasNuevas = $data['aulas'] ?? [];
        
        // Obtener IDs de aulas actuales y nuevas para comparar
        $aulasActualesIds = $aulasActuales->pluck('aula_id')->toArray();
        $aulasNuevasIds = is_array($aulasNuevas) ? $aulasNuevas : [];
        
        // Eliminar aulas que ya no están en la nueva lista
        $aulasAEliminar = array_diff($aulasActualesIds, $aulasNuevasIds);
        foreach ($aulasAEliminar as $aulaId) {
            $aulaComision = $aulasActuales->where('aula_id', $aulaId)->first();
            if ($aulaComision) {
                $this->comisionAulaRepository->eliminar($aulaComision->id);
            }
        }
        
        // Agregar aulas nuevas que no estaban antes
        $aulasAAgregar = array_diff($aulasNuevasIds, $aulasActualesIds);
        foreach ($aulasAAgregar as $aulaId) {
            $this->comisionAulaRepository->crear([
                'comision_proceso_id' => $comisionProceso->id,
                'aula_id' => $aulaId,
                'estado' => 'ACTIVO',
            ]);
        }

        Log::debug('Comisión proceso actualizada exitosamente con ID: ' . $comisionProceso->id);
        
        // Recargar el modelo actualizado
        return $this->comisionProcesoRepository->obtenerPorId($id);
    }

    /**
     * Actualiza una comisión existente.
     *
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function update(int $id, array $data): bool
    {
        // Extraer miembros_ids del array de datos
        $miembros_ids = $data['miembros_ids'];
        unset($data['miembros_ids']);
        
        // Actualizar la comisión
        $comisionProceso = $this->comisionProcesoRepository->actualizar($id, $data);

        // Obtener los miembros actuales de la comisión
        $comisionMiembros = $this->comisionMiembroRepository->obtenerMiembros($id);

        // Crear colecciones para comparación
        $miembrosActuales = collect($comisionMiembros)->pluck('miembro_cargo_id')->toArray();
        $nuevosmiembros = collect($miembros_ids);

        // Encontrar miembros a eliminar
        $miembrosAEliminar = array_diff($miembrosActuales, $nuevosmiembros->toArray());

        // Encontrar miembros a agregar
        $miembrosAAgregar = $nuevosmiembros->diff($miembrosActuales);

        // Eliminar miembros que ya no están en la lista
        foreach ($miembrosAEliminar as $miembroId) {
            $this->comisionMiembroRepository->eliminarPorComisionYMiembro($id, $miembroId);
        }

        // Agregar nuevos miembros
        foreach ($miembrosAAgregar as $miembroId) {
            $this->comisionMiembroRepository->crear([
                'comision_proceso_id' => $id,
                'miembro_cargo_id' => $miembroId,
            ]);
        }

        return $comisionProceso;
    }

    /**
     * Elimina una comisión existente.
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        return $this->comisionProcesoRepository->eliminar($id);
    }

    /**
     * Cambia el estado de un comision.
     *
     * @param int $id
     * @param string $estado
     * @return bool
     */
    public function cambiarEstado(int $id, string $estado): bool
    {
        return $this->comisionProcesoRepository->cambiarEstado($id, $estado);
    }

    /**
     * Obtiene el último ID de la tabla de comision procesos.
     *
     * @return int
     */
    public function obtenerUltimoId(): int
    {
        return $this->comisionProcesoRepository->obtenerUltimoId();
    }

    /**
     * Obtiene todos los comision procesos activos.
     *
     * @return Collection
     */
    public function obtenerActivos(): Collection
    {
        return $this->comisionProcesoRepository->obtenerActivos();
    }

    /**
     * Obtiene todos los comision procesos con selección de columnas específicas.
     *
     * @return Collection
     */
    public function obtenerConColumnas(): Collection
    {
        return $this->comisionProcesoRepository->obtenerTodosConColumnasEspecificas();
    }

    public function obtenerPaginado(array $criteria): LengthAwarePaginator
    {
        $comisionProcesoPag = $this->comisionProcesoRepository->obtenerPaginado($criteria);
        $comisionProcesoParse = $comisionProcesoPag->getCollection()->map(function ($comisionProceso) {
            $comisionMiembros = $this->comisionMiembroRepository->obtenerMiembros($comisionProceso->id);
            // Inicializa los arrays para nombres completos e IDs
            $miembrosNombres = [];
            // Recorre los miembros para obtener los nombres completos e IDs
            foreach ($comisionMiembros as $cm) {
                $miembrosNombres[] = $cm->miembroCargo->miembro->nombres . ' ' . $cm->miembroCargo->miembro->apellidos;
            }
            // Los miembros pueden tener el mismo horario o diferente, por lo que se obtiene los diferentes horarios
            // $horarios = $comisionMiembros->unique('horario_id');
            // // Si hay más de un horario, se muestra la cantidad de horarios

            $nroMiembros = $comisionMiembros->count();
            return [
                'id' => $comisionProceso->id,
                'comision_id' => $comisionProceso->comision_id,
                'comision' => $comisionProceso->comision->nombre,
                'nro_miembros' => $nroMiembros,
                'miembros' => $miembrosNombres,
                // 'fecha' => $this->convertirFecha(fecha: $comisionProceso->horario->fecha),
                // 'hora' => $comisionProceso->horario->hora,
                'periodo_id' => $comisionProceso->procesoPeriodo->periodo->id,
                'periodo' => $comisionProceso->procesoPeriodo->periodo->anio . ' - ' . $comisionProceso->procesoPeriodo->periodo->correlat_romano,
                'estado' => $comisionProceso->estado,
            ];
        }); 

        $comisionProcesoPag->setCollection($comisionProcesoParse);
        return $comisionProcesoPag;
    }

    public function obtenerConNombres(): Collection
    {
        return $this->comisionProcesoRepository->obtenerTodos()->map(function ($comision) {
            return [
                'id' => $comision->id,
                'descripcion' => $comision->descripcion,
            ];
        });
    }
}

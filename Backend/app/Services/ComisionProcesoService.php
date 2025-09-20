<?php

namespace App\Services;

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
    protected HorarioRepository $horarioRepository;

    public function __construct(ComisionProcesoRepository $comisionProcesoRepository, ComisionMiembroRepository $comisionMiembroRepository, ProcesoPeriodoRepository $procesoPeriodoRepository, HorarioRepository $horarioRepository)
    {
        $this->comisionMiembroRepository = $comisionMiembroRepository;
        $this->comisionProcesoRepository = $comisionProcesoRepository;
        $this->procesoPeriodoRepository = $procesoPeriodoRepository;
        $this->horarioRepository = $horarioRepository;
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
            'fecha' => $fecha,
            'hora_inicial' => $hora_inicial,
            'hora_final' => $hora_final,
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

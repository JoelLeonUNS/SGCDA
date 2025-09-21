<?php

namespace App\Repositories;

use App\Http\Enums\Estados;
use App\Models\ComisionMiembro;
use App\Models\MiembroCargo;
use App\Models\ProcesoPeriodo;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class ComisionMiembroRepository extends EstadoRepository
{

    public function __construct(ComisionMiembro $modelo)
    {
        parent::__construct($modelo);
    }

    /**
     * Obtiene todos las comision miembros con selección de columnas específicas.
     *
     * @return Collection
     */
    public function obtenerTodosConColumnasEspecificas(): Collection
    {
        return $this->modelo::select('id', 'descripcion', 'estado')->get();
    }

    public function obtenerMiembrosPorComision(int | null $comisionId = null): Collection
    {
        // Obtener el id del proceso actual
        $procesoActualId = ProcesoPeriodo::where('estado', Estados::ABIERTO)
        ->orderBy('fecha_final', 'desc')
        ->value('id');

        if (!$procesoActualId) {
            Log::error("No hay proceso actual activo");
            throw new \Exception('No hay ningún proceso activo. Debe existir al menos un proceso con estado ABIERTO en la tabla proceso_periodos.');
        }

        // Subconsulta: Obtener los miembro_cargos asignados en el proceso actual
        $miembroCargosAsignados = ComisionMiembro::join('comision_procesos', 'comision_miembros.comision_proceso_id', '=', 'comision_procesos.id')
            ->where('comision_procesos.proceso_periodo_id', $procesoActualId)
            ->pluck('comision_miembros.miembro_cargo_id')
            ->toArray();

        if ($comisionId === -1 || $comisionId === null) {
            // Obtener los miembros que NO están asignados a ninguna comisión del proceso actual
            return MiembroCargo::query()
                ->whereNotIn('miembro_cargos.id', empty($miembroCargosAsignados) ? [0] : $miembroCargosAsignados)
                ->join('miembros', 'miembro_cargos.miembro_id', '=', 'miembros.id')
                ->select(
                    'miembro_cargos.*', 
                    'miembros.nombres as miembro_nombres', 
                    'miembros.apellidos as miembro_apellidos', 
                    'miembros.dni as miembro_dni'
                )
                ->orderBy('miembros.id', 'asc')
                ->get();
        } else {
            // Obtener los miembros de una comisión específica del proceso actual
            // Si no hay miembros asignados a ninguna comisión, devolver colección vacía
            if (empty($miembroCargosAsignados)) {
                return new Collection();
            }
            
            return MiembroCargo::query()
                ->join('miembros', 'miembro_cargos.miembro_id', '=', 'miembros.id')
                ->join('comision_miembros', 'miembro_cargos.id', '=', 'comision_miembros.miembro_cargo_id')
                ->join('comision_procesos', 'comision_miembros.comision_proceso_id', '=', 'comision_procesos.id')
                ->where('comision_procesos.comision_id', $comisionId)
                ->where('comision_procesos.proceso_periodo_id', $procesoActualId)
                ->select(
                    'miembro_cargos.*', 
                    'miembros.nombres as miembro_nombres', 
                    'miembros.apellidos as miembro_apellidos', 
                    'miembros.dni as miembro_dni'
                )
                ->orderBy('miembros.id', 'asc')
                ->get();
        }
    }

    public function obtenerMiembros(int $comisionProcesoId): Collection
    {
        return $this->modelo::where('comision_proceso_id', $comisionProcesoId)->get();
    }

    /**
     * Obtiene todos los miembros de una comisión proceso específica.
     *
     * @param int $comisionProcesoId
     * @return Collection
     */
    public function obtenerPorComisionProceso(int $comisionProcesoId): Collection
    {
        return $this->modelo::where('comision_proceso_id', $comisionProcesoId)->get();
    }

    public function eliminarPorComisionYMiembro($comisionProcesoId, $miembroCargoId)
    {
        return $this->modelo::where('comision_proceso_id', $comisionProcesoId)
            ->where('miembro_cargo_id', $miembroCargoId)
            ->delete();
    }

    protected function aplicarRango(Builder $consulta, ?array $range): void
    {
        if ($range['field'] && $range['values']) {
            $consulta->join('comision_procesos', 'comision_miembros.comision_proceso_id', '=', 'comision_procesos.id')
            ->join('proceso_periodos', 'comision_procesos.proceso_periodo_id', '=', 'proceso_periodos.id')
            ->join('periodos', 'proceso_periodos.periodo_id', '=', 'periodos.id')
            ->join('procesos', 'proceso_periodos.proceso_id', '=', 'procesos.id')
            ->select('comision_miembros.*');

            if ($range['values']['start'] === $range['values']['end']) {
                $consulta->where($range['field'], $range['values']['start']);
            } else {
            $consulta->whereBetween($range['field'], [$range['values']['start'], $range['values']['end']]);
            }
        }
    }

    protected function aplicarFiltros(Builder $consulta, array $filtros): void
    {
        foreach ($filtros as $key => $value) {
            switch ($key) {
                case 'id':
                    $consulta->where('id', $value);
                    break;
                case 'comision':
                    $this->aplicarJoinCondicional($consulta, 'comision_procesos', 'comision_miembros.comision_proceso_id', 'comision_procesos.id');
                    $this->aplicarJoinCondicional($consulta, 'comisiones', 'comision_procesos.comision_id', 'comisiones.id');
                    $consulta->where('comisiones.nombre', $value);
                    break;
                case 'proceso':
                    $this->aplicarJoinCondicional($consulta, 'comision_procesos', 'comision_miembros.comision_proceso_id', 'comision_procesos.id');
                    $this->aplicarJoinCondicional($consulta, 'proceso_periodos', 'comision_procesos.proceso_periodo_id', 'proceso_periodos.id');
                    $this->aplicarJoinCondicional($consulta, 'procesos', 'proceso_periodos.proceso_id', 'procesos.id');
                    $consulta->where('procesos.nombre', $value);
                    break;
                case 'periodo':
                    $this->aplicarJoinCondicional($consulta, 'comision_procesos', 'comision_miembros.comision_proceso_id', 'comision_procesos.id');
                    $this->aplicarJoinCondicional($consulta, 'proceso_periodos', 'comision_procesos.proceso_periodo_id', 'proceso_periodos.id');
                    $this->aplicarJoinCondicional($consulta, 'periodos', 'proceso_periodos.periodo_id', 'periodos.id');
                    $consulta->where('periodos.periodo_numerico', $value);
                    break;
                default:
                    $consulta->where($key, $value);
                    break;
                }
        }
    }

    protected function aplicarBusqueda(Builder $consulta, ?string $searchTerm, ?string $searchColumn): void
    {
        if ($searchTerm && $searchColumn) {
            switch ($searchColumn) {
                case 'id':
                    $consulta->where('comision_miembros.id', 'like', '%' . $searchTerm . '%');
                    break;
                case 'comision':
                    $this->aplicarJoinCondicional($consulta, 'comision_procesos', 'comision_miembros.comision_proceso_id', 'comision_procesos.id');
                    $this->aplicarJoinCondicional($consulta, 'comisiones', 'comision_procesos.comision_id', 'comisiones.id');
                    $consulta->where('comisiones.nombre', 'like', '%' . $searchTerm . '%');
                    break;
                case 'proceso':
                    $this->aplicarJoinCondicional($consulta, 'comision_procesos', 'comision_miembros.comision_proceso_id', 'comision_procesos.id');
                    $this->aplicarJoinCondicional($consulta, 'proceso_periodos', 'comision_procesos.proceso_periodo_id', 'proceso_periodos.id');
                    $this->aplicarJoinCondicional($consulta, 'procesos', 'proceso_periodos.proceso_id', 'procesos.id');
                    $consulta->where('procesos.nombre', 'like', '%' . $searchTerm . '%');
                    break;
                case 'periodo':
                    $this->aplicarJoinCondicional($consulta, 'comision_procesos', 'comision_miembros.comision_proceso_id', 'comision_procesos.id');
                    $this->aplicarJoinCondicional($consulta, 'proceso_periodos', 'comision_procesos.proceso_periodo_id', 'proceso_periodos.id');
                    $this->aplicarJoinCondicional($consulta, 'periodos', 'proceso_periodos.periodo_id', 'periodos.id');
                    $consulta->where('periodos.periodo_numerico', 'like', '%' . $searchTerm . '%');
                    break;
                default:
                    $consulta->where($searchColumn, 'like', '%' . $searchTerm . '%');
                    break;
            }
        }
    }

    protected function aplicarOrdenamiento(Builder $consulta, ?string $sortField, ?string $sortOrder): void
    {
        if ($sortField && $sortOrder) {
            $consulta->orderBy($sortField, $sortOrder);
        }
    }

    /**
     * Obtiene registros incluyendo los eliminados
     */
    public function obtenerConEliminados(): Builder
    {
        return $this->modelo->withTrashed();
    }

    /**
     * Obtiene solo los registros eliminados
     */
    public function obtenerSoloEliminados(): Builder
    {
        return $this->modelo->onlyTrashed();
    }

    /**
     * Restaura un registro eliminado
     */
    public function restaurar(int $id): bool
    {
        $registro = $this->modelo->withTrashed()->find($id);
        return $registro ? $registro->restore() : false;
    }

    /**
     * Elimina permanentemente un registro
     */
    public function eliminarPermanentemente(int $id): bool
    {
        $registro = $this->modelo->withTrashed()->find($id);
        return $registro ? $registro->forceDelete() : false;
    }

    /**
     * Obtiene miembros de una comisión que no están asignados a ningún aula
     *
     * @param int $comisionProcesoId
     * @return \Illuminate\Support\Collection
     */
    public function obtenerMiembrosDisponiblesParaAula(int $comisionProcesoId): \Illuminate\Support\Collection
    {
        return $this->modelo::with([
            'miembroCargo.miembro',
            'miembroCargo.cargoEspecialidad.cargo'
        ])
        ->where('comision_proceso_id', $comisionProcesoId)
        ->whereNull('aula_id') // Solo miembros sin aula asignada
        ->where('estado', 1) // Solo miembros activos
        ->get()
        ->map(function ($comisionMiembro) {
            return [
                'id' => $comisionMiembro->id,
                'nombre' => $comisionMiembro->miembroCargo->miembro->nombres ?? '',
                'apellido' => $comisionMiembro->miembroCargo->miembro->apellidos ?? '',
                'dni' => $comisionMiembro->miembroCargo->miembro->dni ?? '',
                'cargo' => $comisionMiembro->miembroCargo->cargoEspecialidad->cargo->nombre ?? '',
                'miembro_cargo_id' => $comisionMiembro->miembro_cargo_id,
                'es_encargado' => false
            ];
        });
    }

    /**
     * Obtiene miembros asignados a un aula específica
     *
     * @param int $aulaId
     * @return \Illuminate\Support\Collection
     */
    public function obtenerMiembrosAsignadosAula(int $aulaId): \Illuminate\Support\Collection
    {
        return $this->modelo::with([
            'miembroCargo.miembro',
            'miembroCargo.cargoEspecialidad.cargo'
        ])
        ->where('aula_id', $aulaId)
        ->where('estado', 1) // Solo miembros activos
        ->get()
        ->map(function ($comisionMiembro) {
            return [
                'id' => $comisionMiembro->id,
                'nombre' => $comisionMiembro->miembroCargo->miembro->nombres ?? '',
                'apellido' => $comisionMiembro->miembroCargo->miembro->apellidos ?? '',
                'dni' => $comisionMiembro->miembroCargo->miembro->dni ?? '',
                'cargo' => $comisionMiembro->miembroCargo->cargoEspecialidad->cargo->nombre ?? '',
                'miembro_cargo_id' => $comisionMiembro->miembro_cargo_id,
                'es_encargado' => $comisionMiembro->es_encargado
            ];
        });
    }

    /**
     * Asigna miembros a un aula específica
     *
     * @param array $data
     * @return array
     */
    public function asignarMiembrosAula(array $data): array
    {
        $aulaId = $data['aula_id'];
        $comisionProcesoId = $data['comision_proceso_id'];
        $miembrosIds = $data['miembros_ids'];
        $encargadoId = $data['encargado_id'];

        // Primero, remover la asignación de aula de todos los miembros de esta comisión proceso para esta aula
        $this->modelo::where('comision_proceso_id', $comisionProcesoId)
            ->where('aula_id', $aulaId)
            ->update([
                'aula_id' => null,
                'es_encargado' => false
            ]);

        $asignados = 0;
        foreach ($miembrosIds as $miembroId) {
            // Determinar si este miembro es el encargado
            $esEncargado = ($miembroId == $encargadoId);

            // Asignar el miembro al aula
            $updated = $this->modelo::where('id', $miembroId)
                ->where('comision_proceso_id', $comisionProcesoId)
                ->update([
                    'aula_id' => $aulaId,
                    'es_encargado' => $esEncargado
                ]);

            if ($updated) {
                $asignados++;
            }
        }

        return [
            'mensaje' => "Se asignaron {$asignados} miembros al aula",
            'asignados' => $asignados,
            'aula_id' => $aulaId,
            'encargado_id' => $encargadoId
        ];
    }

    /**
     * Remueve miembros de un aula específica
     *
     * @param int $aulaId
     * @param array $miembrosIds
     * @return array
     */
    public function removerMiembrosAula(int $aulaId, array $miembrosIds): array
    {
        $removidos = $this->modelo::whereIn('id', $miembrosIds)
            ->where('aula_id', $aulaId)
            ->update([
                'aula_id' => null,
                'es_encargado' => false
            ]);

        return [
            'mensaje' => "Se removieron {$removidos} miembros del aula",
            'removidos' => $removidos
        ];
    }
}


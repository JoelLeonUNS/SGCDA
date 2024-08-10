<?php

namespace App\Repositories;

use App\Http\Enums\Estados;
use App\Models\ComisionMiembro;
use App\Models\MiembroCargo;
use App\Models\ProcesoPeriodo;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class MiembroCargoRepository extends EstadoRepository
{


    public function __construct(MiembroCargo $modelo)
    {
        parent::__construct($modelo);
    }

    /**
     * Obtiene todos los miembro cargos con selección de columnas específicas.
     *
     * @return Collection
     */
    public function obtenerTodosConColumnasEspecificas(): Collection
    {
        return $this->modelo::select('id', 'miembro_id', 'cargo_id', 'estado')->get();
    }

    public function obtenerMiembrosSinComision(): Builder
    {
        // Aquí obtenemos el id del proceso actual, puedes ajustar esto según tu lógica
        $procesoActualId = ProcesoPeriodo::where('estado', Estados::ABIERTO)->orderBy('fecha_final', 'desc')->value('proceso_id');

        // Subconsulta para obtener los miembro_cargos ya asignados a comisiones del proceso actual
        if ($procesoActualId) {
            $miembroCargosAsignados = ComisionMiembro::join('comision_procesos', 'comision_miembros.comision_proceso_id', '=', 'comision_procesos.id')
            ->where('comision_procesos.proceso_periodo_id', $procesoActualId)
            ->pluck('comision_miembros.miembro_cargo_id')
            ->toArray();
        } else {
            $miembroCargosAsignados = [0];
        }

        // Filtrar los miembro_cargos que no están en la lista de asignados
        return $this->modelo->query()->whereNotIn('id', $miembroCargosAsignados);
    }

    protected function aplicarRango(Builder $consulta, ?array $range): void
    {
        if ($range['field'] && $range['values']) {
            $consulta->join('comision_miembros', 'miembro_cargos.id', '=', 'comision_miembros.miembro_cargo_id')
            ->join('comision_procesos', 'comision_miembros.comision_proceso_id', '=', 'comision_procesos.id')
            ->join('proceso_periodos', 'comision_procesos.proceso_periodo_id', '=', 'proceso_periodos.id')
            ->join('periodos', 'proceso_periodos.periodo_id', '=', 'periodos.id')
            ->join('procesos', 'proceso_periodos.proceso_id', '=', 'procesos.id')
            ->select('miembro_cargos.*');

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
                    $consulta->where('miembro_cargos.id', $value);
                    break;
                case 'nombres':
                    $this->aplicarJoinCondicional($consulta, 'miembros', 'miembro_cargos.miembro_id', '=', 'miembros.id');
                    $consulta->where('miembros.nombres', $value);
                    break;
                case 'apellidos':
                    $this->aplicarJoinCondicional($consulta, 'miembros', 'miembro_cargos.miembro_id', '=', 'miembros.id');
                    $consulta->where('miembros.apellidos', $value);
                    break;
                case 'cargo':
                    $this->aplicarJoinCondicional($consulta, 'cargos', 'miembro_cargos.cargo_id', '=', 'cargos.id');
                    $consulta->where('cargos.descripcion', $value);
                    break;
                case 'proceso':
                    $this->aplicarJoinCondicional($consulta, 'comision_miembros', 'miembro_cargos.id', '=', 'comision_miembros.miembro_cargo_id');
                    $this->aplicarJoinCondicional($consulta, 'comision_procesos', 'comision_miembros.comision_proceso_id', '=', 'comision_procesos.id');
                    $this->aplicarJoinCondicional($consulta, 'proceso_periodos', 'comision_procesos.proceso_periodo_id', '=', 'proceso_periodos.id');
                    $this->aplicarJoinCondicional($consulta, 'procesos', 'proceso_periodos.proceso_id', '=', 'procesos.id');
                    $consulta->where('procesos.descripcion', $value);
                    break;
                case 'comision':
                    $this->aplicarJoinCondicional($consulta, 'comision_miembros', 'miembro_cargos.id', '=', 'comision_miembros.miembro_cargo_id');
                    $this->aplicarJoinCondicional($consulta, 'comision_procesos', 'comision_miembros.comision_proceso_id', '=', 'comision_procesos.id');
                    $this->aplicarJoinCondicional($consulta, 'comisiones', 'comision_procesos.comision_id', '=', 'comisiones.id');
                    $consulta->where('comisiones.descripcion', $value);
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
                    $consulta->where('miembro_cargos.id', 'like', $searchTerm);
                    break;
                case 'nombres':
                    $this->aplicarJoinCondicional($consulta,'miembros', 'miembro_cargos.miembro_id', '=', 'miembros.id');
                    $consulta->where('miembros.nombres', 'like', '%' . $searchTerm . '%');
                    break;
                case 'apellidos':
                    $this->aplicarJoinCondicional($consulta,'miembros', 'miembro_cargos.miembro_id', '=', 'miembros.id');
                    $consulta->where('miembros.apellidos', 'like', '%' . $searchTerm . '%');
                    break;
                case 'cargo':
                    $this->aplicarJoinCondicional($consulta,'cargos', 'miembro_cargos.cargo_id', '=', 'cargos.id');
                    $consulta->where('cargos.descripcion', 'like', '%' . $searchTerm . '%');
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
            switch ($sortField) {
                case 'nombres':
                    $consulta->join('miembros', 'miembro_cargos.miembro_id', '=', 'miembros.id')->select('miembro_cargos.*');
                    $consulta->orderBy('miembros.nombres', $sortOrder);
                    break;
                case 'apellidos':
                    $consulta->join('miembros', 'miembro_cargos.miembro_id', '=', 'miembros.id')->select('miembro_cargos.*');
                    $consulta->orderBy('miembros.apellidos', $sortOrder);
                    break;
                case 'cargo':
                    $consulta->join('cargos', 'miembro_cargos.cargo_id', '=', 'cargos.id')->select('miembro_cargos.*');
                    $consulta->orderBy('cargos.descripcion', $sortOrder);
                    break;
                default:
                    $consulta->orderBy($sortField, $sortOrder);
                    break;
            }
        }
    }


}


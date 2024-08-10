<?php

namespace App\Repositories;

use App\Models\ComisionMiembro;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

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

    public function obtenerMiembros(int $comisionProcesoId): Collection
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
                    $consulta->where('comisiones.descripcion', $value);
                    break;
                case 'proceso':
                    $this->aplicarJoinCondicional($consulta, 'comision_procesos', 'comision_miembros.comision_proceso_id', 'comision_procesos.id');
                    $this->aplicarJoinCondicional($consulta, 'proceso_periodos', 'comision_procesos.proceso_periodo_id', 'proceso_periodos.id');
                    $this->aplicarJoinCondicional($consulta, 'procesos', 'proceso_periodos.proceso_id', 'procesos.id');
                    $consulta->where('procesos.descripcion', $value);
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
                    $consulta->where('comisiones.descripcion', 'like', '%' . $searchTerm . '%');
                    break;
                case 'proceso':
                    $this->aplicarJoinCondicional($consulta, 'comision_procesos', 'comision_miembros.comision_proceso_id', 'comision_procesos.id');
                    $this->aplicarJoinCondicional($consulta, 'proceso_periodos', 'comision_procesos.proceso_periodo_id', 'proceso_periodos.id');
                    $this->aplicarJoinCondicional($consulta, 'procesos', 'proceso_periodos.proceso_id', 'procesos.id');
                    $consulta->where('procesos.descripcion', 'like', '%' . $searchTerm . '%');
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


}


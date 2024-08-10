<?php

namespace App\Repositories;

use App\Http\Enums\Estados;
use App\Models\ProcesoPeriodo;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Log;

class ProcesoPeriodoRepository extends EstadoRepository
{

    public function __construct(ProcesoPeriodo $modelo)
    {
        parent::__construct($modelo);
    }

    public function obtenerProcesoPeriodoActual(): ProcesoPeriodo|null
    {
        return $this->modelo->where('estado', Estados::ABIERTO)->orderBy('fecha_final', 'desc')->first();
    }

    /**
     * Obtiene todos los proceso cargos con selección de columnas específicas.
     *
     * @return Collection
     */
    public function obtenerTodosConColumnasEspecificas(): Collection
    {
        return $this->modelo::select('id', 'descripcion', 'estado')->get();
    }

    public function buscarOCrear(array $procesoPeriodo): ProcesoPeriodo
    {
        return $this->modelo->firstOrCreate($procesoPeriodo);
    }

    protected function aplicarRango(Builder $consulta, ?array $range): void
    {
        if ($range['field'] && $range['values']) {
            $consulta->join('periodos', 'proceso_periodos.periodo_id', '=', 'periodos.id')
            ->join('procesos', 'proceso_periodos.proceso_id', '=', 'procesos.id')
            ->select('proceso_periodos.*');
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
                    $consulta->where('proceso_periodos.id', $value);
                    break;
                case 'proceso':
                    $this->aplicarJoinCondicional($consulta, 'procesos', 'proceso_periodos.proceso_id', '=', 'procesos.id');
                    $consulta->where('procesos.descripcion', $value);
                    break;
                case 'periodo_numerico':
                    $this->aplicarJoinCondicional($consulta, 'periodos', 'proceso_periodos.periodo_id', '=', 'periodos.id');
                    $consulta->where('periodos.periodo_numerico', $value);
                    break;
                case 'estado':
                    $consulta->where('proceso_periodos.estado', $value);
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
            $consulta->where($searchColumn, 'like', '%' . $searchTerm . '%');
        }
    }

    protected function aplicarOrdenamiento(Builder $consulta, ?string $sortField, ?string $sortOrder): void
    {
        if ($sortField && $sortOrder) {
            $consulta->orderBy($sortField, $sortOrder);
        }
    }


}


<?php

namespace App\Repositories;

use App\Models\ProcesoPeriodo;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class ProcesoPeriodoRepository extends EstadoRepository
{

    public function __construct(ProcesoPeriodo $modelo)
    {
        parent::__construct($modelo);
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

    protected function aplicarFiltros(Builder $consulta, array $filtros): void
    {
        foreach ($filtros as $key => $value) {
            $consulta->where($key, $value);
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


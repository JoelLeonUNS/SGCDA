<?php

namespace App\Repositories;

use App\Models\Periodo;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class PeriodoRepository extends EstadoRepository
{

    public function __construct(Periodo $modelo)
    {
        parent::__construct($modelo);
    }

    /**
     * Obtiene todos los periodos con selección de columnas específicas.
     *
     * @return Collection
     */
    public function obtenerTodosConColumnasEspecificas(): Collection
    {
        return $this->modelo::select('id', 'descripcion', 'estado')->get();
    }

    public function crearYObtenerId(array $periodo): int|null
    {
        return $this->modelo->insertGetId($periodo);
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


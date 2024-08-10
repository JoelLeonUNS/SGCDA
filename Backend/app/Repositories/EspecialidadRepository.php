<?php

namespace App\Repositories;

use App\Models\Especialidad;
use Illuminate\Database\Eloquent\Builder;

class EspecialidadRepository extends EstadoRepository
{

    public function __construct(Especialidad $modelo)
    {
        parent::__construct($modelo);
    }

    protected function aplicarRango(Builder $consulta, ?array $range): void
    {
        if ($range) {
            $consulta->whereBetween($range['key'], $range['bounds']);
        }
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


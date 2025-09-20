<?php

namespace App\Repositories;

use App\Models\CargoEspecialidad;
use Illuminate\Database\Eloquent\Builder;

class CargoEspecialidadRepository extends EstadoRepository
{

    public function __construct(CargoEspecialidad $modelo)
    {
        parent::__construct($modelo);
    }

    public function insertarBuscarId(array $datos): int
    {
        $cargoEspecialidad = $this->modelo->firstOrCreate($datos);
        return $cargoEspecialidad->id;
    }

    protected function aplicarRango(Builder $consulta, ?array $range): void
    {
        if ($range['field'] && $range['values']) {
            $consulta->whereBetween($range['field'], [$range['values']['start'], $range['values']['end']]);
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


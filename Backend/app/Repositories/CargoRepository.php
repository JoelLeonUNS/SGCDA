<?php

namespace App\Repositories;

use App\Models\Cargo;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class CargoRepository extends EstadoRepository
{

    public function __construct(Cargo $modelo)
    {
        parent::__construct($modelo);
    }

    /**
     * Obtiene todos los miembros con selección de columnas específicas.
     *
     * @return Collection
     */
    public function obtenerTodosConColumnasEspecificas(): Collection
    {
        return $this->modelo::select('id', 'descripcion', 'estado')->get();
    }

    public function crearYObtenerId(array $cargo): int|null
    {
        return $this->modelo->insertGetId($cargo);
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


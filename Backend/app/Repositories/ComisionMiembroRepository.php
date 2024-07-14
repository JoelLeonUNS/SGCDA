<?php

namespace App\Repositories;

use App\Models\ComisionMiembro;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

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

    public function obtenerNroMiembros(int $comisionProcesoId): int
    {
        return $this->modelo::where('comision_proceso_id', $comisionProcesoId)->count();
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


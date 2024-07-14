<?php

namespace App\Repositories;

use App\Models\MiembroCargo;
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
        return $this->modelo::select('id', 'descripcion', 'estado')->get();
    }

    protected function aplicarFiltros(Builder $consulta, array $filtros): void
    {
        foreach ($filtros as $key => $value) {
            switch ($key) {
                case 'id':
                    $consulta->where('miembro_cargos.id', $value);
                    break;
                case 'nombres':
                    $consulta->join('miembros', 'miembro_cargos.miembro_id', '=', 'miembros.id')->select('miembro_cargos.*');
                    $consulta->where('miembros.nombres', $value);
                    break;
                case 'apellidos':
                    $consulta->join('miembros', 'miembro_cargos.miembro_id', '=', 'miembros.id')->select('miembro_cargos.*');
                    $consulta->where('miembros.apellidos', $value);
                    break;
                case 'cargo':
                    $consulta->join('cargos', 'miembro_cargos.cargo_id', '=', 'cargos.id')->select('miembro_cargos.*');
                    $consulta->where('cargos.descripcion', $value);
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
                    $consulta->join('miembros', 'miembro_cargos.miembro_id', '=', 'miembros.id')->select('miembro_cargos.*');
                    $consulta->where('miembros.nombres', 'like', '%' . $searchTerm . '%');
                    break;
                case 'apellidos':
                    $consulta->join('miembros', 'miembro_cargos.miembro_id', '=', 'miembros.id')->select('miembro_cargos.*');
                    $consulta->where('miembros.apellidos', 'like', '%' . $searchTerm . '%');
                    break;
                case 'cargo':
                    $consulta->join('cargos', 'miembro_cargos.cargo_id', '=', 'cargos.id')->select('miembro_cargos.*');
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


<?php

namespace App\Repositories;

use App\Http\Enums\Estados;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\Rules\Enum;

abstract class EstadoRepository extends BaseRepository
{
    public function __construct(Model $modelo)
    {
        parent::__construct($modelo);
    }
    
    /**
     * Cambia el estado de un registro.
     *
     * @param int $id
     * @param string $estado
     * @return bool
     */
    public function cambiarEstado(int $id, string $estado): bool
    {
        $modelo = $this->obtenerPorId($id);
        if ($modelo) {
            $estadoEnum = Estados::fromValue($estado);
            if ($estadoEnum === null) {
                throw new \InvalidArgumentException('Estado no válido');
            }
            $modelo->estado = $estadoEnum;
            return $modelo->save();
        }
        return false;
    }

    /**
     * Obtiene los registros activos.
     *
     * @return Collection
     */
    public function obtenerActivos(): Collection
    {
        return $this->modelo->where('estado', 1)->get();
    }

    /**
     * Obtiene los registros que no estén eliminados.
     * 
     * @return Collection
     */
    public function obtenerNoEliminados(): Collection
    {
        return $this->modelo->where('estado', '!=', Estados::ELIMINADO)->get();
    }

}

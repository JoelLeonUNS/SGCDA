<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

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
     * @param int $estado
     * @return bool
     */
    public function cambiarEstado(int $id, int $estado): bool
    {
        $modelo = $this->obtenerPorId($id);
        if ($modelo) {
            $modelo->estado = $estado;
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

}

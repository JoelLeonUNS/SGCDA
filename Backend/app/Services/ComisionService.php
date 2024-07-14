<?php

namespace App\Services;

use App\Repositories\ComisionRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

class ComisionService
{
    protected ComisionRepository $comisionRepository;

    public function __construct(ComisionRepository $comisionRepository)
    {
        $this->comisionRepository = $comisionRepository;
    }

    /**
     * Obtiene todos los comisiones.
     *
     * @return Collection
     */
    public function getAll(): Collection
    {
        return $this->comisionRepository->obtenerTodos();
    }

    /**
     * Obtiene una comisión por su ID.
     *
     * @param int $id
     * @return Model
     */
    public function getById(int $id): Model
    {
        return $this->comisionRepository->obtenerPorId($id);
    }

    /**
     * Crea un nuevo comision.
     *
     * @param array $data
     * @return Model
     */
    public function create(array $data): Model
    {
        return $this->comisionRepository->crear($data);
    }

    /**
     * Actualiza una comisión existente.
     *
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function update(int $id, array $data): bool
    {
        return $this->comisionRepository->actualizar($id, $data);
    }

    /**
     * Elimina una comisión existente.
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        return $this->comisionRepository->eliminar($id);
    }

    /**
     * Cambia el estado de un comision.
     *
     * @param int $id
     * @param int $estado
     * @return bool
     */
    public function cambiarEstado(int $id, int $estado): bool
    {
        return $this->comisionRepository->cambiarEstado($id, $estado);
    }

    /**
     * Obtiene el último ID de la tabla de comisiones.
     *
     * @return int
     */
    public function obtenerUltimoId(): int
    {
        return $this->comisionRepository->obtenerUltimoId();
    }

    /**
     * Obtiene el último comision.
     *
     * @return Model
     */
    public function obtenerUltimo(): Model
    {
        return $this->comisionRepository->obtenerUltimo();
    }

    /**
     * Obtiene todos los comisiones activos.
     *
     * @return Collection
     */
    public function obtenerActivos(): Collection
    {
        return $this->comisionRepository->obtenerActivos();
    }

    /**
     * Obtiene todos los comisiones con selección de columnas específicas.
     *
     * @return Collection
     */
    public function obtenerConColumnas(): Collection
    {
        return $this->comisionRepository->obtenerTodosConColumnasEspecificas();
    }

    public function obtenerPaginado(array $criteria): LengthAwarePaginator
    {
        return $this->comisionRepository->obtenerPaginado($criteria);
    }

    public function obtenerConNombres(): Collection
    {
        return $this->comisionRepository->obtenerTodos()->map(function ($comision) {
            return [
                'id' => $comision->id,
                'descripcion' => $comision->descripcion,
            ];
        });
    }
}

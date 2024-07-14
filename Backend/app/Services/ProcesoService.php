<?php

namespace App\Services;

use App\Repositories\ProcesoRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

class ProcesoService
{
    protected ProcesoRepository $procesoRepository;

    public function __construct(ProcesoRepository $procesoRepository)
    {
        $this->procesoRepository = $procesoRepository;
    }

    /**
     * Obtiene todos los procesos.
     *
     * @return Collection
     */
    public function getAll(): Collection
    {
        return $this->procesoRepository->obtenerTodos();
    }

    /**
     * Obtiene una proceso por su ID.
     *
     * @param int $id
     * @return Model
     */
    public function getById(int $id): Model
    {
        return $this->procesoRepository->obtenerPorId($id);
    }

    /**
     * Crea un nuevo proceso.
     *
     * @param array $data
     * @return Model
     */
    public function create(array $data): Model
    {
        return $this->procesoRepository->crear($data);
    }

    /**
     * Actualiza una proceso existente.
     *
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function update(int $id, array $data): bool
    {
        return $this->procesoRepository->actualizar($id, $data);
    }

    /**
     * Elimina una proceso existente.
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        return $this->procesoRepository->eliminar($id);
    }

    /**
     * Cambia el estado de un proceso.
     *
     * @param int $id
     * @param int $estado
     * @return bool
     */
    public function cambiarEstado(int $id, int $estado): bool
    {
        return $this->procesoRepository->cambiarEstado($id, $estado);
    }

    /**
     * Obtiene el último ID de la tabla de procesos.
     *
     * @return int
     */
    public function obtenerUltimoId(): int
    {
        return $this->procesoRepository->obtenerUltimoId();
    }

    /**
     * Obtiene el último proceso.
     *
     * @return Model
     */
    public function obtenerUltimo(): Model
    {
        return $this->procesoRepository->obtenerUltimo();
    }

    /**
     * Obtiene todos los procesos activos.
     *
     * @return Collection
     */
    public function obtenerActivos(): Collection
    {
        return $this->procesoRepository->obtenerActivos();
    }

    /**
     * Obtiene todos los procesos con selección de columnas específicas.
     *
     * @return Collection
     */
    public function obtenerConColumnas(): Collection
    {
        return $this->procesoRepository->obtenerTodosConColumnasEspecificas();
    }

    public function obtenerPaginado(array $criteria): LengthAwarePaginator
    {
        return $this->procesoRepository->obtenerPaginado($criteria);
    }

    public function obtenerConNombres(): Collection
    {
        return $this->procesoRepository->obtenerTodos()->map(function ($proceso) {
            return [
                'id' => $proceso->id,
                'descripcion' => $proceso->descripcion,
            ];
        });
    }
}

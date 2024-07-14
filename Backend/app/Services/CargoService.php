<?php

namespace App\Services;

use App\Repositories\CargoRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

class CargoService
{
    protected CargoRepository $cargoRepository;

    public function __construct(CargoRepository $cargoRepository)
    {
        $this->cargoRepository = $cargoRepository;
    }

    /**
     * Obtiene todos los cargoes.
     *
     * @return Collection
     */
    public function getAll(): Collection
    {
        return $this->cargoRepository->obtenerTodos();
    }

    /**
     * Obtiene una cargo por su ID.
     *
     * @param int $id
     * @return Model
     */
    public function getById(int $id): Model
    {
        return $this->cargoRepository->obtenerPorId($id);
    }

    /**
     * Crea un nuevo cargo.
     *
     * @param array $data
     * @return Model
     */
    public function create(array $data): Model
    {
        return $this->cargoRepository->crear($data);
    }

    /**
     * Actualiza una cargo existente.
     *
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function update(int $id, array $data): bool
    {
        return $this->cargoRepository->actualizar($id, $data);
    }

    /**
     * Elimina una cargo existente.
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        return $this->cargoRepository->eliminar($id);
    }

    /**
     * Cambia el estado de un cargo.
     *
     * @param int $id
     * @param int $estado
     * @return bool
     */
    public function cambiarEstado(int $id, int $estado): bool
    {
        return $this->cargoRepository->cambiarEstado($id, $estado);
    }

    /**
     * Obtiene el último ID de la tabla de cargos.
     *
     * @return int
     */
    public function obtenerUltimoId(): int
    {
        return $this->cargoRepository->obtenerUltimoId();
    }

    /**
     * Obtiene todos los cargos activos.
     *
     * @return Collection
     */
    public function obtenerActivos(): Collection
    {
        return $this->cargoRepository->obtenerActivos();
    }

    /**
     * Obtiene todos los cargos con selección de columnas específicas.
     *
     * @return Collection
     */
    public function obtenerConColumnas(): Collection
    {
        return $this->cargoRepository->obtenerTodosConColumnasEspecificas();
    }

    public function obtenerPaginado(array $criteria): LengthAwarePaginator
    {
        return $this->cargoRepository->obtenerPaginado($criteria);
    }

    public function obtenerConNombres(): Collection
    {
        return $this->cargoRepository->obtenerTodos()->map(function ($cargo) {
            return [
                'id' => $cargo->id,
                'descripcion' => $cargo->descripcion,
            ];
        });
    }
}

<?php

namespace App\Services;

use App\Repositories\MiembroRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

class MiembroService
{
    protected MiembroRepository $miembroRepository;

    public function __construct(MiembroRepository $miembroRepository)
    {
        $this->miembroRepository = $miembroRepository;
    }

    /**
     * Obtiene todos los miembros.
     *
     * @return Collection
     */
    public function getAll(): Collection
    {
        return $this->miembroRepository->obtenerTodos();
    }

    /**
     * Obtiene un miembro por su ID.
     *
     * @param int $id
     * @return Model
     */
    public function getById(int $id): Model
    {
        return $this->miembroRepository->obtenerPorId($id);
    }

    /**
     * Crea un nuevo miembro.
     *
     * @param array $data
     * @return Model
     */
    public function create(array $data): Model
    {
        return $this->miembroRepository->crear($data);
    }

    /**
     * Actualiza un miembro existente.
     *
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function update(int $id, array $data): bool
    {
        return $this->miembroRepository->actualizar($id, $data);
    }

    /**
     * Elimina un miembro existente.
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        return $this->miembroRepository->eliminar($id);
    }

    /**
     * Cambia el estado de un miembro.
     *
     * @param int $id
     * @param int $estado
     * @return bool
     */
    public function cambiarEstado(int $id, int $estado): bool
    {
        return $this->miembroRepository->cambiarEstado($id, $estado);
    }

    /**
     * Obtiene el último ID de la tabla de miembros.
     *
     * @return int
     */
    public function obtenerUltimoId(): int
    {
        return $this->miembroRepository->obtenerUltimoId();
    }

    /**
     * Obtiene todos los miembros activos.
     *
     * @return Collection
     */
    public function obtenerActivos(): Collection
    {
        return $this->miembroRepository->obtenerActivos();
    }

    /**
     * Obtiene todos los miembros con selección de columnas específicas.
     *
     * @return Collection
     */
    public function obtenerMiembroConColumnas(): Collection
    {
        return $this->miembroRepository->obtenerTodosConColumnasEspecificas();
    }

    public function obtenerPaginado(array $criteria): LengthAwarePaginator
    {
        return $this->miembroRepository->obtenerPaginado($criteria);
    }

    public function obtenerConNombres(): Collection
    {
        return $this->miembroRepository->obtenerTodos()->map(function ($miembro) {
            return [
                'id' => $miembro->id,
                'nombres' => $miembro->nombres,
                'apellidos' => $miembro->apellidos,
            ];
        });
    }
}

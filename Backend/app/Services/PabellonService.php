<?php

namespace App\Services;

use App\Repositories\PabellonRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

class PabellonService
{
    protected PabellonRepository $pabellonRepository;

    public function __construct(PabellonRepository $pabellonRepository)
    {
        $this->pabellonRepository = $pabellonRepository;
    }

    /**
     * Obtiene todos los pabellones.
     *
     * @return Collection
     */
    public function getAll(): Collection
    {
        return $this->pabellonRepository->obtenerTodos();
    }

    /**
     * Obtiene un pabellón por su ID.
     *
     * @param int $id
     * @return Model
     */
    public function getById(int $id): Model
    {
        return $this->pabellonRepository->obtenerPorId($id);
    }

    /**
     * Crea un nuevo miembro.
     *
     * @param array $data
     * @return Model
     */
    public function create(array $data): Model
    {
        return $this->pabellonRepository->crear($data);
    }

    /**
     * Actualiza un pabellón existente.
     *
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function update(int $id, array $data): bool
    {
        return $this->pabellonRepository->actualizar($id, $data);
    }

    /**
     * Elimina un pabellón existente.
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        return $this->pabellonRepository->eliminar($id);
    }

    /**
     * Cambia el estado de un pabellón.
     *
     * @param int $id
     * @param int $estado
     * @return bool
     */
    public function cambiarEstado(int $id, int $estado): bool
    {
        return $this->pabellonRepository->cambiarEstado($id, $estado);
    }

    /**
     * Obtiene el último ID de la tabla de pabellones.
     *
     * @return int
     */
    public function obtenerUltimoId(): int
    {
        return $this->pabellonRepository->obtenerUltimoId();
    }

    /**
     * Obtiene el último pabellón registrado.
     *
     * @return Model
     */
    public function obtenerUltimo(): Model
    {
        return $this->pabellonRepository->obtenerUltimo();
    }

    /**
     * Obtiene todos los pabellones activos.
     *
     * @return Collection
     */
    public function obtenerActivos(): Collection
    {
        return $this->pabellonRepository->obtenerActivos();
    }

    /**
     * Obtiene todos los pabellones con selección de columnas específicas.
     *
     * @return Collection
     */
    public function obtenerConColumnas(): Collection
    {
        return $this->pabellonRepository->obtenerTodosConColumnasEspecificas();
    }

    public function obtenerPaginado(array $criteria): LengthAwarePaginator
    {
        return $this->pabellonRepository->obtenerPaginado($criteria);
    }

    public function obtenerConNombres(): Collection
    {
        return $this->pabellonRepository->obtenerTodos()->map(function ($pabellon) {
            return [
                'id' => $pabellon->id,
                'pabellon' => $pabellon->descripcion,
            ];
        });
    }
}

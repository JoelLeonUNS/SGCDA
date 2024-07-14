<?php

namespace App\Services;

use App\Repositories\ProcesoPeriodoRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

class ProcesoPeriodoService
{

    protected ProcesoPeriodoRepository $procesoPeriodoRepository;

    public function __construct(ProcesoPeriodoRepository $procesoPeriodoRepository)
    {
        $this->procesoPeriodoRepository = $procesoPeriodoRepository;
    }

    /**
     * Obtiene todos los proceso periodos.
     *
     * @return Collection
     */
    public function getAll(): Collection
    {
        return $this->procesoPeriodoRepository->obtenerTodos();
    }

    /**
     * Obtiene un miembro por su ID.
     *
     * @param int $id
     * @return Model
     */
    public function getById(int $id): Model
    {
        return $this->procesoPeriodoRepository->obtenerPorId($id);
    }

    /**
     * Crea un nuevo miembro.
     *
     * @param array $data
     * @return Model
     */
    public function create(array $data): Model
    {
        return $this->procesoPeriodoRepository->crear($data);
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
        return $this->procesoPeriodoRepository->actualizar($id, $data);
    }

    /**
     * Elimina un proceso periodo existente.
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        return $this->procesoPeriodoRepository->eliminar($id);
    }

    /**
     * Cambia el estado de un proceso periodo.
     *
     * @param int $id
     * @param int $estado
     * @return bool
     */
    public function cambiarEstado(int $id, int $estado): bool
    {
        return $this->procesoPeriodoRepository->cambiarEstado($id, $estado);
    }

    /**
     * Obtiene el último ID de la tabla de proceso periodos.
     *
     * @return int
     */
    public function obtenerUltimoId(): int
    {
        return $this->procesoPeriodoRepository->obtenerUltimoId();
    }

    /**
     * Obtiene todos los proceso periodos activos.
     *
     * @return Collection
     */
    public function obtenerActivos(): Collection
    {
        return $this->procesoPeriodoRepository->obtenerActivos();
    }

    /**
     * Obtiene todos los proceso periodos con selección de columnas específicas.
     *
     * @return Collection
     */
    public function obtenerConColumnas(): Collection
    {
        return $this->procesoPeriodoRepository->obtenerTodosConColumnasEspecificas();
    }

    public function obtenerPaginado(array $criteria): LengthAwarePaginator
    {
        return  $this->procesoPeriodoRepository->obtenerPaginado($criteria);
    }

    public function obtenerConNombres(): Collection
    {
        return $this->procesoPeriodoRepository->obtenerTodos()->map(function ($procesoPeriodo) {
            return [
                'id' => $procesoPeriodo->id,
                'proceso_id' => $procesoPeriodo->proceso_id,
                'periodo_id' => $procesoPeriodo->periodo_id,
            ];
        });
    }
}

<?php

namespace App\Services;

use App\Repositories\EspecialidadRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

class EspecialidadService
{
    protected EspecialidadRepository $especialidadRepository;

    public function __construct(EspecialidadRepository $especialidadRepository)
    {
        $this->especialidadRepository = $especialidadRepository;
    }

    /**
     * Obtiene todos las especialidades.
     *
     * @return Collection
     */
    public function getAll(): Collection
    {
        return $this->especialidadRepository->obtenerTodos();
    }

    /**
     * Obtiene una especialidad por su ID.
     *
     * @param int $id
     * @return Model
     */
    public function getById(int $id): Model
    {
        return $this->especialidadRepository->obtenerPorId($id);
    }

    /**
     * Crea un nuevo miembro.
     *
     * @param array $data
     * @return Model
     */
    public function create(array $data): Model
    {
        return $this->especialidadRepository->crear($data);
    }

    /**
     * Actualiza una especialidad existente.
     *
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function update(int $id, array $data): bool
    {
        return $this->especialidadRepository->actualizar($id, $data);
    }

    /**
     * Elimina una especialidad existente.
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        return $this->especialidadRepository->eliminar($id);
    }

    /**
     * Cambia el estado de una especialidad.
     *
     * @param int $id
     * @param string $estado
     * @return bool
     */
    public function cambiarEstado(int $id, string $estado): bool
    {
        return $this->especialidadRepository->cambiarEstado($id, $estado);
    }

    /**
     * Obtiene el último ID de la tabla de especialidades.
     *
     * @return int
     */
    public function obtenerUltimoId(): int
    {
        return $this->especialidadRepository->obtenerUltimoId();
    }

    /**
     * Obtiene el última especialidad registrado.
     *
     * @return Model
     */
    public function obtenerUltimo(): Model
    {
        return $this->especialidadRepository->obtenerUltimo();
    }

    /**
     * Obtiene todos las especialidades activos.
     *
     * @return Collection
     */
    public function obtenerActivos(): Collection
    {
        return $this->especialidadRepository->obtenerActivos();
    }

    public function obtenerPaginado(array $criteria): LengthAwarePaginator
    {
        return $this->especialidadRepository->obtenerPaginado($criteria);
    }

}

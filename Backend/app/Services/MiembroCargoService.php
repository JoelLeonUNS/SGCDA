<?php

namespace App\Services;

use App\Repositories\MiembroCargoRepository;
use App\Repositories\MiembroRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

class MiembroCargoService
{
    protected MiembroRepository $miembroRepository;
    protected MiembroCargoRepository $miembroCargoRepository;

    public function __construct(MiembroCargoRepository $miembroCargoRepository, MiembroRepository $miembroRepository)
    {
        $this->miembroCargoRepository = $miembroCargoRepository;
        $this->miembroRepository = $miembroRepository;
    }

    /**
     * Obtiene todos los miembros.
     *
     * @return Collection
     */
    public function getAll(): Collection
    {
        return $this->miembroCargoRepository->obtenerTodos();
    }

    /**
     * Obtiene un miembro por su ID.
     *
     * @param int $id
     * @return Model
     */
    public function getById(int $id): Model
    {
        return $this->miembroCargoRepository->obtenerPorId($id);
    }

    /**
     * Crea un nuevo miembro.
     *
     * @param array $data
     * @return Model
     */
    public function create(array $data): Model
    {
        $miembro = [
            'nombres' => $data['nombres'],
            'apellidos' => $data['apellidos'],
        ];
        $nuevoMiembroId = $this->miembroRepository->crearYObtenerId($miembro);
        $miembroCargo = [
            'miembro_id' => $nuevoMiembroId,
            'cargo_id' => $data['cargo_id'],
        ];
        return $this->miembroCargoRepository->crear($miembroCargo);
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
        return $this->miembroCargoRepository->actualizar($id, $data);
    }

    /**
     * Elimina un miembro existente.
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        return $this->miembroCargoRepository->eliminar($id);
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
        return $this->miembroCargoRepository->cambiarEstado($id, $estado);
    }

    /**
     * Obtiene el último ID de la tabla de miembros.
     *
     * @return int
     */
    public function obtenerUltimoId(): int
    {
        return $this->miembroCargoRepository->obtenerUltimoId();
    }

    /**
     * Obtiene todos los miembros activos.
     *
     * @return Collection
     */
    public function obtenerActivos(): Collection
    {
        return $this->miembroCargoRepository->obtenerActivos();
    }

    /**
     * Obtiene todos los miembros con selección de columnas específicas.
     *
     * @return Collection
     */
    public function obtenerMiembroConColumnas(): Collection
    {
        return $this->miembroCargoRepository->obtenerTodosConColumnasEspecificas();
    }

    public function obtenerPaginado(array $criteria): LengthAwarePaginator
    {
        return $this->miembroCargoRepository->obtenerPaginado($criteria);
    }

    public function obtenerConNombres(): Collection
    {
        return $this->miembroCargoRepository->obtenerTodos()->map(function ($miembroCargo) {
            return [
                'id' => $miembroCargo->id,
                'miembro_id' => $miembroCargo->miembro_id,
                'nombres' => $miembroCargo->miembro->nombres,
                'apellidos' => $miembroCargo->miembro->apellidos,
                'cargo_id' => $miembroCargo->cargo_id,
                'cargo' => $miembroCargo->cargo->nombre ?? 'Sin cargo asignado',
            ];
        });
    }
}

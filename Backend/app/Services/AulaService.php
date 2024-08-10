<?php

namespace App\Services;

use App\Repositories\AulaRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

class AulaService
{
    protected AulaRepository $aulaRepository;

    public function __construct(AulaRepository $aulaRepository)
    {
        $this->aulaRepository = $aulaRepository;
    }

    /**
     * Obtiene todos las aulas.
     *
     * @return Collection
     */
    public function getAll(): Collection
    {
        return $this->aulaRepository->obtenerTodos();
    }

    /**
     * Obtiene una aula por su ID.
     *
     * @param int $id
     * @return Model
     */
    public function getById(int $id): Model
    {
        return $this->aulaRepository->obtenerPorId($id);
    }

    /**
     * Crea un nuevo miembro.
     *
     * @param array $data
     * @return Model
     */
    public function create(array $data): Model
    {
        return $this->aulaRepository->crear($data);
    }

    /**
     * Actualiza una aula existente.
     *
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function update(int $id, array $data): bool
    {
        return $this->aulaRepository->actualizar($id, $data);
    }

    /**
     * Elimina una aula existente.
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        return $this->aulaRepository->eliminar($id);
    }

    /**
     * Cambia el estado de una aula.
     *
     * @param int $id
     * @param int $estado
     * @return bool
     */
    public function cambiarEstado(int $id, int $estado): bool
    {
        return $this->aulaRepository->cambiarEstado($id, $estado);
    }

    /**
     * Obtiene el último ID de la tabla de aulas.
     *
     * @return int
     */
    public function obtenerUltimoId(): int
    {
        return $this->aulaRepository->obtenerUltimoId();
    }

    /**
     * Obtiene el última aula registrado.
     *
     * @return Model
     */
    public function obtenerUltimo(): Model
    {
        return $this->aulaRepository->obtenerUltimo();
    }

    /**
     * Obtiene todos las aulas activos.
     *
     * @return Collection
     */
    public function obtenerActivos(): Collection
    {
        return $this->aulaRepository->obtenerActivos();
    }

    /**
     * Obtiene todos las aulas con selección de columnas específicas.
     *
     * @return Collection
     */
    public function obtenerConColumnas(): Collection
    {
        return $this->aulaRepository->obtenerTodosConColumnasEspecificas();
    }

    public function obtenerPaginado(array $criteria): LengthAwarePaginator
    {
        $aulaPag = $this->aulaRepository->obtenerPaginado($criteria);
        $aulaParse = $aulaPag->getCollection()->map(function ($aula) {
            return [
                'id' => $aula->id,
                'pabellon_id' => $aula->pabellon_id,
                'pabellon' => $aula->pabellon->descripcion,
                'piso' => $aula->piso,
                'correlativo' => $aula->correlativo,
                'aforo' => $aula->aforo,
                'estado' => $aula->estado,
            ];
        });

        $aulaPag->setCollection($aulaParse);
        return $aulaPag;
    }

    public function obtenerConNombres(): Collection
    {
        return $this->aulaRepository->obtenerTodos()->map(function ($aula) {
            return [
                'id' => $aula->id,
                'pabellon' => $aula->descripcion,
            ];
        });
    }
}

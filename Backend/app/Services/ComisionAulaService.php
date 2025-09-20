<?php

namespace App\Services;

use App\Repositories\ComisionAulaRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

class ComisionAulaService
{
    protected ComisionAulaRepository $comisionAulaRepository;

    public function __construct(ComisionAulaRepository $comisionAulaRepository)
    {
        $this->comisionAulaRepository = $comisionAulaRepository;
    }

    /**
     * Obtiene todos las aula miembros.
     *
     * @return Collection
     */
    public function getAll(): Collection
    {
        return $this->comisionAulaRepository->obtenerTodos();
    }

    /**
     * Obtiene una aula por su ID.
     *
     * @param int $id
     * @return Model
     */
    public function getById(int $id): Model
    {
        return $this->comisionAulaRepository->obtenerPorId($id);
    }

    /**
     * Crea un nuevo miembro.
     *
     * @param array $data
     * @return Model
     */
    public function create(array $data): Model
    {
        return $this->comisionAulaRepository->crear($data);
    }

    /**
     * Actualiza una aula miembro existente.
     *
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function update(int $id, array $data): bool
    {
        return $this->comisionAulaRepository->actualizar($id, $data);
    }

    /**
     * Elimina una aula miembro existente.
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        return $this->comisionAulaRepository->eliminar($id);
    }

    /**
     * Cambia el estado de una aula miembro.
     *
     * @param int $id
     * @param string $estado
     * @return bool
     */
    public function cambiarEstado(int $id, string $estado): bool
    {
        return $this->comisionAulaRepository->cambiarEstado($id, $estado);
    }

    /**
     * Obtiene el último ID de la tabla de aula miembros.
     *
     * @return int
     */
    public function obtenerUltimoId(): int
    {
        return $this->comisionAulaRepository->obtenerUltimoId();
    }

    /**
     * Obtiene el última aula registrado.
     *
     * @return Model
     */
    public function obtenerUltimo(): Model
    {
        return $this->comisionAulaRepository->obtenerUltimo();
    }

    /**
     * Obtiene todos las aula miembros activos.
     *
     * @return Collection
     */
    public function obtenerActivos(): Collection
    {
        return $this->comisionAulaRepository->obtenerActivos();
    }

    public function obtenerPaginado(array $criteria): LengthAwarePaginator
    {
        $comisionAulaPag = $this->comisionAulaRepository->obtenerPaginado($criteria);
        $comisionAulaParse = $comisionAulaPag->getCollection()->map(function ($comisionAula) {
            return [
                'id' => $comisionAula->id,
                'pabellon_id' => $comisionAula->aula->pabellon_id,
                'pabellon' => $comisionAula->aula->pabellon->nombre,
                'piso' => $comisionAula->aula->piso,
                'correlativo' => $comisionAula->aula->correlativo,
                'aforo' => $comisionAula->aula->aforo,
                'nombre' => $comisionAula->comisionMiembro->miembroCargo->miembro->nombre,
                'apellido' => $comisionAula->comisionMiembro->miembroCargo->miembro->apellido,
                'dni' => $comisionAula->comisionMiembro->miembroCargo->miembro->dni,
                'cargo' => $comisionAula->comisionMiembro->miembroCargo->cargoEspecialidad->cargo->nombre,
                'es_encargado' => $comisionAula->es_encargado,
                'estado' => $comisionAula->estado,
            ];
        });

        $comisionAulaPag->setCollection($comisionAulaParse);
        return $comisionAulaPag;
    }

    public function obtenerConNombres(): Collection
    {
        return $this->comisionAulaRepository->obtenerTodos()->map(function ($comisionAula) {
            return [
                'id' => $comisionAula->id,
                'pabellon' => $comisionAula->descripcion,
            ];
        });
    }
}

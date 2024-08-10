<?php

namespace App\Services;

use App\Repositories\ComisionMiembroRepository;
use App\Repositories\MiembroRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

class ComisionMiembroService
{
    protected ComisionMiembroRepository $comisionMiembroRepository;

    public function __construct(ComisionMiembroRepository $comisionMiembroRepository, MiembroRepository $miembroRepository)
    {
        $this->comisionMiembroRepository = $comisionMiembroRepository;
    }

    /**
     * Obtiene todos los comisión miembros.
     *
     * @return Collection
     */
    public function getAll(): Collection
    {
        return $this->comisionMiembroRepository->obtenerTodos();
    }

    /**
     * Obtiene una comisión miembro por su ID.
     *
     * @param int $id
     * @return Model
     */
    public function getById(int $id): Model
    {
        return $this->comisionMiembroRepository->obtenerPorId($id);
    }

    /**
     * Crea un nuevo miembro.
     *
     * @param array $data
     * @return Model
     */
    public function create(array $data): Model
    {
        return $this->comisionMiembroRepository->crear($data);
    }

    /**
     * Actualiza una comisión miembro existente.
     *
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function update(int $id, array $data): bool
    {

        return $this->comisionMiembroRepository->actualizar($id, $data);
    }

    /**
     * Elimina una comisión miembro existente.
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        return $this->comisionMiembroRepository->eliminar($id);
    }

    /**
     * Cambia el estado de una comisión miembro.
     *
     * @param int $id
     * @param int $estado
     * @return bool
     */
    public function cambiarEstado(int $id, int $estado): bool
    {
        return $this->comisionMiembroRepository->cambiarEstado($id, $estado);
    }

    /**
     * Obtiene el último ID de la tabla de comisión miembros.
     *
     * @return int
     */
    public function obtenerUltimoId(): int
    {
        return $this->comisionMiembroRepository->obtenerUltimoId();
    }

    /**
     * Obtiene todos los comisión miembros activos.
     *
     * @return Collection
     */
    public function obtenerActivos(): Collection
    {
        return $this->comisionMiembroRepository->obtenerActivos();
    }

    /**
     * Obtiene todos los comisión miembros con selección de columnas específicas.
     *
     * @return Collection
     */
    public function obtenerConColumnas(): Collection
    {
        return $this->comisionMiembroRepository->obtenerTodosConColumnasEspecificas();
    }

    public function obtenerPaginado(array $criteria): LengthAwarePaginator
    {
        $comisionMiembroPag =  $this->comisionMiembroRepository->obtenerPaginado($criteria);
        $comisionMiembroPag->getCollection()->transform(function ($comisionMiembro) {
            return [
                'id' => $comisionMiembro->id,
                'comision' => $comisionMiembro->comisionProceso->comision->descripcion,
                'proceso_periodo' => $comisionMiembro->comisionProceso->procesoPeriodo->proceso->descripcion .
                    ' ' . $comisionMiembro->comisionProceso->procesoPeriodo->periodo->anio . ' - ' . $comisionMiembro->comisionProceso->procesoPeriodo->periodo->correlativo_romano,
                'nombres' => $comisionMiembro->miembroCargo->miembro->nombres,
                'apellidos' => $comisionMiembro->miembroCargo->miembro->apellidos,
                'cargo' => $comisionMiembro->miembroCargo->cargo->descripcion,
                'fecha' => $comisionMiembro->comisionProceso->fecha,
                'hora' => $comisionMiembro->comisionProceso->hora,
                'estado' => $comisionMiembro->estado,
            ];
        });

        return $comisionMiembroPag;
    }

    public function obtenerConNombres(): Collection
    {
        return $this->comisionMiembroRepository->obtenerTodos()->map(function ($comisionMiembro) {
            return [
                'id' => $comisionMiembro->id,
            ];
        });
    }
}

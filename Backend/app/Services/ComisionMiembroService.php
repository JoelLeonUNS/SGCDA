<?php

namespace App\Services;

use App\Repositories\ComisionMiembroRepository;
use App\Repositories\MiembroRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection as SupportCollection;

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

    public function obtenerMiembrosPorComision(int $comisionId): SupportCollection
    {
        $miembros = $this->comisionMiembroRepository->obtenerMiembrosPorComision($comisionId);
        
        return $miembros->map(function ($miembro) {
            return [
                'id' => $miembro->id,
                'miembro_id' => $miembro->miembro_id,
                'cargo_especialidad_id' => $miembro->cargo_especialidad_id,
                'estado' => $miembro->estado,
                'nombres' => $miembro->miembro_nombres,
                'apellidos' => $miembro->miembro_apellidos,
                'dni' => $miembro->miembro_dni ?? 'Sin DNI',
                'nombre_completo' => trim(($miembro->miembro_nombres ?? '') . ' ' . ($miembro->miembro_apellidos ?? '')),
            ];
        });
    }

    public function obtenerPaginado(array $criteria): LengthAwarePaginator
    {
        $comisionMiembroPag =  $this->comisionMiembroRepository->obtenerPaginado($criteria);
        $comisionMiembroPag->getCollection()->transform(function ($comisionMiembro) {
            return [
                'id' => $comisionMiembro->id,
                'comision' => $comisionMiembro->comisionProceso->comision->nombre,
                'proceso_periodo' => $comisionMiembro->comisionProceso->procesoPeriodo->proceso->nombre .
                    ' ' . $comisionMiembro->comisionProceso->procesoPeriodo->periodo->anio . ' - ' . $comisionMiembro->comisionProceso->procesoPeriodo->periodo->correlat_romano,
                'nombres' => $comisionMiembro->miembroCargo->miembro->nombres,
                'apellidos' => $comisionMiembro->miembroCargo->miembro->apellidos,
                'cargo' => $comisionMiembro->miembroCargo->cargoEspecialidad->cargo->nombre,
                'fecha' => $comisionMiembro->horario->fecha,
                'hora' => $comisionMiembro->horario->hora_inicial . ' - ' . $comisionMiembro->horario->hora_final,
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

    /**
     * Obtiene miembros de una comisión que no están asignados a ningún aula
     *
     * @param int $comisionProcesoId
     * @return SupportCollection
     */
    public function obtenerMiembrosDisponiblesParaAula(int $comisionProcesoId): SupportCollection
    {
        return $this->comisionMiembroRepository->obtenerMiembrosDisponiblesParaAula($comisionProcesoId);
    }

    /**
     * Obtiene miembros asignados a un aula específica
     *
     * @param int $aulaId
     * @return SupportCollection
     */
    public function obtenerMiembrosAsignadosAula(int $aulaId): SupportCollection
    {
        return $this->comisionMiembroRepository->obtenerMiembrosAsignadosAula($aulaId);
    }

    /**
     * Asigna miembros a un aula específica
     *
     * @param array $data
     * @return array
     */
    public function asignarMiembrosAula(array $data): array
    {
        return $this->comisionMiembroRepository->asignarMiembrosAula($data);
    }

    /**
     * Remueve miembros de un aula específica
     *
     * @param int $aulaId
     * @param array $miembrosIds
     * @return array
     */
    public function removerMiembrosAula(int $aulaId, array $miembrosIds): array
    {
        return $this->comisionMiembroRepository->removerMiembrosAula($aulaId, $miembrosIds);
    }
}

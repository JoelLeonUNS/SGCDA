<?php

namespace App\Services;

use App\Repositories\ComisionMiembroRepository;
use App\Repositories\ComisionProcesoRepository;
use App\Repositories\ProcesoPeriodoRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

class ComisionProcesoService
{
    protected ProcesoPeriodoRepository $procesoPeriodoRepository;
    protected ComisionMiembroRepository $comisionMiembroRepository;
    protected ComisionProcesoRepository $comisionProcesoRepository;

    public function __construct(ComisionProcesoRepository $comisionProcesoRepository, ComisionMiembroRepository $comisionMiembroRepository, ProcesoPeriodoRepository $procesoPeriodoRepository)
    {
        $this->comisionMiembroRepository = $comisionMiembroRepository;
        $this->comisionProcesoRepository = $comisionProcesoRepository;
        $this->procesoPeriodoRepository = $procesoPeriodoRepository;
    }

    /**
     * Obtiene todos los comision procesos.
     *
     * @return Collection
     */
    public function getAll(): Collection
    {
        return $this->comisionProcesoRepository->obtenerTodos();
    }

    /**
     * Obtiene una comisión por su ID.
     *
     * @param int $id
     * @return Model
     */
    public function getById(int $id): Model
    {
        return $this->comisionProcesoRepository->obtenerPorId($id);
    }

    /**
     * Crea un nuevo comision.
     *
     * @param array $data
     * @return Model
     */
    public function create(array $data): Model
    {
        // Desacoplar cada id de miembros_ids
        $miembros_ids = $data['miembros_ids'];
        unset($data['miembros_ids']);
        $proceso_id = $data['proceso_id'];
        unset($data['proceso_id']);
        $periodo_id = $data['periodo_id'];
        unset($data['periodo_id']);

        // Buscar o crear el registro en ProcesoPeriodo
        $procesoPeriodo = $this->procesoPeriodoRepository->buscarOCrear([
            'proceso_id' => $proceso_id,
            'periodo_id' => $periodo_id
        ]);

        // Agregar el proceso_periodo_id a los datos de la comisión proceso
        $data['proceso_periodo_id'] = $procesoPeriodo->id;

        // Crear la comisión proceso
        $comisionProceso = $this->comisionProcesoRepository->crear($data);
        // Asignar los miembros a la comisión
        foreach ($miembros_ids as $miembro_id) {
            $this->comisionMiembroRepository->crear([
                'comision_proceso_id' => $comisionProceso->id,
                'miembro_cargo_id' => $miembro_id,
            ]);
        }
        return $comisionProceso;
    }

    /**
     * Actualiza una comisión existente.
     *
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function update(int $id, array $data): bool
    {
        // Desacoplar cada id de miembros_ids
        $miembros_ids = $data['miembros_ids'];
        unset($data['miembros_ids']);
        // Actualizar la comisión proceso ...

        return $this->comisionProcesoRepository->actualizar($id, $data);
    }

    /**
     * Elimina una comisión existente.
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        return $this->comisionProcesoRepository->eliminar($id);
    }

    /**
     * Cambia el estado de un comision.
     *
     * @param int $id
     * @param int $estado
     * @return bool
     */
    public function cambiarEstado(int $id, int $estado): bool
    {
        return $this->comisionProcesoRepository->cambiarEstado($id, $estado);
    }

    /**
     * Obtiene el último ID de la tabla de comision procesos.
     *
     * @return int
     */
    public function obtenerUltimoId(): int
    {
        return $this->comisionProcesoRepository->obtenerUltimoId();
    }

    /**
     * Obtiene todos los comision procesos activos.
     *
     * @return Collection
     */
    public function obtenerActivos(): Collection
    {
        return $this->comisionProcesoRepository->obtenerActivos();
    }

    /**
     * Obtiene todos los comision procesos con selección de columnas específicas.
     *
     * @return Collection
     */
    public function obtenerConColumnas(): Collection
    {
        return $this->comisionProcesoRepository->obtenerTodosConColumnasEspecificas();
    }

    public function obtenerPaginado(array $criteria): LengthAwarePaginator
    {
        $comisionProcesoPag = $this->comisionProcesoRepository->obtenerPaginado($criteria);
        $comisionProcesoParse = $comisionProcesoPag->getCollection()->map(function ($comisionProceso) {
            $nroMiembros = $this->comisionMiembroRepository->obtenerNroMiembros($comisionProceso->id);
            return [
                'id' => $comisionProceso->id,
                'comision_id' => $comisionProceso->comision_id,
                'comision' => $comisionProceso->comision->descripcion,
                'nro_miembros' => $nroMiembros,
                'fecha' => $comisionProceso->fecha,
                'hora' => $comisionProceso->hora,
                'paga' => $comisionProceso->paga,
                'proceso_id' => $comisionProceso->procesoPeriodo->proceso->id,
                'proceso' => $comisionProceso->procesoPeriodo->proceso->descripcion,
                'periodo_id' => $comisionProceso->procesoPeriodo->periodo->id,
                'periodo' => $comisionProceso->procesoPeriodo->periodo->anio . ' - ' . $comisionProceso->procesoPeriodo->periodo->correlativo_romano,
                'estado' => $comisionProceso->estado,
            ];
        }); 

        $comisionProcesoPag->setCollection($comisionProcesoParse);
        return $comisionProcesoPag;
    }

    public function obtenerConNombres(): Collection
    {
        return $this->comisionProcesoRepository->obtenerTodos()->map(function ($comision) {
            return [
                'id' => $comision->id,
                'descripcion' => $comision->descripcion,
            ];
        });
    }
}

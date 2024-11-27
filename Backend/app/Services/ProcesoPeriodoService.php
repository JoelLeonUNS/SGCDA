<?php

namespace App\Services;

use App\Repositories\ProcesoPeriodoRepository;
use App\Traits\General\FechaFormatoABarraTrait;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Js;

class ProcesoPeriodoService
{
    use FechaFormatoABarraTrait;
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
        $procesoPeriodo = $this->procesoPeriodoRepository->obtenerPorId($id);
        $procesoPeriodo->fecha_inicial = $this->convertirFecha($procesoPeriodo->fecha_inicial);
        $procesoPeriodo->fecha_final = $this->convertirFecha($procesoPeriodo->fecha_final);
        return $procesoPeriodo;
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
     * @param string $estado
     * @return bool
     */
    public function cambiarEstado(int $id, string $estado): bool
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
     * Obtiene el periodo actual que esté abierto.
     *
     * @return array
     */
    public function obtenerActual(): array
    {
        $procesoPeriodo = $this->procesoPeriodoRepository->obtenerProcesoPeriodoActual();
        $procesoPeriodoParse = [
            'id' => $procesoPeriodo->id,
            'proceso_id' => $procesoPeriodo->proceso_id,
            'proceso' => $procesoPeriodo->proceso->nombre,
            'periodo_id' => $procesoPeriodo->periodo_id,
            'periodo' => $procesoPeriodo->periodo->anio . ' - ' . $procesoPeriodo->periodo->correlat_romano,
            'fecha_inicial' => $this->convertirFecha($procesoPeriodo->fecha_inicial),
            'fecha_final' => $this->convertirFecha($procesoPeriodo->fecha_final),
            'estado' => $procesoPeriodo->estado
        ];
        
        return $procesoPeriodoParse;
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
        $procesoPeriodoPag =   $this->procesoPeriodoRepository->obtenerPaginado($criteria);
        $procesoPeriodoParse = $procesoPeriodoPag->getCollection()->map(function ($procesoPeriodo) {
            return [
                'id' => $procesoPeriodo->id,
                'proceso_id' => $procesoPeriodo->proceso_id,
                'proceso' => $procesoPeriodo->proceso->nombre,
                'periodo_id' => $procesoPeriodo->periodo_id,
                'periodo' => $procesoPeriodo->periodo->anio . ' - ' . $procesoPeriodo->periodo->correlat_romano,
                'fecha_inicial' => $this->convertirFecha($procesoPeriodo->fecha_inicial),
                'fecha_final' => $this->convertirFecha($procesoPeriodo->fecha_final),
                'estado' => $procesoPeriodo->estado,
            ];
        });

        $procesoPeriodoPag->setCollection($procesoPeriodoParse);
        
        return $procesoPeriodoPag;
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

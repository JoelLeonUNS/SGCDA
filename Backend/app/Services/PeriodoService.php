<?php

namespace App\Services;

use App\Repositories\PeriodoRepository;
use App\Traits\General\FechaFormatoABarraTrait;
use App\Traits\General\PeriodoNumericoTrait;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

class PeriodoService
{
    use FechaFormatoABarraTrait;
    use PeriodoNumericoTrait;
    protected PeriodoRepository $periodoRepository;

    public function __construct(PeriodoRepository $periodoRepository)
    {
        $this->periodoRepository = $periodoRepository;
    }

    /**
     * Obtiene todos los periodos.
     *
     * @return Collection
     */
    public function getAll(): Collection
    {
        // Modificar el formato de las fechas y agregar el atributo periodo = anio - correlativo_romano
        return $this->periodoRepository->obtenerTodos()->map(function ($periodo) {
            $periodo->fecha_inicial = $this->convertirFecha($periodo->fecha_inicial);
            $periodo->fecha_final = $this->convertirFecha($periodo->fecha_final);
            $periodo->periodo = "{$periodo->anio} - {$periodo->correlativo_romano}";
            return $periodo;
        });
    }

    /**
     * Obtiene una comisión por su ID.
     *
     * @param int $id
     * @return Model
     */
    public function getById(int $id): Model
    {
        // Modificar el formato de las fechas y agregar el atributo periodo = anio - correlativo_romano
        $periodo = $this->periodoRepository->obtenerPorId($id);
        $periodo->fecha_inicial = $this->convertirFecha($periodo->fecha_inicial);
        $periodo->fecha_final = $this->convertirFecha($periodo->fecha_final);
        $periodo->periodo = "{$periodo->anio} - {$periodo->correlativo_romano}";
        return $periodo;
    }

    /**
     * Crea un nuevo periodo.
     *
     * @param array $data
     * @return Model
     */
    public function create(array $data): Model
    {
        $periodo_numerico = $this->toPeriodoNumerico($data['anio'], $data['correlativo_romano']);
        $data['periodo_numerico'] = $periodo_numerico;
        return $this->periodoRepository->crear($data);
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
        $periodo_numerico = $this->toPeriodoNumerico($data['anio'], $data['correlativo_romano']);
        $data['periodo_numerico'] = $periodo_numerico;
        return $this->periodoRepository->actualizar($id, $data);
    }

    /**
     * Elimina una comisión existente.
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        return $this->periodoRepository->eliminar($id);
    }

    /**
     * Cambia el estado de un periodo.
     *
     * @param int $id
     * @param string $estado
     * @return bool
     */
    public function cambiarEstado(int $id, string $estado): bool
    {
        return $this->periodoRepository->cambiarEstado($id, $estado);
    }

    /**
     * Obtiene el último ID de la tabla de periodos.
     *
     * @return int
     */
    public function obtenerUltimoId(): int
    {
        return $this->periodoRepository->obtenerUltimoId();
    }

    /**
     * Obtiene el último periodo.
     * 
     * @return Model
     */

    public function obtenerUltimo(): Model
    {
        // Modificar el formato de las fechas y agregar el atributo periodo = anio - correlativo_romano
        $periodo = $this->periodoRepository->obtenerUltimo();
        $periodo->fecha_inicial = $this->convertirFecha($periodo->fecha_inicial);
        $periodo->fecha_final = $this->convertirFecha($periodo->fecha_final);
        $periodo->periodo = "{$periodo->anio} - {$periodo->correlativo_romano}";
        return $periodo;
    }

    /**
     * Obtiene el periodo actual que esté abierto.
     *
     * @return Model|null 
     */
    public function obtenerPeriodoActual(): Model|null
    {
        $periodo = $this->periodoRepository->obtenerPeriodoActual();
        $periodo->fecha_inicial = $this->convertirFecha($periodo->fecha_inicial);
        $periodo->fecha_final = $this->convertirFecha($periodo->fecha_final);
        $periodo->periodo = "{$periodo->anio} - {$periodo->correlativo_romano}";
        return $periodo;
    }
    
    /**
     * Obtiene todos los periodos activos.
     *
     * @return Collection
     */
    public function obtenerActivos(): Collection
    {
        // Modificar el formato de las fechas y agregar el atributo periodo = anio - correlativo_romano
        return $this->periodoRepository->obtenerActivos()->map(function ($periodo) {
            $periodo->fecha_inicial = $this->convertirFecha($periodo->fecha_inicial);
            $periodo->fecha_final = $this->convertirFecha($periodo->fecha_final);
            $periodo->periodo = "{$periodo->anio} - {$periodo->correlativo_romano}";
            return $periodo;
        });
    }

    /**
     * Obtiene todos los periodos con selección de columnas específicas.
     *
     * @return Collection
     */
    public function obtenerConColumnas(): Collection
    {
        return $this->periodoRepository->obtenerTodosConColumnasEspecificas();
    }

    public function obtenerPaginado(array $criteria): LengthAwarePaginator
    {
        // Modificar el formato de las fechas
        $periodoPag = $this->periodoRepository->obtenerPaginado($criteria);
        $periodoParse = $periodoPag->getCollection()->map(function ($periodo) {
            $periodo->fecha_inicial = $this->convertirFecha($periodo->fecha_inicial);
            $periodo->fecha_final = $this->convertirFecha($periodo->fecha_final);
            return $periodo;
        });
        $periodoPag->setCollection($periodoParse);
        return $periodoPag;
    }

    public function obtenerConNombres(): Collection
    {
        return $this->periodoRepository->obtenerTodos()->map(function ($periodo) {
            return [
                'id' => $periodo->id,
                'fecha_inicial' => $periodo->fecha_inicial,
                'fecha_final' => $periodo->fecha_final,
                'anio' => $periodo->anio,
                'correlativo_romano' => $periodo->correlativo_romano,  
            ];
        });
    }
}

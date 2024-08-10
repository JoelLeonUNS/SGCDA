<?php

namespace App\Services;

use App\Repositories\ComisionMiembroRepository;
use App\Repositories\MiembroCargoRepository;
use App\Repositories\MiembroRepository;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

class MiembroCargoService
{
    protected ComisionMiembroRepository $comisionMiembroRepository;
    protected MiembroRepository $miembroRepository;
    protected MiembroCargoRepository $miembroCargoRepository;

    public function __construct(MiembroCargoRepository $miembroCargoRepository, MiembroRepository $miembroRepository, ComisionMiembroRepository $comisionMiembroRepository)
    {
        $this->comisionMiembroRepository = $comisionMiembroRepository;
        $this->miembroCargoRepository = $miembroCargoRepository;
        $this->miembroRepository = $miembroRepository;
    }

    /**
     * Obtiene todos los miembro cargos.
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
        $nuevoMiembroId = $this->miembroRepository->insertarObtenerId($miembro);
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
        $this->miembroRepository->actualizar($data['miembro_id'], [
            'nombres' => $data['nombres'],
            'apellidos' => $data['apellidos'],
        ]);
        unset($data['nombres'], $data['apellidos']);
        /**
         * Si el cargo es diferente al actual, se actualiza la fecha de asignación y se crea un nuevo miembro cargo.
         * De lo contrario, se actualiza el miembro cargo.
         * Esto se hace para llevar un registro de la fecha de asignación de un cargo.
         */
        if ($data['cargo_id'] != $this->miembroCargoRepository->obtenerPorId($id)->cargo_id) {
            $data['fecha_asignacion'] = now();
            return $this->miembroCargoRepository->crear($data) ? true : false;
        } else {
            return $this->miembroCargoRepository->actualizar($id, $data);
        }
    }

    /**
     * Elimina un miembro cargo existente.
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        return $this->miembroCargoRepository->eliminar($id);
    }

    /**
     * Cambia el estado de un miembro cargo.
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
     * Obtiene el último ID de la tabla de miembro cargos.
     *
     * @return int
     */
    public function obtenerUltimoId(): int
    {
        return $this->miembroCargoRepository->obtenerUltimoId();
    }

    /**
     * Obtiene todos los miembro cargos activos.
     *
     * @return Collection
     */
    public function obtenerActivos(): Collection
    {
        return $this->miembroCargoRepository->obtenerActivos();
    }

    /**
     * Obtiene todos los miembro cargos con selección de columnas específicas.
     *
     * @return Collection
     */
    public function obtenerConColumnas(): Collection
    {
        return $this->miembroCargoRepository->obtenerTodosConColumnasEspecificas();
    }

    public function obtenerPaginado(array $criteria): LengthAwarePaginator
    {
        // Obtener los datos paginados desde el repositorio
        $miembroCargoPag = $this->miembroCargoRepository->obtenerPaginado($criteria);
       
        // Transformar los datos agrupados para la salida deseada
        $miembroCargoParse = $miembroCargoPag->getCollection()->map(function ($miembroCargo) {
            
            return [
                'id' => $miembroCargo->id,
                'miembro_id' => $miembroCargo->miembro_id,
                'nombres' => $miembroCargo->miembro->nombres,
                'apellidos' => $miembroCargo->miembro->apellidos,
                'cargo_id' => $miembroCargo->cargo_id,
                'cargo' => $miembroCargo->cargo->descripcion ?? 'Sin cargo asignado',
                'fecha_asignacion' => $miembroCargo->fecha_asignacion,
                'estado' => $miembroCargo->estado,
            ];
        });

        // Establecer la colección transformada en el paginador
        $miembroCargoPag->setCollection($miembroCargoParse);

        return $miembroCargoPag;
    }

    public function obtenerParticipacionMiembrosPag(array $criteria): LengthAwarePaginator
    {
        // Obtener los datos paginados desde el repositorio
        $consultaPrevia = $this->miembroCargoRepository->obtenerMiembrosSinComision();
        $miembroCargoPag = $this->miembroCargoRepository->obtenerPaginado($criteria, $consultaPrevia);
       
        // Transformar los datos agrupados para la salida deseada
        $miembroCargoParse = $miembroCargoPag->getCollection()->map(function ($miembroCargo) {
            return [
                'id' => $miembroCargo->id,
                'miembro_id' => $miembroCargo->miembro_id,
                'nombres' => $miembroCargo->miembro->nombres,
                'apellidos' => $miembroCargo->miembro->apellidos,
                'cargo_id' => $miembroCargo->cargo_id,
                'cargo' => $miembroCargo->cargo->descripcion ?? 'Sin cargo asignado',
            ];
        });

        // Establecer la colección transformada en el paginador
        $miembroCargoPag->setCollection($miembroCargoParse);

        return $miembroCargoPag;
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
                'cargo' => $miembroCargo->cargo->descripcion ?? 'Sin cargo asignado',
            ];
        });
    }
}

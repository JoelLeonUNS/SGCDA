<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUpdate\StoreUpdateCargoRequest;
use App\Http\Requests\Validacion\EstadoEnumRequest;
use App\Services\ResponseService;
use App\Services\CargoService;
use App\Traits\Http\Controllers\CriterioTrait;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use InvalidArgumentException;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class CargoController extends Controller
{
    use CriterioTrait;

    protected CargoService $cargoService;
    protected ResponseService $responseService;

    public function __construct(CargoService $cargoService, ResponseService $responseService)
    {
        $this->cargoService = $cargoService;
        $this->responseService = $responseService;
    }

    /**
     * Obtiene todos los cargos.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $cargos = $this->cargoService->getAll();
            return $this->responseService->success($cargos);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener los cargos: ' . $e->getMessage());
        }
    }

    /**
     * Obtiene un cargo por su ID.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        try {
            $cargo = $this->cargoService->getById($id);
            return $this->responseService->success($cargo);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener el cargo: ' . $e->getMessage());
        }
    }

    /**
     * Crea un nuevo cargo.
     *
     * @param StoreUpdateCargoRequest $request
     * @return JsonResponse
     */
    public function store(StoreUpdateCargoRequest $request): JsonResponse
    {
        try {
            $cargo = $this->cargoService->create($request->validate($request->rules()));
            return $this->responseService->success($cargo, ResponseAlias::HTTP_CREATED);
        } catch (Exception $e) {
            return $this->responseService->error('Error al crear el cargo: ' . $e->getMessage());
        }
    }

    /**
     * Actualiza un cargo existente.
     *
     * @param StoreUpdateCargoRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(StoreUpdateCargoRequest $request, int $id): JsonResponse
    {
        try {
            if (!$this->cargoService->getById($id)) {
                return $this->responseService->error('Cargo no encontrado', ResponseAlias::HTTP_NOT_FOUND);
            }
            $this->cargoService->update($id, $request->validate($request->rules()));
            return $this->responseService->success("Cargo actualizado correctamente");
        } catch (Exception $e) {
            return $this->responseService->error('Error al actualizar el cargo: ' . $e->getMessage());
        }
    }

    /**
     * Elimina un cargo existente.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            if (!$this->cargoService->delete($id)) {
                return $this->responseService->error('Cargo no encontrado', ResponseAlias::HTTP_NOT_FOUND);
            }
            $this->cargoService->delete($id);
            return $this->responseService->success("Cargo eliminado correctamente");
        } catch (Exception $e) {
            return $this->responseService->error('Error al eliminar el cargo: ' . $e->getMessage());
        }
    }

    public function obtenerUltimoId(): JsonResponse
    {
        try {
            $ultimoId = $this->cargoService->obtenerUltimoId();
            return $this->responseService->success(['id' => $ultimoId]);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener el último ID de cargo: ' . $e->getMessage());
        }
    }

    /**
     * Cambia el estado de un cargo.
     *
     * @param EstadoEnumRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function cambiarEstado(EstadoEnumRequest $request, int $id): JsonResponse
    {
        try {
            $this->cargoService->cambiarEstado($id, $request->validated()['estado']);
            return $this->responseService->success("Estado del cargo actualizado correctamente");
        } catch (Exception $e) {
            return $this->responseService->error('Error al cambiar el estado del cargo: ' . $e->getMessage());
        }
    }

    /**
     * Obtiene todos las cargos activas.
     *
     * @return JsonResponse
     */
    public function obtenerActivos(): JsonResponse
    {
        try {
            $cargosActivos = $this->cargoService->obtenerActivos();
            return $this->responseService->success($cargosActivos);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener los cargos activos: ' . $e->getMessage());
        }
    }

    public function obtenerConNombres(): JsonResponse
    {
        try {
            $cargos = $this->cargoService->obtenerConNombres();
            return $this->responseService->success($cargos);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener los cargos: ' . $e->getMessage());
        }

    }

    public function obtenerPag(Request $request): JsonResponse
    {
        try {
            $criteria = $this->obtenerCriterios($request);
            $cargos = $this->cargoService->obtenerPaginado($criteria);
            return $this->responseService->success(([
                'data' => $cargos->items(),
                'total' => $cargos->total(),
            ]));
        } catch (InvalidArgumentException $e) {
            return $this->responseService->error($e->getMessage(), ResponseAlias::HTTP_BAD_REQUEST);
        }
    }
}

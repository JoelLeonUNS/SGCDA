<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUpdate\StoreUpdateProcesoRequest;
use App\Http\Requests\Validacion\EstadoBitRequest;
use App\Http\Requests\Validacion\EstadoEnumRequest;
use App\Services\ResponseService;
use App\Services\ProcesoService;
use App\Traits\Http\Controllers\CriterioTrait;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use InvalidArgumentException;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class ProcesoController extends Controller
{
    use CriterioTrait;

    protected ProcesoService $procesoService;
    protected ResponseService $responseService;

    public function __construct(ProcesoService $procesoService, ResponseService $responseService)
    {
        $this->procesoService = $procesoService;
        $this->responseService = $responseService;
    }

    /**
     * Obtiene todos los procesos.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $procesos = $this->procesoService->getAll();
            return $this->responseService->success($procesos);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener los procesos: ' . $e->getMessage());
        }
    }

    /**
     * Obtiene un proceso por su ID.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        try {
            $proceso = $this->procesoService->getById($id);
            return $this->responseService->success($proceso);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener el proceso: ' . $e->getMessage());
        }
    }

    /**
     * Crea un nuevo proceso.
     *
     * @param StoreUpdateProcesoRequest $request
     * @return JsonResponse
     */
    public function store(StoreUpdateProcesoRequest $request): JsonResponse
    {
        try {
            $proceso = $this->procesoService->create($request->validate($request->rules()));
            return $this->responseService->success($proceso, ResponseAlias::HTTP_CREATED);
        } catch (Exception $e) {
            return $this->responseService->error('Error al crear el proceso: ' . $e->getMessage());
        }
    }

    /**
     * Actualiza un proceso existente.
     *
     * @param StoreUpdateProcesoRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(StoreUpdateProcesoRequest $request, int $id): JsonResponse
    {
        try {
            if (!$this->procesoService->getById($id)) {
                return $this->responseService->error('Proceso no encontrado', ResponseAlias::HTTP_NOT_FOUND);
            }
            $this->procesoService->update($id, $request->validate($request->rules()));
            return $this->responseService->success("Proceso actualizado correctamente");
        } catch (Exception $e) {
            return $this->responseService->error('Error al actualizar el proceso: ' . $e->getMessage());
        }
    }

    /**
     * Elimina un proceso existente.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            if (!$this->procesoService->delete($id)) {
                return $this->responseService->error('Proceso no encontrado', ResponseAlias::HTTP_NOT_FOUND);
            }
            $this->procesoService->delete($id);
            return $this->responseService->success("Proceso eliminado correctamente");
        } catch (Exception $e) {
            return $this->responseService->error('Error al eliminar el proceso: ' . $e->getMessage());
        }
    }

    public function obtenerUltimoId(): JsonResponse
    {
        try {
            $ultimoId = $this->procesoService->obtenerUltimoId();
            return $this->responseService->success(['id' => $ultimoId]);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener el último ID de proceso: ' . $e->getMessage());
        }
    }
    
    public function obtenerUltimo(): JsonResponse
    {
        try {
            $proceso = $this->procesoService->obtenerUltimo();
            return $this->responseService->success($proceso);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener el último proceso: ' . $e->getMessage());
        }
    }

    /**
     * Cambia el estado de un proceso.
     *
     * @param EstadoEnumRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function cambiarEstado(EstadoEnumRequest $request, int $id): JsonResponse
    {
        try {
            $this->procesoService->cambiarEstado($id, $request->validated()['estado']);
            return $this->responseService->success("Estado del proceso actualizado correctamente");
        } catch (Exception $e) {
            return $this->responseService->error('Error al cambiar el estado del proceso: ' . $e->getMessage());
        }
    }

    /**
     * Obtiene todos las procesos activas.
     *
     * @return JsonResponse
     */
    public function obtenerActivos(): JsonResponse
    {
        try {
            $procesosActivos = $this->procesoService->obtenerActivos();
            return $this->responseService->success($procesosActivos);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener los procesos activos: ' . $e->getMessage());
        }
    }


    /**
     * Obtiene todos los procesos con columnas específicas.
     *
     * @return JsonResponse
     */
    public function obtenerTodosConColumnasEspecificas(): JsonResponse
    {
        try {
            $procesos = $this->procesoService->obtenerConColumnas();
            return $this->responseService->success($procesos);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener los procesos: ' . $e->getMessage());
        }
    }

    public function obtenerConNombres(): JsonResponse
    {
        try {
            $procesos = $this->procesoService->obtenerConNombres();
            return $this->responseService->success($procesos);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener los procesos: ' . $e->getMessage());
        }

    }

    public function obtenerPag(Request $request): JsonResponse
    {
        try {
            $criteria = $this->obtenerCriterios($request);
            $procesos = $this->procesoService->obtenerPaginado($criteria);
            return $this->responseService->success(([
                'data' => $procesos->items(),
                'total' => $procesos->total(),
            ]));
        } catch (InvalidArgumentException $e) {
            return $this->responseService->error($e->getMessage(), ResponseAlias::HTTP_BAD_REQUEST);
        }
    }
}

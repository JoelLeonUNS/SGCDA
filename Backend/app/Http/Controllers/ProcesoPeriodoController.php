<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUpdate\StoreUpdateProcesoPeriodoRequest;
use App\Http\Requests\Validacion\EstadoEnumRequest;
use App\Services\ResponseService;
use App\Services\ProcesoPeriodoService;
use App\Traits\Http\Controllers\CriterioTrait;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use InvalidArgumentException;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class ProcesoPeriodoController extends Controller
{
    use CriterioTrait;

    protected ProcesoPeriodoService $procesoPeriodoService;
    protected ResponseService $responseService;

    public function __construct(ProcesoPeriodoService $procesoPeriodoService, ResponseService $responseService)
    {
        $this->procesoPeriodoService = $procesoPeriodoService;
        $this->responseService = $responseService;
    }

    /**
     * Obtiene todos los proceso periodos.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $procesoPeriodos = $this->procesoPeriodoService->getAll();
            return $this->responseService->success($procesoPeriodos);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener los proceso periodos: ' . $e->getMessage());
        }
    }

    /**
     * Obtiene un proceso periodo por su ID.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        try {
            $proceso = $this->procesoPeriodoService->getById($id);
            return $this->responseService->success($proceso);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener el proceso: ' . $e->getMessage());
        }
    }

    /**
     * Crea un nuevo proceso.
     *
     * @param StoreUpdateProcesoPeriodoRequest $request
     * @return JsonResponse
     */
    public function store(StoreUpdateProcesoPeriodoRequest $request): JsonResponse
    {
        try {
            $procesoPeriodo = $this->procesoPeriodoService->create($request->validate($request->rules()));
            return $this->responseService->success($procesoPeriodo, ResponseAlias::HTTP_CREATED);
        } catch (Exception $e) {
            return $this->responseService->error('Error al crear el proceso: ' . $e->getMessage());
        }
    }

    /**
     * Actualiza un proceso periodo existente.
     *
     * @param StoreUpdateProcesoPeriodoRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(StoreUpdateProcesoPeriodoRequest $request, int $id): JsonResponse
    {
        try {
            if (!$this->procesoPeriodoService->getById($id)) {
                return $this->responseService->error('Proceso no encontrado', ResponseAlias::HTTP_NOT_FOUND);
            }
            $this->procesoPeriodoService->update($id, $request->validate($request->rules()));
            return $this->responseService->success("Proceso actualizado correctamente");
        } catch (Exception $e) {
            return $this->responseService->error('Error al actualizar el proceso: ' . $e->getMessage());
        }
    }

    /**
     * Elimina un proceso periodo existente.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            if (!$this->procesoPeriodoService->delete($id)) {
                return $this->responseService->error('Proceso no encontrado', ResponseAlias::HTTP_NOT_FOUND);
            }
            $this->procesoPeriodoService->delete($id);
            return $this->responseService->success("Proceso eliminado correctamente");
        } catch (Exception $e) {
            return $this->responseService->error('Error al eliminar el proceso: ' . $e->getMessage());
        }
    }

    public function obtenerUltimoId(): JsonResponse
    {
        try {
            $ultimoId = $this->procesoPeriodoService->obtenerUltimoId();
            return $this->responseService->success(['id' => $ultimoId]);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener el último ID de proceso: ' . $e->getMessage());
        }
    }

    public function obtenerActual(): JsonResponse
    {
        try {
            $procesoPeriodo = $this->procesoPeriodoService->obtenerActual();
            return $this->responseService->success($procesoPeriodo);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener el proceso actual: ' . $e->getMessage());
        }
    }
    
    /**
     * Cambia el estado de un proceso periodo periodo.
     *
     * @param EstadoEnumRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function cambiarEstado(EstadoEnumRequest $request, int $id): JsonResponse
    {
        try {
            $this->procesoPeriodoService->cambiarEstado($id, $request->validated()['estado']);
            return $this->responseService->success("Estado del proceso actualizado correctamente");
        } catch (Exception $e) {
            return $this->responseService->error('Error al cambiar el estado del proceso: ' . $e->getMessage());
        }
    }

    /**
     * Obtiene todos los proceso periodos activos.
     *
     * @return JsonResponse
     */
    public function obtenerActivos(): JsonResponse
    {
        try {
            $procesoPeriodosActivos = $this->procesoPeriodoService->obtenerActivos();
            return $this->responseService->success($procesoPeriodosActivos);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener los proceso periodos activos: ' . $e->getMessage());
        }
    }


    /**
     * Obtiene todos los proceso periodos con columnas específicas.
     *
     * @return JsonResponse
     */
    public function obtenerTodosConColumnasEspecificas(): JsonResponse
    {
        try {
            $procesoPeriodos = $this->procesoPeriodoService->obtenerConColumnas();
            return $this->responseService->success($procesoPeriodos);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener los proceso periodos: ' . $e->getMessage());
        }
    }

    public function obtenerConNombres(): JsonResponse
    {
        try {
            $procesoPeriodos = $this->procesoPeriodoService->obtenerConNombres();
            return $this->responseService->success($procesoPeriodos);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener los proceso periodos: ' . $e->getMessage());
        }

    }

    public function obtenerPag(Request $request): JsonResponse
    {
        try {
            $criteria = $this->obtenerCriterios($request);
            $procesoPeriodos = $this->procesoPeriodoService->obtenerPaginado($criteria);
            return $this->responseService->success(([
                'data' => $procesoPeriodos->items(),
                'total' => $procesoPeriodos->total(),
            ]));
        } catch (InvalidArgumentException $e) {
            return $this->responseService->error($e->getMessage(), ResponseAlias::HTTP_BAD_REQUEST);
        }
    }
}

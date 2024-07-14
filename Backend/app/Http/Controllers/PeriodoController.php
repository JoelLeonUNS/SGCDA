<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUpdate\StoreUpdatePeriodoRequest;
use App\Http\Requests\Validacion\EstadoBitRequest;
use App\Services\ResponseService;
use App\Services\PeriodoService;
use App\Traits\Http\Controllers\CriterioTrait;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use InvalidArgumentException;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class PeriodoController extends Controller
{
    use CriterioTrait;

    protected PeriodoService $periodoService;
    protected ResponseService $responseService;

    public function __construct(PeriodoService $periodoService, ResponseService $responseService)
    {
        $this->periodoService = $periodoService;
        $this->responseService = $responseService;
    }

    /**
     * Obtiene todos los periodos.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $periodos = $this->periodoService->getAll();
            return $this->responseService->success($periodos);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener los periodos: ' . $e->getMessage());
        }
    }

    /**
     * Obtiene un periodo por su ID.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        try {
            $periodo = $this->periodoService->getById($id);
            return $this->responseService->success($periodo);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener el periodo: ' . $e->getMessage());
        }
    }

    /**
     * Crea un nuevo periodo.
     *
     * @param StoreUpdatePeriodoRequest $request
     * @return JsonResponse
     */
    public function store(StoreUpdatePeriodoRequest $request): JsonResponse
    {
        try {
            $periodo = $this->periodoService->create($request->validate($request->rules()));
            return $this->responseService->success($periodo, ResponseAlias::HTTP_CREATED);
        } catch (Exception $e) {
            return $this->responseService->error('Error al crear el periodo: ' . $e->getMessage());
        }
    }

    /**
     * Actualiza un periodo existente.
     *
     * @param StoreUpdatePeriodoRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(StoreUpdatePeriodoRequest $request, int $id): JsonResponse
    {
        try {
            if (!$this->periodoService->getById($id)) {
                return $this->responseService->error('Periodo no encontrado', ResponseAlias::HTTP_NOT_FOUND);
            }
            $this->periodoService->update($id, $request->validate($request->rules()));
            return $this->responseService->success("Periodo actualizado correctamente");
        } catch (Exception $e) {
            return $this->responseService->error('Error al actualizar el periodo: ' . $e->getMessage());
        }
    }

    /**
     * Elimina un periodo existente.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            if (!$this->periodoService->delete($id)) {
                return $this->responseService->error('Periodo no encontrado', ResponseAlias::HTTP_NOT_FOUND);
            }
            $this->periodoService->delete($id);
            return $this->responseService->success("Periodo eliminado correctamente");
        } catch (Exception $e) {
            return $this->responseService->error('Error al eliminar el periodo: ' . $e->getMessage());
        }
    }

    public function obtenerUltimoId(): JsonResponse
    {
        try {
            $ultimoId = $this->periodoService->obtenerUltimoId();
            return $this->responseService->success(['id' => $ultimoId]);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener el último ID de periodo: ' . $e->getMessage());
        }
    }

    public function obtenerUltimo(): JsonResponse
    {
        try {
            $ultimoPeriodo = $this->periodoService->obtenerUltimo();
            return $this->responseService->success($ultimoPeriodo);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener el último periodo: ' . $e->getMessage());
        }
    }

    /**
     * Cambia el estado de un periodo.
     *
     * @param EstadoBitRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function cambiarEstado(EstadoBitRequest $request, int $id): JsonResponse
    {
        try {
            $this->periodoService->cambiarEstado($id, $request->validated()['estado']);
            return $this->responseService->success("Estado del periodo actualizado correctamente");
        } catch (Exception $e) {
            return $this->responseService->error('Error al cambiar el estado del periodo: ' . $e->getMessage());
        }
    }

    /**
     * Obtiene todos las periodos activas.
     *
     * @return JsonResponse
     */
    public function obtenerActivos(): JsonResponse
    {
        try {
            $periodosActivos = $this->periodoService->obtenerActivos();
            return $this->responseService->success($periodosActivos);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener los periodos activos: ' . $e->getMessage());
        }
    }


    /**
     * Obtiene todos los periodos con columnas específicas.
     *
     * @return JsonResponse
     */
    public function obtenerTodosConColumnasEspecificas(): JsonResponse
    {
        try {
            $periodos = $this->periodoService->obtenerConColumnas();
            return $this->responseService->success($periodos);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener los periodos: ' . $e->getMessage());
        }
    }

    public function obtenerConNombres(): JsonResponse
    {
        try {
            $periodos = $this->periodoService->obtenerConNombres();
            return $this->responseService->success($periodos);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener los periodos: ' . $e->getMessage());
        }

    }

    public function obtenerPag(Request $request): JsonResponse
    {
        try {
            $criteria = $this->obtenerCriterios($request);
            $periodos = $this->periodoService->obtenerPaginado($criteria);
            return $this->responseService->success(([
                'data' => $periodos->items(),
                'total' => $periodos->total(),
            ]));
        } catch (InvalidArgumentException $e) {
            return $this->responseService->error($e->getMessage(), ResponseAlias::HTTP_BAD_REQUEST);
        }
    }
}

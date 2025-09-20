<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUpdate\StoreUpdatePabellonRequest;
use App\Http\Requests\Validacion\EstadoBitRequest;
use App\Http\Requests\Validacion\EstadoEnumRequest;
use App\Services\ResponseService;
use App\Services\PabellonService;
use App\Traits\Http\Controllers\CriterioTrait;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use InvalidArgumentException;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class PabellonController extends Controller
{
    use CriterioTrait;

    protected PabellonService $pabellonService;
    protected ResponseService $responseService;

    public function __construct(PabellonService $pabellonService, ResponseService $responseService)
    {
        $this->pabellonService = $pabellonService;
        $this->responseService = $responseService;
    }

    /**
     * Obtiene todos los pabellones.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $pabellones = $this->pabellonService->getAll();
            return $this->responseService->success($pabellones);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener los pabellones: ' . $e->getMessage());
        }
    }

    /**
     * Obtiene un pabellón por su ID.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        try {
            $comision = $this->pabellonService->getById($id);
            return $this->responseService->success($comision);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener el pabellón: ' . $e->getMessage());
        }
    }

    /**
     * Crea un nuevo comision.
     *
     * @param StoreUpdatePabellonRequest $request
     * @return JsonResponse
     */
    public function store(StoreUpdatePabellonRequest $request): JsonResponse
    {
        try {
            $comision = $this->pabellonService->create($request->validate($request->rules()));
            return $this->responseService->success($comision, ResponseAlias::HTTP_CREATED);
        } catch (Exception $e) {
            return $this->responseService->error('Error al crear el pabellón: ' . $e->getMessage());
        }
    }

    /**
     * Actualiza un pabellón existente.
     *
     * @param StoreUpdatePabellonRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(StoreUpdatePabellonRequest $request, int $id): JsonResponse
    {
        try {
            if (!$this->pabellonService->getById($id)) {
                return $this->responseService->error('Pabellón no encontrado', ResponseAlias::HTTP_NOT_FOUND);
            }
            $this->pabellonService->update($id, $request->validate($request->rules()));
            return $this->responseService->success("Pabellón actualizado correctamente");
        } catch (Exception $e) {
            return $this->responseService->error('Error al actualizar el pabellón: ' . $e->getMessage());
        }
    }

    /**
     * Elimina un pabellón existente.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            if (!$this->pabellonService->delete($id)) {
                return $this->responseService->error('Pabellón no encontrado', ResponseAlias::HTTP_NOT_FOUND);
            }
            $this->pabellonService->delete($id);
            return $this->responseService->success("Pabellón eliminado correctamente");
        } catch (Exception $e) {
            return $this->responseService->error('Error al eliminar el pabellón: ' . $e->getMessage());
        }
    }

    public function obtenerUltimoId(): JsonResponse
    {
        try {
            $ultimoId = $this->pabellonService->obtenerUltimoId();
            return $this->responseService->success(['id' => $ultimoId]);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener el último ID de comision: ' . $e->getMessage());
        }
    }

    public function obtenerUltimo(): JsonResponse
    {
        try {
            $comision = $this->pabellonService->obtenerUltimo();
            return $this->responseService->success($comision);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener el último comision: ' . $e->getMessage());
        }
    }

    /**
     * Cambia el estado de un pabellón.
     *
     * @param EstadoEnumRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function cambiarEstado(EstadoEnumRequest $request, int $id): JsonResponse
    {
        try {
            $this->pabellonService->cambiarEstado($id, $request->validated()['estado']);
            return $this->responseService->success("Estado del pabellón actualizado correctamente");
        } catch (Exception $e) {
            return $this->responseService->error('Error al cambiar el estado del pabellón: ' . $e->getMessage());
        }
    }

    /**
     * Obtiene todos las comisiones activas.
     *
     * @return JsonResponse
     */
    public function obtenerActivos(): JsonResponse
    {
        try {
            $pabellonesActivos = $this->pabellonService->obtenerActivos();
            return $this->responseService->success($pabellonesActivos);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener los pabellones activos: ' . $e->getMessage());
        }
    }


    /**
     * Obtiene todos los pabellones con columnas específicas.
     *
     * @return JsonResponse
     */
    public function obtenerTodosConColumnasEspecificas(): JsonResponse
    {
        try {
            $pabellones = $this->pabellonService->obtenerConColumnas();
            return $this->responseService->success($pabellones);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener los pabellones: ' . $e->getMessage());
        }
    }

    public function obtenerConNombres(): JsonResponse
    {
        try {
            $pabellones = $this->pabellonService->obtenerConNombres();
            return $this->responseService->success($pabellones);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener los pabellones: ' . $e->getMessage());
        }

    }

    public function obtenerPag(Request $request): JsonResponse
    {
        try {
            $criteria = $this->obtenerCriterios($request);
            $pabellones = $this->pabellonService->obtenerPaginado($criteria);
            return $this->responseService->success(([
                'data' => $pabellones->items(),
                'total' => $pabellones->total(),
            ]));
        } catch (InvalidArgumentException $e) {
            return $this->responseService->error($e->getMessage(), ResponseAlias::HTTP_BAD_REQUEST);
        }
    }
}

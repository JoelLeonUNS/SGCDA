<?php

namespace App\Http\Controllers;

use App\Http\Requests\v1\StoreUpdate\StoreUpdateComisionRequest;
use App\Http\Requests\v1\Validacion\EstadoBitRequest;
use App\Services\ResponseService;
use App\Services\ComisionService;
use App\Traits\Http\Controllers\CriterioTrait;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use InvalidArgumentException;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class ComisionController extends Controller
{
    use CriterioTrait;

    protected ComisionService $comisionService;
    protected ResponseService $responseService;

    public function __construct(ComisionService $comisionService, ResponseService $responseService)
    {
        $this->comisionService = $comisionService;
        $this->responseService = $responseService;
    }

    /**
     * Obtiene todos los comisiones.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $comisiones = $this->comisionService->getAll();
            return $this->responseService->success($comisiones);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener los comisiones: ' . $e->getMessage());
        }
    }

    /**
     * Obtiene un comision por su ID.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        try {
            $comision = $this->comisionService->getById($id);
            return $this->responseService->success($comision);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener el comision: ' . $e->getMessage());
        }
    }

    /**
     * Crea un nuevo comision.
     *
     * @param StoreUpdateComisionRequest $request
     * @return JsonResponse
     */
    public function store(StoreUpdateComisionRequest $request): JsonResponse
    {
        try {
            $comision = $this->comisionService->create($request->validate($request->rules()));
            return $this->responseService->success($comision, ResponseAlias::HTTP_CREATED);
        } catch (Exception $e) {
            return $this->responseService->error('Error al crear el comision: ' . $e->getMessage());
        }
    }

    /**
     * Actualiza un comision existente.
     *
     * @param StoreUpdateComisionRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(StoreUpdateComisionRequest $request, int $id): JsonResponse
    {
        try {
            if (!$this->comisionService->getById($id)) {
                return $this->responseService->error('Comision no encontrado', ResponseAlias::HTTP_NOT_FOUND);
            }
            $this->comisionService->update($id, $request->validate($request->rules()));
            return $this->responseService->success("Comision actualizado correctamente");
        } catch (Exception $e) {
            return $this->responseService->error('Error al actualizar el comision: ' . $e->getMessage());
        }
    }

    /**
     * Elimina un comision existente.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            if (!$this->comisionService->delete($id)) {
                return $this->responseService->error('Comision no encontrado', ResponseAlias::HTTP_NOT_FOUND);
            }
            $this->comisionService->delete($id);
            return $this->responseService->success("Comision eliminado correctamente");
        } catch (Exception $e) {
            return $this->responseService->error('Error al eliminar el comision: ' . $e->getMessage());
        }
    }

    public function obtenerUltimoId(): JsonResponse
    {
        try {
            $ultimoId = $this->comisionService->obtenerUltimoId();
            return $this->responseService->success(['id' => $ultimoId]);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener el último ID de comision: ' . $e->getMessage());
        }
    }

    /**
     * Cambia el estado de un comision.
     *
     * @param EstadoBitRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function cambiarEstado(EstadoBitRequest $request, int $id): JsonResponse
    {
        try {
            $this->comisionService->cambiarEstado($id, $request->validated()['estado']);
            return $this->responseService->success("Estado del comision actualizado correctamente");
        } catch (Exception $e) {
            return $this->responseService->error('Error al cambiar el estado del comision: ' . $e->getMessage());
        }
    }

    /**
     * Obtiene todos los tipos de documento activos.
     *
     * @return JsonResponse
     */
    public function obtenerActivos(): JsonResponse
    {
        try {
            $comisionesActivos = $this->comisionService->obtenerActivos();
            return $this->responseService->success($comisionesActivos);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener los comisiones activos: ' . $e->getMessage());
        }
    }


    /**
     * Obtiene todos los comisiones con columnas específicas.
     *
     * @return JsonResponse
     */
    public function obtenerTodosConColumnasEspecificas(): JsonResponse
    {
        try {
            $comisiones = $this->comisionService->obtenerConColumnas();
            return $this->responseService->success($comisiones);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener los comisiones: ' . $e->getMessage());
        }
    }

    public function obtenerConNombres(): JsonResponse
    {
        try {
            $comisiones = $this->comisionService->obtenerConNombres();
            return $this->responseService->success($comisiones);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener los comisiones: ' . $e->getMessage());
        }

    }

    public function obtenerPag(Request $request): JsonResponse
    {
        try {
            $criteria = $this->obtenerCriterios($request);
            $comisiones = $this->comisionService->obtenerPaginado($criteria);
            return $this->responseService->success(([
                'data' => $comisiones->items(),
                'total' => $comisiones->total(),
            ]));
        } catch (InvalidArgumentException $e) {
            return $this->responseService->error($e->getMessage(), ResponseAlias::HTTP_BAD_REQUEST);
        }
    }
}

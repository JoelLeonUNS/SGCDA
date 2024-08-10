<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUpdate\StoreUpdateAulaRequest;
use App\Http\Requests\Validacion\EstadoBitRequest;
use App\Services\ResponseService;
use App\Services\AulaService;
use App\Traits\Http\Controllers\CriterioTrait;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use InvalidArgumentException;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class AulaController extends Controller
{
    use CriterioTrait;

    protected AulaService $aulaService;
    protected ResponseService $responseService;

    public function __construct(AulaService $aulaService, ResponseService $responseService)
    {
        $this->aulaService = $aulaService;
        $this->responseService = $responseService;
    }

    /**
     * Obtiene todos las aulas.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $aulas = $this->aulaService->getAll();
            return $this->responseService->success($aulas);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener las aulas: ' . $e->getMessage());
        }
    }

    /**
     * Obtiene un aula por su ID.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        try {
            $comision = $this->aulaService->getById($id);
            return $this->responseService->success($comision);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener el aula: ' . $e->getMessage());
        }
    }

    /**
     * Crea un nuevo comision.
     *
     * @param StoreUpdateAulaRequest $request
     * @return JsonResponse
     */
    public function store(StoreUpdateAulaRequest $request): JsonResponse
    {
        try {
            $comision = $this->aulaService->create($request->validate($request->rules()));
            return $this->responseService->success($comision, ResponseAlias::HTTP_CREATED);
        } catch (Exception $e) {
            return $this->responseService->error('Error al crear el aula: ' . $e->getMessage());
        }
    }

    /**
     * Actualiza un aula existente.
     *
     * @param StoreUpdateAulaRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(StoreUpdateAulaRequest $request, int $id): JsonResponse
    {
        try {
            if (!$this->aulaService->getById($id)) {
                return $this->responseService->error('Aula no encontrado', ResponseAlias::HTTP_NOT_FOUND);
            }
            $this->aulaService->update($id, $request->validate($request->rules()));
            return $this->responseService->success("Aula actualizado correctamente");
        } catch (Exception $e) {
            return $this->responseService->error('Error al actualizar el aula: ' . $e->getMessage());
        }
    }

    /**
     * Elimina un aula existente.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            if (!$this->aulaService->delete($id)) {
                return $this->responseService->error('Aula no encontrado', ResponseAlias::HTTP_NOT_FOUND);
            }
            $this->aulaService->delete($id);
            return $this->responseService->success("Aula eliminado correctamente");
        } catch (Exception $e) {
            return $this->responseService->error('Error al eliminar el aula: ' . $e->getMessage());
        }
    }

    public function obtenerUltimoId(): JsonResponse
    {
        try {
            $ultimoId = $this->aulaService->obtenerUltimoId();
            return $this->responseService->success(['id' => $ultimoId]);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener el último ID de comision: ' . $e->getMessage());
        }
    }

    public function obtenerUltimo(): JsonResponse
    {
        try {
            $comision = $this->aulaService->obtenerUltimo();
            return $this->responseService->success($comision);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener el último comision: ' . $e->getMessage());
        }
    }

    /**
     * Cambia el estado de un aula.
     *
     * @param EstadoBitRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function cambiarEstado(EstadoBitRequest $request, int $id): JsonResponse
    {
        try {
            $this->aulaService->cambiarEstado($id, $request->validated()['estado']);
            return $this->responseService->success("Estado del pabellón actualizado correctamente");
        } catch (Exception $e) {
            return $this->responseService->error('Error al cambiar el estado del pabellón: ' . $e->getMessage());
        }
    }

    /**
     * Obtiene todos las aulas activas.
     *
     * @return JsonResponse
     */
    public function obtenerActivos(): JsonResponse
    {
        try {
            $aulasActivos = $this->aulaService->obtenerActivos();
            return $this->responseService->success($aulasActivos);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener las aulas activos: ' . $e->getMessage());
        }
    }


    /**
     * Obtiene todos las aulas con columnas específicas.
     *
     * @return JsonResponse
     */
    public function obtenerTodosConColumnasEspecificas(): JsonResponse
    {
        try {
            $aulas = $this->aulaService->obtenerConColumnas();
            return $this->responseService->success($aulas);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener las aulas: ' . $e->getMessage());
        }
    }

    public function obtenerConNombres(): JsonResponse
    {
        try {
            $aulas = $this->aulaService->obtenerConNombres();
            return $this->responseService->success($aulas);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener las aulas: ' . $e->getMessage());
        }

    }

    public function obtenerPag(Request $request): JsonResponse
    {
        try {
            $criteria = $this->obtenerCriterios($request);
            $aulas = $this->aulaService->obtenerPaginado($criteria);
            return $this->responseService->success(([
                'data' => $aulas->items(),
                'total' => $aulas->total(),
            ]));
        } catch (InvalidArgumentException $e) {
            return $this->responseService->error($e->getMessage(), ResponseAlias::HTTP_BAD_REQUEST);
        }
    }
}

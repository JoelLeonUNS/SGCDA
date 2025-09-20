<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUpdate\StoreUpdateComisionAulaRequest;
use App\Http\Requests\Validacion\EstadoEnumRequest;
use App\Services\ResponseService;
use App\Services\ComisionAulaService;
use App\Traits\Http\Controllers\CriterioTrait;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use InvalidArgumentException;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class ComisionAulaController extends Controller
{
    use CriterioTrait;

    protected ComisionAulaService $comisionAulaService;
    protected ResponseService $responseService;

    public function __construct(ComisionAulaService $comisionAulaService, ResponseService $responseService)
    {
        $this->comisionAulaService = $comisionAulaService;
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
            $aulas = $this->comisionAulaService->getAll();
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
            $comision = $this->comisionAulaService->getById($id);
            return $this->responseService->success($comision);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener el aula: ' . $e->getMessage());
        }
    }

    /**
     * Crea un nuevo comision.
     *
     * @param StoreUpdateComisionAulaRequest $request
     * @return JsonResponse
     */
    public function store(StoreUpdateComisionAulaRequest $request): JsonResponse
    {
        try {
            $comision = $this->comisionAulaService->create($request->validate($request->rules()));
            return $this->responseService->success($comision, ResponseAlias::HTTP_CREATED);
        } catch (Exception $e) {
            return $this->responseService->error('Error al crear el aula: ' . $e->getMessage());
        }
    }

    /**
     * Actualiza un aula existente.
     *
     * @param StoreUpdateComisionAulaRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(StoreUpdateComisionAulaRequest $request, int $id): JsonResponse
    {
        try {
            if (!$this->comisionAulaService->getById($id)) {
                return $this->responseService->error('Aula no encontrado', ResponseAlias::HTTP_NOT_FOUND);
            }
            $this->comisionAulaService->update($id, $request->validate($request->rules()));
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
            if (!$this->comisionAulaService->delete($id)) {
                return $this->responseService->error('Aula no encontrado', ResponseAlias::HTTP_NOT_FOUND);
            }
            $this->comisionAulaService->delete($id);
            return $this->responseService->success("Aula eliminado correctamente");
        } catch (Exception $e) {
            return $this->responseService->error('Error al eliminar el aula: ' . $e->getMessage());
        }
    }

    public function obtenerUltimoId(): JsonResponse
    {
        try {
            $ultimoId = $this->comisionAulaService->obtenerUltimoId();
            return $this->responseService->success(['id' => $ultimoId]);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener el último ID de comision: ' . $e->getMessage());
        }
    }

    public function obtenerUltimo(): JsonResponse
    {
        try {
            $comision = $this->comisionAulaService->obtenerUltimo();
            return $this->responseService->success($comision);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener el último comision: ' . $e->getMessage());
        }
    }

    /**
     * Cambia el estado de un aula.
     *
     * @param EstadoEnumRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function cambiarEstado(EstadoEnumRequest $request, int $id): JsonResponse
    {
        try {
            $this->comisionAulaService->cambiarEstado($id, $request->validated()['estado']);
            return $this->responseService->success("Estado del aula actualizado correctamente");
        } catch (Exception $e) {
            return $this->responseService->error('Error al cambiar el estado del aula: ' . $e->getMessage());
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
            $aulasActivos = $this->comisionAulaService->obtenerActivos();
            return $this->responseService->success($aulasActivos);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener las aulas activos: ' . $e->getMessage());
        }
    }

    public function obtenerConNombres(): JsonResponse
    {
        try {
            $aulas = $this->comisionAulaService->obtenerConNombres();
            return $this->responseService->success($aulas);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener las aulas: ' . $e->getMessage());
        }

    }

    public function obtenerPag(Request $request): JsonResponse
    {
        try {
            $criteria = $this->obtenerCriterios($request);
            $aulas = $this->comisionAulaService->obtenerPaginado($criteria);
            return $this->responseService->success(([
                'data' => $aulas->items(),
                'total' => $aulas->total(),
            ]));
        } catch (InvalidArgumentException $e) {
            return $this->responseService->error($e->getMessage(), ResponseAlias::HTTP_BAD_REQUEST);
        }
    }
}

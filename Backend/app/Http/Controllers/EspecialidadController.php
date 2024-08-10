<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUpdate\StoreUpdateEspecialidadRequest;
use App\Http\Requests\Validacion\EstadoBitRequest;
use App\Services\ResponseService;
use App\Services\EspecialidadService;
use App\Traits\Http\Controllers\CriterioTrait;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use InvalidArgumentException;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class EspecialidadController extends Controller
{
    use CriterioTrait;

    protected EspecialidadService $especialidadService;
    protected ResponseService $responseService;

    public function __construct(EspecialidadService $especialidadService, ResponseService $responseService)
    {
        $this->especialidadService = $especialidadService;
        $this->responseService = $responseService;
    }

    /**
     * Obtiene todos las especialidades.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $especialidads = $this->especialidadService->getAll();
            return $this->responseService->success($especialidads);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener las especialidades: ' . $e->getMessage());
        }
    }

    /**
     * Obtiene una especialidad por su ID.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        try {
            $comision = $this->especialidadService->getById($id);
            return $this->responseService->success($comision);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener la especialidad: ' . $e->getMessage());
        }
    }

    /**
     * Crea un nuevo comision.
     *
     * @param StoreUpdateEspecialidadRequest $request
     * @return JsonResponse
     */
    public function store(StoreUpdateEspecialidadRequest $request): JsonResponse
    {
        try {
            $comision = $this->especialidadService->create($request->validate($request->rules()));
            return $this->responseService->success($comision, ResponseAlias::HTTP_CREATED);
        } catch (Exception $e) {
            return $this->responseService->error('Error al crear la especialidad: ' . $e->getMessage());
        }
    }

    /**
     * Actualiza una especialidad existente.
     *
     * @param StoreUpdateEspecialidadRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(StoreUpdateEspecialidadRequest $request, int $id): JsonResponse
    {
        try {
            if (!$this->especialidadService->getById($id)) {
                return $this->responseService->error('Especialidad no encontrado', ResponseAlias::HTTP_NOT_FOUND);
            }
            $this->especialidadService->update($id, $request->validate($request->rules()));
            return $this->responseService->success("Especialidad actualizado correctamente");
        } catch (Exception $e) {
            return $this->responseService->error('Error al actualizar la especialidad: ' . $e->getMessage());
        }
    }

    /**
     * Elimina una especialidad existente.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            if (!$this->especialidadService->delete($id)) {
                return $this->responseService->error('Especialidad no encontrado', ResponseAlias::HTTP_NOT_FOUND);
            }
            $this->especialidadService->delete($id);
            return $this->responseService->success("Especialidad eliminado correctamente");
        } catch (Exception $e) {
            return $this->responseService->error('Error al eliminar la especialidad: ' . $e->getMessage());
        }
    }

    public function obtenerUltimoId(): JsonResponse
    {
        try {
            $ultimoId = $this->especialidadService->obtenerUltimoId();
            return $this->responseService->success(['id' => $ultimoId]);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener el último ID de la especialidad: ' . $e->getMessage());
        }
    }

    public function obtenerUltimo(): JsonResponse
    {
        try {
            $comision = $this->especialidadService->obtenerUltimo();
            return $this->responseService->success($comision);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener el última especialidad: ' . $e->getMessage());
        }
    }

    /**
     * Cambia el estado de una especialidad.
     *
     * @param EstadoBitRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function cambiarEstado(EstadoBitRequest $request, int $id): JsonResponse
    {
        try {
            $this->especialidadService->cambiarEstado($id, $request->validated()['estado']);
            return $this->responseService->success("Estado de la especialidad actualizado correctamente");
        } catch (Exception $e) {
            return $this->responseService->error('Error al cambiar el estado de la especialidad: ' . $e->getMessage());
        }
    }

    /**
     * Obtiene todos las especialidades activas.
     *
     * @return JsonResponse
     */
    public function obtenerActivos(): JsonResponse
    {
        try {
            $especialidadsActivos = $this->especialidadService->obtenerActivos();
            return $this->responseService->success($especialidadsActivos);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener las especialidades activos: ' . $e->getMessage());
        }
    }

    public function obtenerPag(Request $request): JsonResponse
    {
        try {
            $criteria = $this->obtenerCriterios($request);
            $especialidads = $this->especialidadService->obtenerPaginado($criteria);
            return $this->responseService->success(([
                'data' => $especialidads->items(),
                'total' => $especialidads->total(),
            ]));
        } catch (InvalidArgumentException $e) {
            return $this->responseService->error($e->getMessage(), ResponseAlias::HTTP_BAD_REQUEST);
        }
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUpdate\StoreUpdateMiembroRequest;
use App\Http\Requests\Validacion\EstadoBitRequest;
use App\Services\ResponseService;
use App\Services\MiembroService;
use App\Traits\Http\Controllers\CriterioTrait;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use InvalidArgumentException;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class MiembroController extends Controller
{
    use CriterioTrait;

    protected MiembroService $miembroService;
    protected ResponseService $responseService;

    public function __construct(MiembroService $miembroService, ResponseService $responseService)
    {
        $this->miembroService = $miembroService;
        $this->responseService = $responseService;
    }

    /**
     * Obtiene todos los miembros.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $miembros = $this->miembroService->getAll();
            return $this->responseService->success($miembros);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener los miembros: ' . $e->getMessage());
        }
    }

    /**
     * Obtiene un miembro por su ID.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        try {
            $miembro = $this->miembroService->getById($id);
            return $this->responseService->success($miembro);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener el miembro: ' . $e->getMessage());
        }
    }

    /**
     * Crea un nuevo miembro.
     *
     * @param StoreUpdateMiembroRequest $request
     * @return JsonResponse
     */
    public function store(StoreUpdateMiembroRequest $request): JsonResponse
    {
        try {
            $miembro = $this->miembroService->create($request->validate($request->rules()));
            return $this->responseService->success($miembro, ResponseAlias::HTTP_CREATED);
        } catch (Exception $e) {
            return $this->responseService->error('Error al crear el miembro: ' . $e->getMessage());
        }
    }

    /**
     * Actualiza un miembro existente.
     *
     * @param StoreUpdateMiembroRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(StoreUpdateMiembroRequest $request, int $id): JsonResponse
    {
        try {
            if (!$this->miembroService->getById($id)) {
                return $this->responseService->error('Miembro no encontrado', ResponseAlias::HTTP_NOT_FOUND);
            }
            $this->miembroService->update($id, $request->validate($request->rules()));
            return $this->responseService->success("Miembro actualizado correctamente");
        } catch (Exception $e) {
            return $this->responseService->error('Error al actualizar el miembro: ' . $e->getMessage());
        }
    }

    /**
     * Elimina un miembro existente.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            if (!$this->miembroService->delete($id)) {
                return $this->responseService->error('Miembro no encontrado', ResponseAlias::HTTP_NOT_FOUND);
            }
            $this->miembroService->delete($id);
            return $this->responseService->success("Miembro eliminado correctamente");
        } catch (Exception $e) {
            return $this->responseService->error('Error al eliminar el miembro: ' . $e->getMessage());
        }
    }

    public function obtenerUltimoId(): JsonResponse
    {
        try {
            $ultimoId = $this->miembroService->obtenerUltimoId();
            return $this->responseService->success(['id' => $ultimoId]);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener el último ID de miembro: ' . $e->getMessage());
        }
    }

    /**
     * Cambia el estado de un miembro.
     *
     * @param EstadoBitRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function cambiarEstado(EstadoBitRequest $request, int $id): JsonResponse
    {
        try {
            $this->miembroService->cambiarEstado($id, $request->validated()['estado']);
            return $this->responseService->success("Estado del miembro actualizado correctamente");
        } catch (Exception $e) {
            return $this->responseService->error('Error al cambiar el estado del miembro: ' . $e->getMessage());
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
            $miembrosActivos = $this->miembroService->obtenerActivos();
            return $this->responseService->success($miembrosActivos);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener los miembros activos: ' . $e->getMessage());
        }
    }


    /**
     * Obtiene todos los miembros con columnas específicas.
     *
     * @return JsonResponse
     */
    public function obtenerTodosConColumnasEspecificas(): JsonResponse
    {
        try {
            $miembros = $this->miembroService->obtenerConColumnas();
            return $this->responseService->success($miembros);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener los miembros: ' . $e->getMessage());
        }
    }

    public function obtenerConNombres(): JsonResponse
    {
        try {
            $miembros = $this->miembroService->obtenerConNombres();
            return $this->responseService->success($miembros);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener los miembros: ' . $e->getMessage());
        }

    }

    public function obtenerPag(Request $request): JsonResponse
    {
        try {
            $criteria = $this->obtenerCriterios($request);
            $miembros = $this->miembroService->obtenerPaginado($criteria);
            return $this->responseService->success(([
                'data' => $miembros->items(),
                'total' => $miembros->total(),
            ]));
        } catch (InvalidArgumentException $e) {
            return $this->responseService->error($e->getMessage(), ResponseAlias::HTTP_BAD_REQUEST);
        }
    }
}

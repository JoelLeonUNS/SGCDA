<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUpdate\StoreUpdateMiembroCargoRequest;
use App\Http\Requests\Validacion\EstadoBitRequest;
use App\Http\Requests\Validacion\EstadoEnumRequest;
use App\Services\ResponseService;
use App\Services\MiembroCargoService;
use App\Traits\Http\Controllers\CriterioTrait;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use InvalidArgumentException;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class MiembroCargoController extends Controller
{
    use CriterioTrait;

    protected MiembroCargoService $miembroCargoService;
    protected ResponseService $responseService;

    public function __construct(MiembroCargoService $miembroCargoService, ResponseService $responseService)
    {
        $this->miembroCargoService = $miembroCargoService;
        $this->responseService = $responseService;
    }

    /**
     * Obtiene todos los miembro cargos.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $miembroCargos = $this->miembroCargoService->getAll();
            return $this->responseService->success($miembroCargos);
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
            $miembroCargo = $this->miembroCargoService->getById($id);
            return $this->responseService->success($miembroCargo);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener el miembro cargo: ' . $e->getMessage());
        }
    }

    /**
     * Crea un nuevo miembro.
     *
     * @param StoreUpdateMiembroCargoRequest $request
     * @return JsonResponse
     */
    public function store(StoreUpdateMiembroCargoRequest $request): JsonResponse
    {
        try {
            $miembroCargo = $this->miembroCargoService->create($request->validate($request->rules()));
            return $this->responseService->success($miembroCargo, ResponseAlias::HTTP_CREATED);
        } catch (Exception $e) {
            return $this->responseService->error('Error al crear el miembro cargo: ' . $e->getMessage());
        }
    }

    /**
     * Actualiza un miembro existente.
     *
     * @param StoreUpdateMiembroCargoRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(StoreUpdateMiembroCargoRequest $request, int $id): JsonResponse
    {
        try {
            if (!$this->miembroCargoService->getById($id)) {
                return $this->responseService->error('Miembro no encontrado', ResponseAlias::HTTP_NOT_FOUND);
            }
            $this->miembroCargoService->update($id, $request->validate($request->rules()));
            return $this->responseService->success("Miembro actualizado correctamente");
        } catch (Exception $e) {
            return $this->responseService->error('Error al actualizar el miembro cargo: ' . $e->getMessage());
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
            if (!$this->miembroCargoService->delete($id)) {
                return $this->responseService->error('Miembro no encontrado', ResponseAlias::HTTP_NOT_FOUND);
            }
            $this->miembroCargoService->delete($id);
            return $this->responseService->success("Miembro eliminado correctamente");
        } catch (Exception $e) {
            return $this->responseService->error('Error al eliminar el miembro cargo: ' . $e->getMessage());
        }
    }

    public function obtenerUltimoId(): JsonResponse
    {
        try {
            $ultimoId = $this->miembroCargoService->obtenerUltimoId();
            return $this->responseService->success(['id' => $ultimoId]);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener el último ID de miembro: ' . $e->getMessage());
        }
    }

    /**
     * Cambia el estado de un miembro.
     *
     * @param EstadoEnumRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function cambiarEstado(EstadoEnumRequest $request, int $id): JsonResponse
    {
        try {
            $this->miembroCargoService->cambiarEstado($id, $request->validated()['estado']);
            return $this->responseService->success("Estado del miembro cargo actualizado correctamente");
        } catch (Exception $e) {
            return $this->responseService->error('Error al cambiar el estado del miembro cargo: ' . $e->getMessage());
        }
    }

    /**
     * Obtiene todos los miembro cargos activos.
     *
     * @return JsonResponse
     */
    public function obtenerActivos(): JsonResponse
    {
        try {
            $miembroCargosActivos = $this->miembroCargoService->obtenerActivos();
            return $this->responseService->success($miembroCargosActivos);
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
            $miembroCargos = $this->miembroCargoService->obtenerConColumnas();
            return $this->responseService->success($miembroCargos);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener los miembros: ' . $e->getMessage());
        }
    }

    public function obtenerConNombres(): JsonResponse
    {
        try {
            $miembroCargos = $this->miembroCargoService->obtenerConNombres();
            return $this->responseService->success($miembroCargos);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener los miembros: ' . $e->getMessage());
        }

    }

    public function obtenerPag(Request $request): JsonResponse
    {
        try {
            $criteria = $this->obtenerCriterios($request);
            $miembroCargos = $this->miembroCargoService->obtenerPaginado($criteria);
            return $this->responseService->success(([
                'data' => $miembroCargos->items(),
                'total' => $miembroCargos->total(),
            ]));
        } catch (InvalidArgumentException $e) {
            return $this->responseService->error($e->getMessage(), ResponseAlias::HTTP_BAD_REQUEST);
        }
    }

    public function obtenerParticipacionMiembrosPag(Request $request): JsonResponse
    {
        try {
            $criteria = $this->obtenerCriterios($request);
            $miembroCargos = $this->miembroCargoService->obtenerParticipacionMiembrosPag($criteria);
            return $this->responseService->success(([
                'data' => $miembroCargos->items(),
                'total' => $miembroCargos->total(),
            ]));
        } catch (InvalidArgumentException $e) {
            return $this->responseService->error($e->getMessage(), ResponseAlias::HTTP_BAD_REQUEST);
        }
    }
}

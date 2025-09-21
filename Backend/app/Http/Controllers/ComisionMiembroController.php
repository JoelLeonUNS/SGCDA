<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUpdate\StoreUpdateComisionMiembroRequest;
use App\Http\Requests\Validacion\EstadoBitRequest;
use App\Services\ResponseService;
use App\Services\ComisionMiembroService;
use App\Traits\Http\Controllers\CriterioTrait;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use InvalidArgumentException;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class ComisionMiembroController extends Controller
{
    use CriterioTrait;

    protected ComisionMiembroService $comisionMiembroService;
    protected ResponseService $responseService;

    public function __construct(ComisionMiembroService $comisionMiembroService, ResponseService $responseService)
    {
        $this->comisionMiembroService = $comisionMiembroService;
        $this->responseService = $responseService;
    }

    /**
     * Obtiene todos los comision miembros.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $comisionMiembros = $this->comisionMiembroService->getAll();
            return $this->responseService->success($comisionMiembros);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener los comision miembros: ' . $e->getMessage());
        }
    }

    /**
     * Obtiene una comisión miembro por su ID.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        try {
            $comisionMiembro = $this->comisionMiembroService->getById($id);
            return $this->responseService->success($comisionMiembro);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener el miembro: ' . $e->getMessage());
        }
    }

    /**
     * Crea un nuevo miembro.
     *
     * @param StoreUpdateComisionMiembroRequest $request
     * @return JsonResponse
     */
    public function store(StoreUpdateComisionMiembroRequest $request): JsonResponse
    {
        try {
            $comisionMiembro = $this->comisionMiembroService->create($request->validate($request->rules()));
            return $this->responseService->success($comisionMiembro, ResponseAlias::HTTP_CREATED);
        } catch (Exception $e) {
            return $this->responseService->error('Error al crear el miembro: ' . $e->getMessage());
        }
    }

    /**
     * Actualiza una comisión miembro existente.
     *
     * @param StoreUpdateComisionMiembroRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(StoreUpdateComisionMiembroRequest $request, int $id): JsonResponse
    {
        try {
            if (!$this->comisionMiembroService->getById($id)) {
                return $this->responseService->error('Miembro no encontrado', ResponseAlias::HTTP_NOT_FOUND);
            }
            $this->comisionMiembroService->update($id, $request->validate($request->rules()));
            return $this->responseService->success("Miembro actualizado correctamente");
        } catch (Exception $e) {
            return $this->responseService->error('Error al actualizar el miembro: ' . $e->getMessage());
        }
    }

    /**
     * Elimina una comisión miembro existente.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            if (!$this->comisionMiembroService->delete($id)) {
                return $this->responseService->error('Miembro no encontrado', ResponseAlias::HTTP_NOT_FOUND);
            }
            $this->comisionMiembroService->delete($id);
            return $this->responseService->success("Miembro eliminado correctamente");
        } catch (Exception $e) {
            return $this->responseService->error('Error al eliminar el miembro: ' . $e->getMessage());
        }
    }

    public function obtenerUltimoId(): JsonResponse
    {
        try {
            $ultimoId = $this->comisionMiembroService->obtenerUltimoId();
            return $this->responseService->success(['id' => $ultimoId]);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener el último ID de miembro: ' . $e->getMessage());
        }
    }

    /**
     * Cambia el estado de una comisión miembro.
     *
     * @param EstadoBitRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function cambiarEstado(EstadoBitRequest $request, int $id): JsonResponse
    {
        try {
            $this->comisionMiembroService->cambiarEstado($id, $request->validated()['estado']);
            return $this->responseService->success("Estado de la comision miembro actualizado correctamente");
        } catch (Exception $e) {
            return $this->responseService->error('Error al cambiar el estado de la comision miembro: ' . $e->getMessage());
        }
    }

    /**
     * Obtiene todos los comision miembros activos.
     *
     * @return JsonResponse
     */
    public function obtenerActivos(): JsonResponse
    {
        try {
            $comisionMiembrosActivos = $this->comisionMiembroService->obtenerActivos();
            return $this->responseService->success($comisionMiembrosActivos);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener los comision miembros activos: ' . $e->getMessage());
        }
    }


    /**
     * Obtiene todos los comision miembros con columnas específicas.
     *
     * @return JsonResponse
     */
    public function obtenerTodosConColumnasEspecificas(): JsonResponse
    {
        try {
            $comisionMiembros = $this->comisionMiembroService->obtenerConColumnas();
            return $this->responseService->success($comisionMiembros);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener los comision miembros: ' . $e->getMessage());
        }
    }

    public function obtenerConNombres(): JsonResponse
    {
        try {
            $comisionMiembros = $this->comisionMiembroService->obtenerConNombres();
            return $this->responseService->success($comisionMiembros);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener los comision miembros: ' . $e->getMessage());
        }

    }

    public function obtenerMiembrosPorComision(int $comisionId): JsonResponse
    {
        try {
            $miembros = $this->comisionMiembroService->obtenerMiembrosPorComision($comisionId);
            return $this->responseService->success($miembros);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener los miembros de la comisión: ' . $e->getMessage());
        }
    }

    public function obtenerPag(Request $request): JsonResponse
    {
        try {
            $criteria = $this->obtenerCriterios($request);
            $comisionMiembros = $this->comisionMiembroService->obtenerPaginado($criteria);
            return $this->responseService->success(([
                'data' => $comisionMiembros->items(),
                'total' => $comisionMiembros->total(),
            ]));
        } catch (InvalidArgumentException $e) {
            return $this->responseService->error($e->getMessage(), ResponseAlias::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Obtiene miembros disponibles para asignar a un aula (no asignados a ningún aula)
     *
     * @param int $comisionProcesoId
     * @return JsonResponse
     */
    public function obtenerMiembrosDisponiblesParaAula(int $comisionProcesoId): JsonResponse
    {
        try {
            $miembros = $this->comisionMiembroService->obtenerMiembrosDisponiblesParaAula($comisionProcesoId);
            return $this->responseService->success($miembros);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener miembros disponibles: ' . $e->getMessage());
        }
    }

    /**
     * Obtiene miembros asignados a un aula específica
     *
     * @param int $aulaId
     * @return JsonResponse
     */
    public function obtenerMiembrosAsignadosAula(int $aulaId): JsonResponse
    {
        try {
            $miembros = $this->comisionMiembroService->obtenerMiembrosAsignadosAula($aulaId);
            return $this->responseService->success($miembros);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener miembros asignados: ' . $e->getMessage());
        }
    }

    /**
     * Asigna miembros a un aula específica
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function asignarMiembrosAula(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'aula_id' => 'required|integer|exists:aulas,id',
                'comision_proceso_id' => 'required|integer|exists:comision_procesos,id',
                'miembros_ids' => 'required|array',
                'miembros_ids.*' => 'required|integer|exists:comision_miembros,id',
                'encargado_id' => 'required|integer|exists:comision_miembros,id'
            ]);

            $resultado = $this->comisionMiembroService->asignarMiembrosAula($request->all());
            return $this->responseService->success($resultado);
        } catch (Exception $e) {
            return $this->responseService->error('Error al asignar miembros al aula: ' . $e->getMessage());
        }
    }

    /**
     * Remueve miembros de un aula específica
     *
     * @param Request $request
     * @param int $aulaId
     * @return JsonResponse
     */
    public function removerMiembrosAula(Request $request, int $aulaId): JsonResponse
    {
        try {
            $request->validate([
                'miembros_ids' => 'required|array',
                'miembros_ids.*' => 'integer|exists:comision_miembros,id'
            ]);

            $resultado = $this->comisionMiembroService->removerMiembrosAula($aulaId, $request->miembros_ids);
            return $this->responseService->success($resultado);
        } catch (Exception $e) {
            return $this->responseService->error('Error al remover miembros del aula: ' . $e->getMessage());
        }
    }
}

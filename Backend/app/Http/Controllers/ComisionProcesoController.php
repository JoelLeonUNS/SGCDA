<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUpdate\StoreUpdateComisionProcesoRequest;
use App\Http\Requests\Validacion\EstadoBitRequest;
use App\Http\Requests\Validacion\EstadoEnumRequest;
use App\Services\ResponseService;
use App\Services\ComisionProcesoService;
use App\Traits\Http\Controllers\CriterioTrait;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use InvalidArgumentException;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class ComisionProcesoController extends Controller
{
    use CriterioTrait;

    protected ComisionProcesoService $comisionProcesoService;
    protected ResponseService $responseService;

    public function __construct(ComisionProcesoService $comisionProcesoService, ResponseService $responseService)
    {
        $this->comisionProcesoService = $comisionProcesoService;
        $this->responseService = $responseService;
    }

    /**
     * Obtiene todos los comisionProcesos.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $comisionProcesos = $this->comisionProcesoService->getAll();
            return $this->responseService->success($comisionProcesos);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener los comisionProcesos: ' . $e->getMessage());
        }
    }

    /**
     * Obtiene un comision procesospor su ID.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        try {
            $comisionProcesos= $this->comisionProcesoService->getById($id);
            return $this->responseService->success($comisionProcesos);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener el comision: ' . $e->getMessage());
        }
    }

    /**
     * Obtiene una comisión proceso completa con todos sus datos relacionados.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function showCompleto(int $id): JsonResponse
    {
        try {
            $comisionProcesoCompleta = $this->comisionProcesoService->getCompletoById($id);
            return $this->responseService->success($comisionProcesoCompleta);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener la comisión completa: ' . $e->getMessage());
        }
    }

    /**
     * Crea un nuevo comision.
     *
     * @param StoreUpdateComisionProcesoRequest $request
     * @return JsonResponse
     */
    public function store(StoreUpdateComisionProcesoRequest $request): JsonResponse
    {
        try {
            $comisionProceso = $this->comisionProcesoService->create($request->validate($request->rules()));
            return $this->responseService->success($comisionProceso, ResponseAlias::HTTP_CREATED);
        } catch (Exception $e) {
            return $this->responseService->error('Error al crear el comision: ' . $e->getMessage());
        }
    }

    /**
     * Crea una nueva comisión con horarios y aulas completos.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function storeCompleto(Request $request): JsonResponse
    {
        try {
            $comisionProceso = $this->comisionProcesoService->createCompleto($request->all());
            return $this->responseService->success($comisionProceso, ResponseAlias::HTTP_CREATED);
        } catch (Exception $e) {
            return $this->responseService->error('Error al crear la comisión completa: ' . $e->getMessage());
        }
    }

    /**
     * Actualiza una comisión proceso completa con horarios y aulas.
     * Nota: La comisión (comision_id) no puede ser modificada para mantener la integridad de datos.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function updateCompleto(Request $request, int $id): JsonResponse
    {
        try {
            $comisionProceso = $this->comisionProcesoService->updateCompleto($id, $request->all());
            return $this->responseService->success($comisionProceso, ResponseAlias::HTTP_OK);
        } catch (Exception $e) {
            return $this->responseService->error('Error al actualizar la comisión completa: ' . $e->getMessage());
        }
    }

    /**
     * Actualiza un comision procesosexistente.
     *
     * @param StoreUpdateComisionProcesoRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(StoreUpdateComisionProcesoRequest $request, int $id): JsonResponse
    {
        try {
            if (!$this->comisionProcesoService->getById($id)) {
                return $this->responseService->error('ComisionProceso no encontrado', ResponseAlias::HTTP_NOT_FOUND);
            }
            $this->comisionProcesoService->update($id, $request->validate($request->rules()));
            return $this->responseService->success("Comision proceso actualizado correctamente");
        } catch (Exception $e) {
            return $this->responseService->error('Error al actualizar el comision: ' . $e->getMessage());
        }
    }

    /**
     * Elimina un comision procesosexistente.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            if (!$this->comisionProcesoService->delete($id)) {
                return $this->responseService->error('Comision proceso no encontrado', ResponseAlias::HTTP_NOT_FOUND);
            }
            $this->comisionProcesoService->delete($id);
            return $this->responseService->success("Comision proceso eliminado correctamente");
        } catch (Exception $e) {
            return $this->responseService->error('Error al eliminar el comision: ' . $e->getMessage());
        }
    }

    public function obtenerUltimoId(): JsonResponse
    {
        try {
            $ultimoId = $this->comisionProcesoService->obtenerUltimoId();
            return $this->responseService->success(['id' => $ultimoId]);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener el último ID de comision: ' . $e->getMessage());
        }
    }

    /**
     * Cambia el estado de un comision.
     *
     * @param EstadoEnumRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function cambiarEstado(EstadoEnumRequest $request, int $id): JsonResponse
    {
        try {
            $this->comisionProcesoService->cambiarEstado($id, $request->validated()['estado']);
            return $this->responseService->success("Estado del comisión procesos actualizado correctamente");
        } catch (Exception $e) {
            return $this->responseService->error('Error al cambiar el estado del comision: ' . $e->getMessage());
        }
    }

    /**
     * Obtiene todos las comisionProcesos activas.
     *
     * @return JsonResponse
     */
    public function obtenerActivos(): JsonResponse
    {
        try {
            $comisionProcesosActivos = $this->comisionProcesoService->obtenerActivos();
            return $this->responseService->success($comisionProcesosActivos);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener los comisionProcesos activos: ' . $e->getMessage());
        }
    }


    /**
     * Obtiene todos los comisionProcesos con columnas específicas.
     *
     * @return JsonResponse
     */
    public function obtenerTodosConColumnasEspecificas(): JsonResponse
    {
        try {
            $comisionProcesos = $this->comisionProcesoService->obtenerConColumnas();
            return $this->responseService->success($comisionProcesos);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener los comisionProcesos: ' . $e->getMessage());
        }
    }

    public function obtenerConNombres(): JsonResponse
    {
        try {
            $comisionProcesos = $this->comisionProcesoService->obtenerConNombres();
            return $this->responseService->success($comisionProcesos);
        } catch (Exception $e) {
            return $this->responseService->error('Error al obtener los comisionProcesos: ' . $e->getMessage());
        }

    }

    public function obtenerPag(Request $request): JsonResponse
    {
        try {
            $criteria = $this->obtenerCriterios($request);
            $comisionProcesos = $this->comisionProcesoService->obtenerPaginado($criteria);
            return $this->responseService->success(([
                'data' => $comisionProcesos->items(),
                'total' => $comisionProcesos->total(),
            ]));
        } catch (InvalidArgumentException $e) {
            return $this->responseService->error($e->getMessage(), ResponseAlias::HTTP_BAD_REQUEST);
        }
    }
}

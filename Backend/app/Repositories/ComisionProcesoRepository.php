<?php

namespace App\Repositories;

use App\Models\ComisionProceso;
use App\Traits\General\PeriodoNumericoTrait;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class ComisionProcesoRepository extends EstadoRepository
{
    use PeriodoNumericoTrait;

    public function __construct(ComisionProceso $modelo)
    {
        parent::__construct($modelo);
    }

    /**
     * Obtiene todos los comisiones con selección de columnas específicas.
     *
     * @return Collection
     */
    public function obtenerTodosConColumnasEspecificas(): Collection
    {
        return $this->modelo::select('id', 'nombre', 'estado')->get();
    }

    public function crearYObtenerId(array $comision): int|null
    {
        return $this->modelo->insertGetId($comision);
    }

    protected function aplicarRango(Builder $consulta, ?array $range): void
    {
        if ($range['field'] && $range['values']) {
            $consulta->join('proceso_periodos', 'comision_procesos.proceso_periodo_id', '=', 'proceso_periodos.id')
            ->join('periodos', 'proceso_periodos.periodo_id', '=', 'periodos.id')
            ->join('procesos', 'proceso_periodos.proceso_id', '=', 'procesos.id')
            ->select('comision_procesos.*');
            
            if ($range['values']['start'] === $range['values']['end']) {
                $consulta->where($range['field'], $range['values']['start']);
            } else {
            $consulta->whereBetween($range['field'], [$range['values']['start'], $range['values']['end']]);
            }
        }
    }
    
    protected function aplicarFiltros(Builder $consulta, array $filtros): void
    {
        foreach ($filtros as $key => $value) {
            switch ($key) {
                case 'id':
                    $consulta->where('comision_procesos.id', $value);
                    break;
                case 'comision':
                    $this->aplicarJoinCondicional($consulta, 'comisiones', 'comision_procesos.comision_id', '=', 'comisiones.id');
                    $consulta->where('comisiones.nombre', $value);
                    break;
                case 'proceso':
                    $this->aplicarJoinCondicional($consulta,'proceso_periodos', 'comision_procesos.proceso_periodo_id', '=', 'proceso_periodos.id');
                    $this->aplicarJoinCondicional($consulta, 'procesos', 'proceso_periodos.proceso_id', '=', 'procesos.id');
                    $consulta->where('procesos.nombre', $value);
                    break;
                case 'periodo_numerico':
                    $this->aplicarJoinCondicional($consulta, 'proceso_periodos', 'comision_procesos.proceso_periodo_id', '=', 'proceso_periodos.id');
                    $this->aplicarJoinCondicional($consulta, 'periodos', 'proceso_periodos.periodo_id', '=', 'periodos.id');
                    $consulta->where('periodos.periodo_numerico', $value);
                    break;
                default:
                    $consulta->where($key, $value);
                    break;
            }
        }
    }

    protected function aplicarBusqueda(Builder $consulta, ?string $searchTerm, ?string $searchColumn): void
    {
        if ($searchTerm && $searchColumn) {
            switch ($searchColumn) {
                case 'id':
                    $consulta->where('comision_procesos.id', 'like', $searchTerm);
                    break;
                case 'comision':
                    $this->aplicarJoinCondicional($consulta, 'comisiones', 'comision_procesos.comision_id', '=', 'comisiones.id');
                    $consulta->where('comisiones.nombre', 'like', '%' . $searchTerm . '%');
                    break;
                case 'proceso':
                    $this->aplicarJoinCondicional($consulta, 'proceso_periodos', 'comision_procesos.proceso_periodo_id', '=', 'proceso_periodos.id');
                    $this->aplicarJoinCondicional($consulta, 'procesos', 'proceso_periodos.proceso_id', '=', 'procesos.id');
                    $consulta->where('procesos.nombre', 'like', '%' . $searchTerm . '%');
                    break;
                case 'periodo_numerico':
                    $this->aplicarJoinCondicional($consulta, 'proceso_periodos', 'comision_procesos.proceso_periodo_id', '=', 'proceso_periodos.id');
                    $this->aplicarJoinCondicional($consulta, 'periodos', 'proceso_periodos.periodo_id', '=', 'periodos.id');
                    $searchTerm = $this->periodoToNumerico($searchTerm);
                    $consulta->where('periodos.periodo_numerico', 'like', $searchTerm . '%');
                    break;
                default:
                    $consulta->where($searchColumn, 'like', '%' . $searchTerm . '%');
                    break;
            }
        }
    }

    protected function aplicarOrdenamiento(Builder $consulta, ?string $sortField, ?string $sortOrder): void
    {
        if ($sortField && $sortOrder) {
            $consulta->orderBy($sortField, $sortOrder);
        }
    }


}


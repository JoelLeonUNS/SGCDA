<?php

namespace App\Http\Requests\StoreUpdate;

use App\Http\Requests\Validacion\ValidacionRequest;

class StoreUpdateProcesoPeriodoRequest extends ValidacionRequest
{
    public function rules(): array
    {
        return [
            'proceso_id' => 'required|integer',
            'periodo_id' => 'required|integer',
            'fecha_inicial' => 'required|date',
            'fecha_final' => 'required|date',
        ];
    }
}

<?php

namespace App\Http\Requests\StoreUpdate;

use App\Http\Requests\Validacion\ValidacionRequest;

class StoreUpdateComisionProcesoRequest extends ValidacionRequest
{
    public function rules(): array
    {
        return [
            'comision_id' => 'required|integer',
            'miembros_ids' => 'required|array',
            'proceso_periodo_id' => 'required|integer',
        ];
    }
}

<?php

namespace App\Http\Requests\StoreUpdate;

use App\Http\Requests\Validacion\ValidacionRequest;

class StoreUpdateComisionAulaRequest extends ValidacionRequest
{
    public function rules(): array
    {
        return [
            'aula_id' => 'required|integer',
            'comision_proceso_id' => 'required|integer',
        ];
    }
}

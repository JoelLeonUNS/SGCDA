<?php

namespace App\Http\Requests\StoreUpdate;

use App\Http\Requests\Validacion\ValidacionRequest;

class StoreUpdateComisionMiembroRequest extends ValidacionRequest
{
    public function rules(): array
    {
        return [
            'comision_proceso_id' => 'required|integer',
            'miembro_cargo_id' => 'required|integer',
        ];
    }
}

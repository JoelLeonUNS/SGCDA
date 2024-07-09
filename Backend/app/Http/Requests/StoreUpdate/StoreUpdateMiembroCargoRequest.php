<?php

namespace App\Http\Requests\v1\StoreUpdate;

use App\Http\Requests\v1\Validacion\ValidacionRequest;

class StoreUpdateMiembroCargoRequest extends ValidacionRequest
{
    public function rules(): array
    {
        return [
            'miembro_id' => 'required|integer',
            'cargo_id' => 'required|integer',
        ];
    }
}

<?php

namespace App\Http\Requests\StoreUpdate;

use App\Http\Requests\Validacion\ValidacionRequest;

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

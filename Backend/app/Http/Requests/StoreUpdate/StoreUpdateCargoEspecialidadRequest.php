<?php

namespace App\Http\Requests\StoreUpdate;

use App\Http\Requests\Validacion\ValidacionRequest;

class StoreUpdateCargoEspecialidadRequest extends ValidacionRequest
{
    public function rules(): array
    {
        return [
            'cargo_id' => 'required|integer',
            'especialidad_id' => 'required|integer',
        ];
    }
}

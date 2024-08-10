<?php

namespace App\Http\Requests\StoreUpdate;

use App\Http\Requests\Validacion\ValidacionRequest;

class StoreUpdateMiembroCargoRequest extends ValidacionRequest
{
    public function rules(): array
    {
        return [
            'miembro_id' => 'required|integer',
            'nombres' => 'required|string|max:100',
            'apellidos' => 'required|string|max:100',
            'dni' => 'required|string|max:8',
            'cargo_especialidad_id' => 'required|integer',
        ];
    }
}

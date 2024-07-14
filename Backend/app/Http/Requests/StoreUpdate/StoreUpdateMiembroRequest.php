<?php

namespace App\Http\Requests\StoreUpdate;

use App\Http\Requests\Validacion\ValidacionRequest;

class StoreUpdateMiembroRequest extends ValidacionRequest
{
    public function rules(): array
    {
        return [
            'nombres' => 'required|string|max:100',
            'apellidos' => 'required|string|max:100',
        ];
    }
}

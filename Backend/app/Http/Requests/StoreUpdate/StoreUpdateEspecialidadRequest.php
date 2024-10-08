<?php

namespace App\Http\Requests\StoreUpdate;

use App\Http\Requests\Validacion\ValidacionRequest;

class StoreUpdateEspecialidadRequest extends ValidacionRequest
{
    public function rules(): array
    {
        return [
            'descripcion' => 'required|string|max:255',
        ];
    }
}

<?php

namespace App\Http\Requests\v1\StoreUpdate;

use App\Http\Requests\v1\Validacion\ValidacionRequest;

class StoreUpdateComisionRequest extends ValidacionRequest
{
    public function rules(): array
    {
        return [
            'descripcion' => 'required|string|max:255',
        ];
    }
}

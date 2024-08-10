<?php

namespace App\Http\Requests\StoreUpdate;

use App\Http\Requests\Validacion\ValidacionRequest;

class StoreUpdatePabellonRequest extends ValidacionRequest
{
    public function rules(): array
    {
        return [
            'nombre' => 'required|string|max:255',
        ];
    }
}

<?php

namespace App\Http\Requests\Validacion;

use App\Http\Requests\v1\Validacion\ValidacionRequest;

class EstadoBitRequest extends ValidacionRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'estado' => 'required|integer|in:0,1',
        ];
    }

}

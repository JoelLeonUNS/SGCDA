<?php

namespace App\Http\Requests\v1\Validacion;

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

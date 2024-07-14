<?php

namespace App\Http\Requests\Validacion;

class PagadoBitRequest extends ValidacionRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'pagado' => 'required|integer|in:0,1',
        ];
    }

}

<?php

namespace App\Http\Requests\Validacion;

use App\Http\Enums\Estados;
use App\Http\Requests\Validacion\ValidacionRequest;
use Illuminate\Validation\Rules\Enum;

class EstadoEnumRequest extends ValidacionRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'estado' => ['required', 'string', new Enum(Estados::class)],
        ];
    }

}

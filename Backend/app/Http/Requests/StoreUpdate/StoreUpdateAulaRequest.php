<?php

namespace App\Http\Requests\StoreUpdate;

use App\Http\Requests\Validacion\ValidacionRequest;

class StoreUpdateAulaRequest extends ValidacionRequest
{
    public function rules(): array
    {
        return [
            'pabellon_id' => 'required|integer',
            'piso' => 'required|integer',
            'correlativo' => 'required|string|max:7',
            'afoto' => 'required|integer',
        ];
    }
}

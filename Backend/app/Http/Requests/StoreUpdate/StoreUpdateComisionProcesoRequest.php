<?php

namespace App\Http\Requests\StoreUpdate;

use App\Http\Requests\Validacion\ValidacionRequest;

class StoreUpdateComisionProcesoRequest extends ValidacionRequest
{
    public function rules(): array
    {
        return [
            'comision' => 'required|integer',
            'miembros_ids' => 'required|array',
            'proceso' => 'required|integer',
            'periodo' => 'required|integer',
            'fecha' => 'required|date',
            'hora' => 'required|date_format:H:i',
            'paga' => 'required|numeric',
        ];
    }
}

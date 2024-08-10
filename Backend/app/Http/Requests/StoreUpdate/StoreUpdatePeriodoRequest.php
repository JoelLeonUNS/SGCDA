<?php

namespace App\Http\Requests\StoreUpdate;

use App\Http\Requests\Validacion\ValidacionRequest;

class StoreUpdatePeriodoRequest extends ValidacionRequest
{
    public function rules(): array
    {
        return [
            'fecha_inicial' => 'required|date',
            'fecha_final' => 'required|date',
            'anio' => 'required|numeric|digits:4',
            'correlat_romano' => 'required|string|max:5',
        ];
    }
}

<?php

namespace App\Http\Requests\StoreUpdate;

use App\Http\Requests\Validacion\ValidacionRequest;

class StoreUpdateHorarioRequest extends ValidacionRequest
{
    public function rules(): array
    {
        return [
            'fecha' => 'required|date',
            'hora_inicial' => 'required|date_format:H:i',
            'hora_final' => 'required|date_format:H:i',
        ];
    }
}

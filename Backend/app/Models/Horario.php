<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Horario extends Model
{
    use HasFactory;

    protected $table = 'horarios';
    public $timestamps = false;

    protected $fillable = [
        'fecha',
        'hora_inicial',
        'hora_final',
        'estado',
    ];

}

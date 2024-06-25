<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Periodo extends Model
{
    use HasFactory;

    protected $table = 'periodos';
    public $timestamps = false;

    protected $fillable = [
        'fecha_inicial',
        'fecha_final',
        'anio',
        'correlativo_romano',
        'estado',
    ];

}

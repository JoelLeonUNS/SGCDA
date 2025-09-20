<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Periodo extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'periodos';

    protected $fillable = [
        'fecha_inicial',
        'fecha_final',
        'anio',
        'correlat_romano',
        'periodo_numerico',
        'estado',
    ];

    protected $dates = ['deleted_at'];
}

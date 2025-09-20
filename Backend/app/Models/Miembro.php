<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Miembro extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'miembros';

    protected $fillable = [
        'nombres',
        'apellidos',
        'dni',
        'estado',
    ];

    protected $dates = ['deleted_at'];
}

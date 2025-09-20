<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Proceso extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'procesos';

    protected $fillable = [
        'nombre',
        'estado',
    ];

    protected $dates = ['deleted_at'];
}

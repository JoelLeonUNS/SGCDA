<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pabellon extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'pabellones';

    protected $fillable = [
        'nombre',
        'estado',
    ];

    protected $dates = ['deleted_at'];
}

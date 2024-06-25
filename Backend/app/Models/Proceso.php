<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proceso extends Model
{
    use HasFactory;

    protected $table = 'procesos';
    public $timestamps = false;

    protected $fillable = [
        'descripcion',
        'estado',
    ];

}

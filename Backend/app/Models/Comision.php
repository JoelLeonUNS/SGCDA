<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comision extends Model
{
    use HasFactory;

    protected $table = 'comisiones';
    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'estado',
    ];

}

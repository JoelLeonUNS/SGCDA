<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pabellon extends Model
{
    use HasFactory;

    protected $table = 'pabellones';
    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'estado',
    ];

}

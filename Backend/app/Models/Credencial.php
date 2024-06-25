<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Credencial extends Model
{
    use HasFactory;
    protected $table = 'credenciales';
    public $timestamps = false;

    protected $fillable = [
        'comision_proceso_id',
        'fecha',
        'hora',
        'estado',
    ];

    public function comisionProceso(): BelongsTo
    {
        return $this->belongsTo(ComisionProceso::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProcesoPeriodo extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'proceso_periodos';

    protected $fillable = [
        'periodo_id',
        'proceso_id',
        'fecha_inicial',
        'fecha_final',
        'estado',
    ];

    protected $dates = ['deleted_at'];

    public function periodo(): BelongsTo
    {
        return $this->belongsTo(Periodo::class);
    }

    public function proceso(): BelongsTo
    {
        return $this->belongsTo(Proceso::class);
    }
}

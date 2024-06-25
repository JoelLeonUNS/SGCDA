<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProcesoPeriodo extends Model
{
    use HasFactory;

    protected $table = 'proceso_periodos';
    public $timestamps = false;

    protected $fillable = [
        'periodo_id',
        'proceso_id',
        'estado',
    ];

    public function periodo(): BelongsTo
    {
        return $this->belongsTo(Periodo::class);
    }

    public function proceso(): BelongsTo
    {
        return $this->belongsTo(Proceso::class);
    }
}

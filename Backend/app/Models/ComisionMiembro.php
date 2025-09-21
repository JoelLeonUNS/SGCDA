<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class ComisionMiembro extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'comision_miembros';

    protected $fillable = [
        'comision_proceso_id',
        'miembro_cargo_id',
        'horario_id',
        'aula_id',
        'es_encargado',
        'estado',
    ];

    protected $dates = ['deleted_at'];

    public function comisionProceso(): BelongsTo
    {
        return $this->belongsTo(ComisionProceso::class);
    }

    public function miembroCargo(): BelongsTo
    {
        return $this->belongsTo(MiembroCargo::class);
    }

    public function horario(): BelongsTo
    {
        return $this->belongsTo(Horario::class);
    }

}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class MiembroCargo extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'miembro_cargos';

    protected $fillable = [
        'miembro_id',
        'cargo_especialidad_id',
        'estado',
    ];

    protected $dates = ['deleted_at'];

    public function miembro(): BelongsTo
    {
        return $this->belongsTo(Miembro::class);
    }

    public function cargoEspecialidad(): BelongsTo
    {
        return $this->belongsTo(CargoEspecialidad::class);
    }
}

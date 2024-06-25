<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MiembroCargo extends Model
{
    use HasFactory;

    protected $table = 'miembro_cargos';

    protected $fillable = [
        'miembro_id',
        'cargo_id',
        'fecha_asignacion',
        'estado',
    ];

    public $timestamps = false;

    public function miembro(): BelongsTo
    {
        return $this->belongsTo(Miembro::class);
    }

    public function cargo(): BelongsTo
    {
        return $this->belongsTo(Cargo::class);
    }
}

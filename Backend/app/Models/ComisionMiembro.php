<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ComisionMiembro extends Model
{
    use HasFactory;

    protected $table = 'comision_miembros';
    public $timestamps = false;

    protected $fillable = [
        'comision_proceso_id',
        'miembro_cargo_id',
    ];

    public function comisionProceso(): BelongsTo
    {
        return $this->belongsTo(ComisionProceso::class);
    }

    public function miembroCargo(): BelongsTo
    {
        return $this->belongsTo(MiembroCargo::class);
    }

}

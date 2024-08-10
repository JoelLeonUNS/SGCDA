<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CargoEspecialidad extends Model
{
    use HasFactory;

    protected $table = 'cargo_especialidades';

    protected $fillable = [
        'cargo_id',
        'especialidad_id',
    ];

    public $timestamps = false;

    public function cargo(): BelongsTo
    {
        return $this->belongsTo(Cargo::class);
    }

    public function especialidad(): BelongsTo
    {
        return $this->belongsTo(Especialidad::class);
    }
}

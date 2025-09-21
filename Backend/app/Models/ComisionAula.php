<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class ComisionAula extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'comision_aulas';

    protected $fillable = [
        'aula_id',
        'comision_proceso_id',
        'estado',
    ];

    protected $dates = ['deleted_at'];

    public function aula(): BelongsTo
    {
        return $this->belongsTo(Aula::class);
    }

    public function comisionProceso(): BelongsTo
    {
        return $this->belongsTo(ComisionProceso::class);
    }

    public function comisionMiembros()
    {
        return ComisionMiembro::where('comision_proceso_id', $this->comision_proceso_id)
                              ->where('aula_id', $this->aula_id);
    }
}

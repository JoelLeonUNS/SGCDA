<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class ComisionProceso extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'comision_procesos';

    protected $fillable = [
        'proceso_periodo_id',
        'comision_id',
        'estado',
    ];

    protected $dates = ['deleted_at'];

    public function procesoPeriodo(): BelongsTo
    {
        return $this->belongsTo(ProcesoPeriodo::class);
    }

    public function comision(): BelongsTo
    {
        return $this->belongsTo(Comision::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ComisionProceso extends Model
{
    use HasFactory;

    protected $table = 'comision_procesos';
    public $timestamps = false;

    protected $fillable = [
        'proceso_periodo_id',
        'comision_id',
        'miembro_cargo_id',
        'paga',
        'estado',
    ];


    public function procesoPeriodo(): BelongsTo
    {
        return $this->belongsTo(ProcesoPeriodo::class);
    }

    public function comision(): BelongsTo
    {
        return $this->belongsTo(Comision::class);
    }

    public function miembroCargo(): BelongsTo
    {
        return $this->belongsTo(MiembroCargo::class);
    }
}

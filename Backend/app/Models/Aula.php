<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Aula extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'aulas';

    protected $fillable = [
        'pabellon_id',
        'piso',
        'correlativo',
        'aforo',
        'estado',
    ];

    protected $dates = ['deleted_at'];

    public function pabellon(): BelongsTo
    {
        return $this->belongsTo(Pabellon::class);
    }
}

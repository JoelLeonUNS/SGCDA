<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Aula extends Model
{
    use HasFactory;

    protected $table = 'aulas';
    public $timestamps = false;

    protected $fillable = [
        'pabellon_id',
        'piso',
        'correlativo',
        'aforo',
        'estado',
    ];

    public function pabellon(): BelongsTo
    {
        return $this->belongsTo(Pabellon::class);
    }

}

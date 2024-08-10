<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $this->createTable();
        $this->addEstadoColumn();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('horarios');
    }

    private function createTable(): void
    {
        Schema::create('horarios', function (Blueprint $table) {
            $table->id()->autoIncrement()->comment('Identificador de la comisión miembros');
            $table->date('fecha')->nullable()->comment('Fecha del horario');
            $table->time('hora_inicial')->nullable()->comment('Hora de inicio del horario');
            $table->time('hora_final')->nullable()->comment('Hora de fin del horario');
        });
    }

    private function addEstadoColumn(): void
    {
        Schema::table('horarios', function (Blueprint $table) {
            $table->enum('estado', ['ACTIVO', 'INACTIVO', 'ELIMINADO'])
                  ->default('ACTIVO')->comment('Estado del horario: ACTIVO, INACTIVO o ELIMINADO');
        });
    }
};

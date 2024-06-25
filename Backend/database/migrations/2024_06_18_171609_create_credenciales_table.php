<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $this->createCredencialesTable();
        $this->addEstadoColumn();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('credenciales');
    }

    private function createCredencialesTable(): void
    {
        Schema::create('credenciales', function (Blueprint $table) {
            $table->id()->autoIncrement()->comment('Identificador de la credencial');
            $table->unsignedBigInteger('comision_proceso_id')->nullable()->comment('Identificador de la comisión proceso');
            $table->date('fecha')->nullable()->comment('Fecha de la credencial');
            $table->time('hora')->nullable()->comment('Hora de la credencial');
        });
    }

    private function addEstadoColumn(): void
    {
        Schema::table('credenciales', function (Blueprint $table) {
            $table->boolean('estado')->default(1)->comment('Estado de la credencial');
        });
    }
};

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
        $this->createProcesoPeriodosTable();
        $this->addEstadoColumn();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proceso_periodos');
    }

    private function createProcesoPeriodosTable(): void
    {
        Schema::create('proceso_periodos', function (Blueprint $table) {
            $table->id()->autoIncrement()->comment('Identificador del proceso periodo');
            $table->unsignedBigInteger('periodo_id')->nullable()->comment('Identificador del periodo');
            $table->unsignedBigInteger('proceso_id')->nullable()->comment('Identificador del proceso');
            $table->foreign('periodo_id')->references('id')->on('periodos');
            $table->foreign('proceso_id')->references('id')->on('procesos');
        });
    }

    private function addEstadoColumn(): void
    {
        Schema::table('proceso_periodos', function (Blueprint $table) {
            $table->boolean('estado')->default(1)->comment('Estado del proceso periodo');
        });
    }
};

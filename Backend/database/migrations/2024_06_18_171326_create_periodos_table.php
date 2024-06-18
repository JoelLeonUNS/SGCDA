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
        $this->createPeriodosTable();
        $this->addEstadoColumn();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('periodos');
    }

    private function createPeriodosTable(): void
    {
        Schema::create('periodos', function (Blueprint $table) {
            $table->id()->autoIncrement()->comment('Identificador único para el periodo');
            $table->date('fecha_inicial')->nullable()->comment('Fecha de inicio del periodo');
            $table->date('fecha_final')->nullable()->comment('Fecha de fin del periodo');
            $table->string('anio', 4)->nullable()->comment('Año del periodo');
            $table->string('correlativo_romano', 5)->nullable()->comment('Correlativo romano del periodo');
        });
    }

    private function addEstadoColumn(): void
    {
        Schema::table('periodos', function (Blueprint $table) {
            $table->boolean('estado')->default(1)->comment('Estado del periodo');
        });
    }
};

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
        $this->createMiembroCargosTable();
        $this->addEstadoColumn();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('miembro_cargos');
    }

    private function createMiembroCargosTable(): void
    {
        Schema::create('miembro_cargos', function (Blueprint $table) {
            $table->id()->autoIncrement()->comment('Identificador del cargo del miembro');
            $table->unsignedBigInteger('miembro_id')->nullable()->comment('Identificador del miembro');
            $table->unsignedBigInteger('cargo_id')->nullable()->comment('Identificador del cargo');
            $table->date('fecha_asignacion')->nullable()->comment('Fecha de asignación del cargo');
            $table->foreign('miembro_id')->references('id')->on('miembros');
            $table->foreign('cargo_id')->references('id')->on('cargos');
        });
    }

    private function addEstadoColumn(): void
    {
        Schema::table('miembro_cargos', function (Blueprint $table) {
            $table->boolean('estado')->default(1)->comment('Estado del cargo del miembro');
        });
    }
};

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
        Schema::dropIfExists('comision_miembros');
    }

    private function createTable(): void
    {
        Schema::create('comision_miembros', function (Blueprint $table) {
            $table->id()->autoIncrement()->comment('Identificador de la comisión miembros');
            $table->unsignedBigInteger('comision_proceso_id')->nullable()->comment('Identificador de la comisión proceso');
            $table->unsignedBigInteger('miembro_cargo_id')->nullable()->comment('Identificador del miembro cargo');
            $table->foreign('comision_proceso_id')->references('id')->on('comision_procesos');
            $table->foreign('miembro_cargo_id')->references('id')->on('miembro_cargos');
        });
    }

    private function addEstadoColumn(): void
    {
        Schema::table('comision_miembros', function (Blueprint $table) {
            $table->boolean('estado')->default(1)->comment('Estado de la comisión miembro');
        });
    }
};

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
            $table->unsignedBigInteger('horario_id')->nullable()->comment('Identificador del horario');
            $table->unsignedBigInteger('aula_id')->nullable()->comment('Identificador del aula');
            $table->boolean('es_encargado')->default(0)->comment('Indica si el miembro es el encargado del aula');
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('comision_proceso_id')->references('id')->on('comision_procesos');
            $table->foreign('miembro_cargo_id')->references('id')->on('miembro_cargos');
            $table->foreign('horario_id')->references('id')->on('horarios');
            $table->foreign('aula_id')->references('id')->on('aulas');
        });
    }

    private function addEstadoColumn(): void
    {
        Schema::table('comision_miembros', function (Blueprint $table) {
            $table->boolean('estado')->default(1)->comment('Estado de la comisión miembro');
        });
    }
};

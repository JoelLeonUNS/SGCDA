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
        Schema::dropIfExists('comision_aulas');
    }

    private function createTable(): void
    {
        Schema::create('comision_aulas', function (Blueprint $table) {
            $table->id()->autoIncrement()->comment('Identificador de la aula miembro');
            $table->unsignedBigInteger('aula_id')->nullable()->comment('Identificador del aula');
            $table->unsignedBigInteger('comision_proceso_id')->nullable()->comment('Identificador de la comisión proceso');
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('aula_id')->references('id')->on('aulas');
            $table->foreign('comision_proceso_id')->references('id')->on('comision_procesos');
        });
    }

    private function addEstadoColumn(): void
    {
        Schema::table('comision_aulas', function (Blueprint $table) {
            $table->enum('estado', ['ACTIVO', 'INACTIVO'])
                ->default('ACTIVO')->comment('Estado de la comisión aula: ACTIVO o INACTIVO');
        });
    }
};

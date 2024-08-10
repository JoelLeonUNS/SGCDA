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
        Schema::dropIfExists('aula_miembros');
    }

    private function createTable(): void
    {
        Schema::create('aula_miembros', function (Blueprint $table) {
            $table->id()->autoIncrement()->comment('Identificador de la aula miembro');
            $table->unsignedBigInteger('aula_id')->nullable()->comment('Identificador del aula');
            $table->unsignedBigInteger('comision_miembro_id')->nullable()->comment('Identificador del miembro');
            $table->foreign('aula_id')->references('id')->on('aulas');
            $table->foreign('comision_miembro_id')->references('id')->on('comision_miembros');
        });
    }

    private function addEstadoColumn(): void
    {
        Schema::table('aula_miembros', function (Blueprint $table) {
            $table->boolean('estado')->default(1)->comment('Estado de la aula miembro');
        });
    }
};

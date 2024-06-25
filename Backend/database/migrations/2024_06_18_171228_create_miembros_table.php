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
        $this->createMiembrosTable();
        $this->addEstadoColumn();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('miembros');
    }

    private function createMiembrosTable(): void
    {
        Schema::create('miembros', function (Blueprint $table) {
            $table->id()->autoIncrement()->comment('Identificador único para el miembro');
            $table->string('nombres', 100)->nullable()->comment('Nombre del miembro');
            $table->string('apellidos', 100)->nullable()->comment('Apellido del miembro');
        });
    }

    private function addEstadoColumn(): void
    {
        Schema::table('miembros', function (Blueprint $table) {
            $table->boolean('estado')->default(1)->comment('Estado del miembro');
        });
    }

};

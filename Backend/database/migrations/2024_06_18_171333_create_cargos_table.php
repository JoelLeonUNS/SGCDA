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
        $this->createCargosTable();
        $this->addEstadoColumn();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cargos');
    }

    private function createCargosTable(): void
    {
        Schema::create('cargos', function (Blueprint $table) {
            $table->id()->autoIncrement()->comment('Identificador único para el cargo');
            $table->string('descripcion', 255)->nullable()->comment('Descripcion del cargo');
        });
    }

    private function addEstadoColumn(): void
    {
        Schema::table('cargos', function (Blueprint $table) {
            $table->boolean('estado')->default(1)->comment('Estado del cargo');
        });
    }
};

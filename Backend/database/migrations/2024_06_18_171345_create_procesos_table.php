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
        $this->createProcesosTable();
        $this->addEstadoColumn();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('procesos');
    }

    private function createProcesosTable(): void
    {
        Schema::create('procesos', function (Blueprint $table) {
            $table->id()->autoIncrement()->comment('Identificador del proceso');
            $table->string('descripcion', 255)->nullable()->comment('Descripción del proceso');
        });
    }

    private function addEstadoColumn(): void
    {
        Schema::table('procesos', function (Blueprint $table) {
            $table->boolean('estado')->default(1)->comment('Estado del proceso');
        });
    }
};

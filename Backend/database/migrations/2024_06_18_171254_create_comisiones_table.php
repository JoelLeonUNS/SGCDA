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
        $this->createComisionesTable();
        $this->addEstadoColumn();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comisiones');
    }

    private function createComisionesTable(): void
    {
        Schema::create('comisiones', function (Blueprint $table) {
            $table->id()->autoIncrement()->comment('Identificador único para la comisión');
            $table->string('descripcion', 255)->comment('Descripción de la comisión');
        });
    }

    private function addEstadoColumn(): void
    {
        Schema::table('comisiones', function (Blueprint $table) {
            $table->boolean('estado')->default(1)->comment('Estado de la comisión');
        });
    }
};

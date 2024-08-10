<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $this->createTable();
        $this->addEstadoColumn();
        $this->insertDefaultRows();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comisiones');
    }

    private function createTable(): void
    {
        Schema::create('comisiones', function (Blueprint $table) {
            $table->id()->autoIncrement()->comment('Identificador único para la comisión');
            $table->string('nombre', 255)->nullable()->comment('Nombre de la comisión');
        });
    }

    private function insertDefaultRows(): void
    {
        DB::table('comisiones')->insert([
            ['nombre' => 'Elaboración de Prueba'],
            ['nombre' => 'Traslado de Prueba'],
            ['nombre' => 'Control de Examen'],
            ['nombre' => 'Ingreso al Campus Universitario'],
            ['nombre' => 'Apoyo Logístico'],
            ['nombre' => 'Limpieza y Ambientación de Aulas'],
            ['nombre' => 'Procesamiento y Calificación de Examen'],
            ['nombre' => 'Publicación de Resultados'],
            ['nombre' => 'Atención Médica']
        ]);
    }

    private function addEstadoColumn(): void
    {
        Schema::table('comisiones', function (Blueprint $table) {
            $table->enum('estado', ['ACTIVO', 'INACTIVO', 'ELIMINADO'])
                  ->default('ACTIVO')->comment('Estado de la comisión: ACTIVO, INACTIVO o ELIMINADO');
        });
    }
};

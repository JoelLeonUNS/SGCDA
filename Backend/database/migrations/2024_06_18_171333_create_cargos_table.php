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
        Schema::dropIfExists('cargos');
    }

    private function createTable(): void
    {
        Schema::create('cargos', function (Blueprint $table) {
            $table->id()->autoIncrement()->comment('Identificador único para el cargo');
            $table->string('nombre', 255)->nullable()->comment('Descripcion del cargo');
        });
    }

    private function insertDefaultRows(): void
    {
        DB::table('cargos')->insert([
            ['nombre' => 'Sin Cargo'],//1
            ['nombre' => 'Docente'],//2
            ['nombre' => 'Administrativo'],//3
            ['nombre' => 'Rector'],//4
            ['nombre' => 'Decano'],//5
            ['nombre' => 'Vicerrector Académico'],//6
            ['nombre' => 'Vicerrector de Investigación'],//7
            ['nombre' => 'Secretario General'],//8
            ['nombre' => 'Director Admisión'],//9
            ['nombre' => 'Adjunto DA'],//10
        ]);
    }

    private function addEstadoColumn(): void
    {
        Schema::table('cargos', function (Blueprint $table) {
            $table->enum('estado', ['ACTIVO', 'INACTIVO', 'ELIMINADO'])
                  ->default('ACTIVO')->comment('Estado del cargo: ACTIVO, INACTIVO o ELIMINADO');
        });
    }
};

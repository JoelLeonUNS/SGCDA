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
        Schema::dropIfExists('procesos');
    }

    private function createTable(): void
    {
        Schema::create('procesos', function (Blueprint $table) {
            $table->id()->autoIncrement()->comment('Identificador del proceso');
            $table->string('nombre', 255)->nullable()->comment('Nombre del proceso');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    private function insertDefaultRows(): void
    {
        DB::table('procesos')->insert([
            ['nombre' => 'Examen Excelente'],
            ['nombre' => 'Examen Preferente'],
            ['nombre' => 'Examen Ordinario'],
            ['nombre' => 'I Sumativo Cepuns'],
            ['nombre' => 'II Sumativo Cepuns']
        ]);
    }

    private function addEstadoColumn(): void
    {
        Schema::table('procesos', function (Blueprint $table) {
            $table->enum('estado', ['ACTIVO', 'INACTIVO'])
                  ->default('ACTIVO')->comment('Estado del proceso: ACTIVO o INACTIVO');
        });
    }
};

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
        Schema::dropIfExists('especialidades');
    }

    private function createTable(): void
    {
        Schema::create('especialidades', function (Blueprint $table) {
            $table->id()->autoIncrement()->comment('Identificador único para la especialidad');
            $table->string('descripcion', 255)->nullable()->comment('Descripcion de la especialidad');
        });
    }

    private function insertDefaultRows(): void
    {
        DB::table('especialidades')->insert([
            ['descripcion' => 'Sin Especialidad'],//1
            ['descripcion' => 'Responsable (Adjunto DADM)'],//2
            ['descripcion' => 'Razonamiento Matemático'],//3
            ['descripcion' => 'Matemática'],//4
            ['descripcion' => 'Razonamiento Verbal'],//5
            ['descripcion' => 'Lengua y Literatura'],//6
            ['descripcion' => 'Biología'],//7
            ['descripcion' => 'Química'],//8
            ['descripcion' => 'Física'],//9
            ['descripcion' => 'Anatomía y Fisiología'],//10
            ['descripcion' => 'Historia y Geografía'],//11
            ['descripcion' => 'Filosofía y Ciudadanía'],//12

            ['descripcion' => 'Facultad de Ingeniería'],//13
            ['descripcion' => 'Facultad de Educación y Humanidades'],//14
            ['descripcion' => 'Facultad de Ciencias'],//15

            ['descripcion' => 'Coordinador de Identificación de postulantes'],//16
            ['descripcion' => 'Identificación de Postulantes'],//17
            ['descripcion' => 'Garret a mujeres'],//18
            ['descripcion' => 'Garret a varones'],//19
            ['descripcion' => 'Cateo a mujeres'],
            ['descripcion' => 'Cateo a varones'],
            ['descripcion' => 'Control de cola mujeres'],
            ['descripcion' => 'Control de cola varones'],
        ]);
    }

    private function addEstadoColumn(): void
    {
        Schema::table('especialidades', function (Blueprint $table) {
            $table->enum('estado', ['ACTIVO', 'INACTIVO', 'ELIMINADO'])
                  ->default('ACTIVO')->comment('Estado de la especialidad: ACTIVO, INACTIVO o ELIMINADO');
        });
    }
};

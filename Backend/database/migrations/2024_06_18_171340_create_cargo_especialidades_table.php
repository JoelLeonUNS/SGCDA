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
        Schema::dropIfExists('cargo_especialidades');
    }

    private function createTable(): void
    {
        Schema::create('cargo_especialidades', function (Blueprint $table) {
            $table->id()->autoIncrement()->comment('Identificador del cargo del miembro');
            $table->unsignedBigInteger('cargo_id')->nullable()->comment('Identificador del cargo');
            $table->unsignedBigInteger('especialidad_id')->nullable()->comment('Identificador de la especialidad');
            $table->timestamps();
            $table->foreign('cargo_id')->references('id')->on('cargos');
            $table->foreign('especialidad_id')->references('id')->on('especialidades');
        });
    }

    private function insertDefaultRows(): void
    {
        DB::table('cargo_especialidades')->insert([
            ['cargo_id' => 1, 'especialidad_id' => 1],//1

            ['cargo_id' => 2, 'especialidad_id' => 2],//2
            ['cargo_id' => 2, 'especialidad_id' => 3],//3
            ['cargo_id' => 2, 'especialidad_id' => 4],//4
            ['cargo_id' => 2, 'especialidad_id' => 5],//5
            ['cargo_id' => 2, 'especialidad_id' => 6],//6
            ['cargo_id' => 2, 'especialidad_id' => 7],//7
            ['cargo_id' => 2, 'especialidad_id' => 8],//8
            ['cargo_id' => 2, 'especialidad_id' => 9],//9
            ['cargo_id' => 2, 'especialidad_id' => 10],//10
            ['cargo_id' => 2, 'especialidad_id' => 11],//11
            ['cargo_id' => 2, 'especialidad_id' => 12],//12

            ['cargo_id' => 2, 'especialidad_id' => 13],//13
            ['cargo_id' => 2, 'especialidad_id' => 14],//14
            ['cargo_id' => 2, 'especialidad_id' => 15],//15

            
        ]);
    }

    private function addEstadoColumn(): void
    {
        Schema::table('cargo_especialidades', function (Blueprint $table) {
            $table->boolean('estado')->default(1)->comment('Estado de la especialidad del cargo');
        });
    }
};

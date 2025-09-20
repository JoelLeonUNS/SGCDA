<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
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
        $this->insertDefaultRows();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('aulas');
    }

    private function createTable(): void
    {
        Schema::create('aulas', function (Blueprint $table) {
            $table->id()->autoIncrement()->comment('Identificador de la aula');
            $table->unsignedBigInteger('pabellon_id')->nullable()->comment('Identificador del pabellón');
            $table->integer('piso')->nullable()->comment('Piso de la aula');
            $table->string('correlativo', 7)->nullable()->comment('Correlativo de la aula');
            $table->integer('aforo')->nullable()->comment('Aforo de la aula');
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('pabellon_id')->references('id')->on('pabellones');
        });
    }

    private function insertDefaultRows(): void
    {
        DB::table('aulas')->insert([
            ['pabellon_id' => 1, 'piso' => 1, 'correlativo' => 'A01', 'aforo' => 30],
            ['pabellon_id' => 1, 'piso' => 1, 'correlativo' => 'A02', 'aforo' => 30],
            ['pabellon_id' => 1, 'piso' => 1, 'correlativo' => 'A03', 'aforo' => 30],
            ['pabellon_id' => 1, 'piso' => 1, 'correlativo' => 'A04', 'aforo' => 30],
            ['pabellon_id' => 1, 'piso' => 1, 'correlativo' => 'A05', 'aforo' => 30],
            ['pabellon_id' => 1, 'piso' => 2, 'correlativo' => 'A06', 'aforo' => 30],
            ['pabellon_id' => 1, 'piso' => 2, 'correlativo' => 'A07', 'aforo' => 30],
            ['pabellon_id' => 1, 'piso' => 2, 'correlativo' => 'A08', 'aforo' => 30],
            ['pabellon_id' => 1, 'piso' => 2, 'correlativo' => 'A09', 'aforo' => 30],
            ['pabellon_id' => 1, 'piso' => 2, 'correlativo' => 'A10', 'aforo' => 30],
            ['pabellon_id' => 1, 'piso' => 3, 'correlativo' => 'A11', 'aforo' => 30],
            ['pabellon_id' => 1, 'piso' => 3, 'correlativo' => 'A12', 'aforo' => 30],
            ['pabellon_id' => 1, 'piso' => 3, 'correlativo' => 'A13', 'aforo' => 30],
            ['pabellon_id' => 1, 'piso' => 3, 'correlativo' => 'A14', 'aforo' => 30],
        ]);
    }

    private function addEstadoColumn(): void
    {
        Schema::table('aulas', function (Blueprint $table) {
            $table->enum('estado', ['ACTIVO', 'INACTIVO'])
                ->default('ACTIVO')->comment('Estado de la aula: ACTIVO o INACTIVO');
        });
    }
};

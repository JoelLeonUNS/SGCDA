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
        Schema::dropIfExists('pabellones');
    }

    private function createTable(): void
    {
        Schema::create('pabellones', function (Blueprint $table) {
            $table->id()->autoIncrement()->comment('Identificador del pabellón');
            $table->string('nombre', 255)->nullable()->comment('Nombre del pabellón');
        });
    }

    private function insertDefaultRows(): void
    {
        DB::table('pabellones')->insert([
            ['nombre' => 'CEPUNS'],
            ['nombre' => 'CEIDUNS'],
            ['nombre' => 'Posgrado'],
            ['nombre' => 'Ingeniería de Energía'],
        ]);
    }

    private function addEstadoColumn(): void
    {
        Schema::table('pabellones', function (Blueprint $table) {
            $table->boolean('estado')->default(1)->comment('Estado del pabellón');
        });
    }
};

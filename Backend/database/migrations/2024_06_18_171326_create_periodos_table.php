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
        Schema::dropIfExists('periodos');
    }

    private function createTable(): void
    {
        Schema::create('periodos', function (Blueprint $table) {
            $table->id()->autoIncrement()->comment('Identificador único para el periodo');
            $table->string('anio', 4)->nullable()->comment('Año del periodo');
            $table->string('correlat_romano', 5)->nullable()->comment('Correlativo romano del periodo');
            $table->integer('periodo_numerico')->nullable()->comment('Correlativo numérico del periodo');
            $table->date('fecha_inicial')->nullable()->comment('Fecha de inicio del periodo');
            $table->date('fecha_final')->nullable()->comment('Fecha de fin del periodo');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    private function insertDefaultRows(): void
    {
        DB::table('periodos')->insert([
            ['anio' => '2023', 'correlat_romano' => 'II', 'periodo_numerico' => 20241, 'fecha_inicial' => '2023-01-01', 'fecha_final' => '2023-06-30'],
            ['anio' => '2024', 'correlat_romano' => 'I', 'periodo_numerico' => 20242, 'fecha_inicial' => '2023-07-01', 'fecha_final' => '2023-12-31'],
            ['anio' => '2024', 'correlat_romano' => 'II', 'periodo_numerico' => 20251, 'fecha_inicial' => '2024-01-01', 'fecha_final' => '2024-06-30'],
            ['anio' => '2025', 'correlat_romano' => 'I', 'periodo_numerico' => 20252, 'fecha_inicial' => '2024-07-01', 'fecha_final' => '2024-12-31'],
        ]);
    }

    private function addEstadoColumn(): void
    {
        Schema::table('periodos', function (Blueprint $table) {
            $table->enum('estado', ['ABIERTO', 'CERRADO'])
                  ->default('ABIERTO')->comment('Estado del periodo: ABIERTO o CERRADO');
        });
    }
};

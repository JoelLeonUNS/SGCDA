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
        $this->createComisionProcesosTable();
        $this->addEstadoColumn();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comision_procesos');
    }

    private function createComisionProcesosTable(): void
    {
        Schema::create('comision_procesos', function (Blueprint $table) {
            $table->id()->autoIncrement()->comment('Identificador de la comisión proceso');
            $table->unsignedBigInteger('proceso_periodo_id')->nullable()->comment('Identificador del proceso periodo');
            $table->unsignedBigInteger('comision_id')->nullable()->comment('Identificador de la comisión');
            $table->date('fecha')->nullable()->comment('Fecha de la comisión');
            $table->time('hora')->nullable()->comment('Hora de la comisión');
            $table->double('paga', 8, 2)->nullable()->comment('Paga del miembro cargo');
            $table->foreign('proceso_periodo_id')->references('id')->on('proceso_periodos');
            $table->foreign('comision_id')->references('id')->on('comisiones');
        });
    }

    private function addEstadoColumn(): void
    {
        Schema::table('comision_procesos', function (Blueprint $table) {
            $table->boolean('estado')->default(1)->comment('Estado de la comisión proceso');
        });
    }
};

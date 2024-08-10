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
        Schema::dropIfExists('miembro_cargos');
    }

    private function createTable(): void
    {
        Schema::create('miembro_cargos', function (Blueprint $table) {
            $table->id()->autoIncrement()->comment('Identificador del cargo del miembro');
            $table->unsignedBigInteger('miembro_id')->nullable()->comment('Identificador del miembro');
            $table->unsignedBigInteger('cargo_especialidad_id')->nullable()->default(1)->comment('Identificador de la especialidad del cargo');
            $table->timestamps();
            $table->foreign('miembro_id')->references('id')->on('miembros');
            $table->foreign('cargo_especialidad_id')->references('id')->on('cargo_especialidades');
        });
    }

    private function insertDefaultRows(): void
    {
        DB::table('miembro_cargos')->insert([
            ['miembro_id' => 1],//1
            ['miembro_id' => 2],//2
            ['miembro_id' => 3],//3
            ['miembro_id' => 4],//4
            ['miembro_id' => 5],//5
            ['miembro_id' => 6],//6
            ['miembro_id' => 7],//7
            ['miembro_id' => 8],//8
            ['miembro_id' => 9],//9
            ['miembro_id' => 10],//10
            ['miembro_id' => 11],//11
            ['miembro_id' => 12],//12
            ['miembro_id' => 13],//13
            ['miembro_id' => 14],//14
            ['miembro_id' => 15],//15
            ['miembro_id' => 16],//16
            ['miembro_id' => 17],//17
            ['miembro_id' => 18],//18
            ['miembro_id' => 19],//19
            ['miembro_id' => 20],//20
            ['miembro_id' => 21],//21
            ['miembro_id' => 22],//22
            ['miembro_id' => 23],//23
            ['miembro_id' => 24],//24
            ['miembro_id' => 25],//25
            ['miembro_id' => 26],//26
            ['miembro_id' => 27],//27
            ['miembro_id' => 28],//28
            ['miembro_id' => 29],//29
            ['miembro_id' => 30],//30
            ['miembro_id' => 31],//31
            ['miembro_id' => 32],//32
            ['miembro_id' => 33],//33
            ['miembro_id' => 34],//34
            ['miembro_id' => 35],//35
            ['miembro_id' => 36],//36
            ['miembro_id' => 37],//37
            ['miembro_id' => 38],//38
            ['miembro_id' => 39],//39
            ['miembro_id' => 40],//40
            ['miembro_id' => 41],//41
            ['miembro_id' => 42],//42
            ['miembro_id' => 43],//43
            ['miembro_id' => 44],//44
            ['miembro_id' => 45],//45
            ['miembro_id' => 46],//46
            ['miembro_id' => 47],//47
            ['miembro_id' => 48],//48
            ['miembro_id' => 49],//49
            ['miembro_id' => 50],//50
            ['miembro_id' => 51],//51
            ['miembro_id' => 52],//52
            ['miembro_id' => 53],//53
            ['miembro_id' => 54],//54
            ['miembro_id' => 55],//55
            ['miembro_id' => 56],//56
            ['miembro_id' => 57],//57
            ['miembro_id' => 58],//58
            ['miembro_id' => 59],//59
            ['miembro_id' => 60],//60
            ['miembro_id' => 61],//61
            ['miembro_id' => 62],//62
            ['miembro_id' => 63],//63
            ['miembro_id' => 64],//64
            ['miembro_id' => 65],//65
            ['miembro_id' => 66],//66
            ['miembro_id' => 67],//67
            ['miembro_id' => 68],//68
            ['miembro_id' => 69],//69
            ['miembro_id' => 70],//70
            ['miembro_id' => 71],//71
            ['miembro_id' => 72],//72
            ['miembro_id' => 73],//73
            ['miembro_id' => 74],//74
            ['miembro_id' => 75],//75
            ['miembro_id' => 76],//76
            ['miembro_id' => 77],//77
            ['miembro_id' => 78],//78
            ['miembro_id' => 79],//79
        ]);
    }

    private function addEstadoColumn(): void
    {
        Schema::table('miembro_cargos', function (Blueprint $table) {
            $table->boolean('estado')->default(1)->comment('Estado del cargo del miembro');
        });
    }
};

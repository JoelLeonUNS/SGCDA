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
        Schema::dropIfExists('miembros');
    }

    private function createTable(): void
    {
        Schema::create('miembros', function (Blueprint $table) {
            $table->id()->autoIncrement()->comment('Identificador único para el miembro');
            $table->string('nombres', 100)->nullable()->comment('Nombre del miembro');
            $table->string('apellidos', 100)->nullable()->comment('Apellido del miembro');
            $table->string('dni', '8')->nullable()->unique()->comment('Documento Nacional de Identidad del miembro');
        });
    }

    private function insertDefaultRows(): void
    {
        DB::table('miembros')->insert([
            // comisión elaboración de prueba
            ['nombres' => 'Julio', 'apellidos' => 'Lecca Vergara', 'dni' => null],//1
            ['nombres' => 'Gustavo', 'apellidos' => 'Reyes Carrera', 'dni' => null],//2
            ['nombres' => 'Ernesto', 'apellidos' => 'Cedrón León', 'dni' => null],//3
            ['nombres' => 'Jorge', 'apellidos' => 'Chauca Solano', 'dni' => null],//4
            ['nombres' => 'Elvis', 'apellidos' => 'Vereau Amaya', 'dni' => null],//5
            ['nombres' => 'Pablo', 'apellidos' => 'Moreno Valverde', 'dni' => null],//6
            ['nombres' => 'Daniel', 'apellidos' => 'Sanchez Vaca', 'dni' => null],//7
            ['nombres' => 'Joel', 'apellidos' => 'Herrada Villanueva', 'dni' => null],//8
            ['nombres' => 'José', 'apellidos' => 'Villanueva Carlo', 'dni' => null],//9
            ['nombres' => 'Liz', 'apellidos' => 'Trujillo Roldán', 'dni' => null],//10
            ['nombres' => 'Wilfredo', 'apellidos' => 'Contreras Arana', 'dni' => null],//11
            ['nombres' => 'Angel', 'apellidos' => 'Mucha Paitán', 'dni' => null],//12
            ['nombres' => 'Pilar', 'apellidos' => 'Velásquez Florentino', 'dni' => null],//13
            ['nombres' => 'Marleny', 'apellidos' => 'Ferre Ventura', 'dni' => null],//14
            ['nombres' => 'Luis', 'apellidos' => 'Castillo Caldas', 'dni' => null],//15
            // comisión traslado de prueba
            ['nombres' => 'Romy Kelly', 'apellidos' => 'Mas Sandoval', 'dni' => null],//16
            ['nombres' => 'José', 'apellidos' => 'Castillo Ventura', 'dni' => null],//17
            ['nombres' => 'Miriam', 'apellidos' => 'Vallejo Martinez', 'dni' => null],//18
            // comisión control de examen
            ['nombres' => 'Heron', 'apellidos' => 'Morales Marchena', 'dni' => null],//19
            ['nombres' => 'Victor', 'apellidos' => 'Castro Zavaleta', 'dni' => null],//20
            ['nombres' => 'Sabino', 'apellidos' => 'Zavaleta Aguilar', 'dni' => null],//21
            ['nombres' => 'Marco', 'apellidos' => 'Ponte Lucio', 'dni' => null],//22
            ['nombres' => 'Santos', 'apellidos' => 'Herrera Cherres', 'dni' => null],//23
            ['nombres' => 'Sergio Rafael', 'apellidos' => 'Albitres Abanto', 'dni' => null],//24
            ['nombres' => 'Fredesbildo Fidel', 'apellidos' => 'Rios Noriega', 'dni' => null],//25
            ['nombres' => 'Guillermo', 'apellidos' => 'Gil Albarrán', 'dni' => null],//26
            ['nombres' => 'Dheryum Hebeir', 'apellidos' => 'Casio Herrera', 'dni' => null],//27
            ['nombres' => 'Carlos Eugenio', 'apellidos' => 'Vega Moreno', 'dni' => null],//28
            ['nombres' => 'Pedro Enrique', 'apellidos' => 'Paredes Gonzales', 'dni' => null],//29
            ['nombres' => 'Alain Rene', 'apellidos' => 'Fonseca Adrianzen', 'dni' => null],//30
            ['nombres' => 'Luis Enrique', 'apellidos' => 'Ramírez Milla', 'dni' => null],//31
            ['nombres' => 'Juan Carlos', 'apellidos' => 'Vásquez Guzmán', 'dni' => null],//32
            ['nombres' => 'Andrés', 'apellidos' => 'Angeles Bustos', 'dni' => null],//33
            ['nombres' => 'Alvaro', 'apellidos' => 'Avalos Aurora', 'dni' => null],//34
            ['nombres' => 'Janet Abigail', 'apellidos' => 'Díaz Moncada', 'dni' => null],//35
            ['nombres' => 'Nelson Dulce', 'apellidos' => 'Palacios Dulce', 'dni' => null],//36
            ['nombres' => 'Raúl Alfredo', 'apellidos' => 'Izaguirre Vivar', 'dni' => null],//37
            ['nombres' => 'Ana', 'apellidos' => 'Moreno Fernandez', 'dni' => null],//38
            ['nombres' => 'Miriam', 'apellidos' => 'Velásquez Guarniz', 'dni' => null],//39
            ['nombres' => 'Washington Alfonso', 'apellidos' => 'Trujillo Ulloa', 'dni' => null],//40
            ['nombres' => 'Teodoro', 'apellidos' => 'Moore Flores', 'dni' => null],//41
            ['nombres' => 'Gladis', 'apellidos' => 'Melgarejo Velásquez', 'dni' => null],//42
            // comisión de ingreso al campus universitario
            ['nombres' => 'Gilbert Nilo', 'apellidos' => 'Rodríguez Paúcar', 'dni' => null],//43
            ['nombres' => 'Alejandro Mauricio', 'apellidos' => 'Martinez Carrillo', 'dni' => null],//44
            ['nombres' => 'Fernando Augusto', 'apellidos' => 'Vasquez Ching', 'dni' => null],//45
            ['nombres' => 'Jose Luis', 'apellidos' => 'Saldaña Alva', 'dni' => null],//46
            ['nombres' => 'Mónica', 'apellidos' => 'Arias Tiznado', 'dni' => null],//47
            ['nombres' => 'Julio Alejandro', 'apellidos' => 'Reaño Jaime', 'dni' => null],//48
            ['nombres' => 'Dayana', 'apellidos' => 'Mejía Broncano', 'dni' => null],//49
            ['nombres' => 'Shirley Mahela', 'apellidos' => 'Diaz Montero', 'dni' => null],//50
            ['nombres' => 'Carmen', 'apellidos' => 'Goichochea Gamarra', 'dni' => null],//51
            ['nombres' => 'Lilian', 'apellidos' => 'Custodio Melendez', 'dni' => null],//52
            ['nombres' => 'Yermolai', 'apellidos' => 'Carrasco Wuinchonlong', 'dni' => null],//53
            ['nombres' => 'Cristian', 'apellidos' => 'Vigo Sal y Rosas', 'dni' => null],//54
            ['nombres' => 'Freddy', 'apellidos' => 'Desposorio Alquizar', 'dni' => null],//55
            ['nombres' => 'Henry', 'apellidos' => 'Urbina Lazo', 'dni' => null],//56
            ['nombres' => 'Victor', 'apellidos' => 'Arrascue Rodas', 'dni' => null],//57
            ['nombres' => 'Joel', 'apellidos' => 'Borja Campomanes', 'dni' => null],//58
            // comisión apoyo logístico
            ['nombres' => 'Miriam Vilma', 'apellidos' => 'Vallejo Martínez', 'dni' => null],//59
            ['nombres' => 'Evelyn Analí', 'apellidos' => 'Burgos Rios', 'dni' => null],//60
            ['nombres' => 'Oscar', 'apellidos' => 'Fuentes Fajardo', 'dni' => null],//61
            ['nombres' => 'Kevin', 'apellidos' => 'Horna Mori', 'dni' => null],//62
            ['nombres' => 'Evelyn', 'apellidos' => 'Saavedra Gonzáles', 'dni' => null],//63
            ['nombres' => 'Julio', 'apellidos' => 'Castillo Yarleque', 'dni' => null],//64
            // comisión de limpieza y ambientación de aulas
            ['nombres' => 'Armando', 'apellidos' => 'Huaman Delgado', 'dni' => null],//65
            ['nombres' => 'Victoria', 'apellidos' => 'Cherre Tume', 'dni' => null],//66
            ['nombres' => 'Nazaria', 'apellidos' => 'Padilla Castillo', 'dni' => null],//67
            ['nombres' => 'Yosber Ronaldo', 'apellidos' => 'Campos Roldán', 'dni' => null],//68
            ['nombres' => 'Blademir Ulises', 'apellidos' => 'Blas Oliva', 'dni' => null],//69
            ['nombres' => 'Hermes', 'apellidos' => 'Roldan Avalos', 'dni' => null],//70
            // comisión de procesamiento y calificación de examen
            ['nombres' => 'José', 'apellidos' => 'Castillo Ventura', 'dni' => null],//71
            ['nombres' => 'Gonzalo Italo', 'apellidos' => 'Pantigoo Layza', 'dni' => null],//72
            ['nombres' => 'Mario', 'apellidos' => 'Merchan Gordillo', 'dni' => null],//73
            ['nombres' => 'Isabel Deycy', 'apellidos' => 'Capillo Lucar', 'dni' => null],//74
            ['nombres' => 'Edson', 'apellidos' => 'Navarrete Leal', 'dni' => null],//75
            // comisión de publicación de resultados
            ['nombres' => 'Jossy Renzo', 'apellidos' => 'Teruel Luna', 'dni' => null],//76
            // comisión de atención médica
            ['nombres' => 'Mishell Romero', 'apellidos' => 'Salazar', 'dni' => null],//77
            ['nombres' => 'Carmen', 'apellidos' => 'Serrano Valderrama', 'dni' => null],//78
        ]);
    }

    private function addEstadoColumn(): void
    {
        Schema::table('miembros', function (Blueprint $table) {
            $table->enum('estado', ['ACTIVO', 'INACTIVO', 'ELIMINADO'])
                  ->default('ACTIVO')->comment('Estado del miembro: ACTIVO, INACTIVO o ELIMINADO');
        });
    }

};

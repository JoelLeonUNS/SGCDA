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
            ['nombres' => 'Julio', 'apellidos' => 'Lecca Vergara', 'dni' => null],
            ['nombres' => 'Gustavo', 'apellidos' => 'Reyes Carrera', 'dni' => null],
            ['nombres' => 'Ernesto', 'apellidos' => 'Cedrón León', 'dni' => null],
            ['nombres' => 'Jorge', 'apellidos' => 'Chauca Solano', 'dni' => null],
            ['nombres' => 'Elvis', 'apellidos' => 'Vereau Amaya', 'dni' => null],
            ['nombres' => 'Pablo', 'apellidos' => 'Moreno Valverde', 'dni' => null],
            ['nombres' => 'Daniel', 'apellidos' => 'Sanchez Vaca', 'dni' => null],
            ['nombres' => 'Joel', 'apellidos' => 'Herrada Villanueva', 'dni' => null],
            ['nombres' => 'José', 'apellidos' => 'Villanueva Carlo', 'dni' => null],
            ['nombres' => 'Liz', 'apellidos' => 'Trujillo Roldán', 'dni' => null],
            ['nombres' => 'Wilfredo', 'apellidos' => 'Contreras Arana', 'dni' => null],
            ['nombres' => 'Angel', 'apellidos' => 'Mucha Paitán', 'dni' => null],
            ['nombres' => 'Pilar', 'apellidos' => 'Velásquez Florentino', 'dni' => null],
            ['nombres' => 'Marleny', 'apellidos' => 'Ferre Ventura', 'dni' => null],
            ['nombres' => 'Luis', 'apellidos' => 'Castillo Caldas', 'dni' => null],
            // comisión traslado de prueba
            ['nombres' => 'Romy Kelly', 'apellidos' => 'Mas Sandoval', 'dni' => null],
            ['nombres' => 'José', 'apellidos' => 'Castillo Ventura', 'dni' => null],
            ['nombres' => 'Miriam', 'apellidos' => 'Vallejo Martinez', 'dni' => null],
            // comisión control de examen
            ['nombres' => 'Heron', 'apellidos' => 'Morales Marchena', 'dni' => null],
            ['nombres' => 'Victor', 'apellidos' => 'Castro Zavaleta', 'dni' => null],
            ['nombres' => 'Sabino', 'apellidos' => 'Zavaleta Aguilar', 'dni' => null],
            ['nombres' => 'Marco', 'apellidos' => 'Ponte Lucio', 'dni' => null],
            ['nombres' => 'Santos', 'apellidos' => 'Herrera Cherres', 'dni' => null],
            ['nombres' => 'Sergio Rafael', 'apellidos' => 'Albitres Abanto', 'dni' => null],
            ['nombres' => 'Fredesbildo Fidel', 'apellidos' => 'Rios Noriega', 'dni' => null],
            ['nombres' => 'Guillermo', 'apellidos' => 'Gil Albarrán', 'dni' => null],
            ['nombres' => 'Dheryum Hebeir', 'apellidos' => 'Casio Herrera', 'dni' => null],
            ['nombres' => 'Carlos Eugenio', 'apellidos' => 'Vega Moreno', 'dni' => null],
            ['nombres' => 'Pedro Enrique', 'apellidos' => 'Paredes Gonzales', 'dni' => null],
            ['nombres' => 'Alain Rene', 'apellidos' => 'Fonseca Adrianzen', 'dni' => null],
            ['nombres' => 'Luis Enrique', 'apellidos' => 'Ramírez Milla', 'dni' => null],
            ['nombres' => 'Juan Carlos', 'apellidos' => 'Vásquez Guzmán', 'dni' => null],
            ['nombres' => 'Andrés', 'apellidos' => 'Angeles Bustos', 'dni' => null],
            ['nombres' => 'Alvaro', 'apellidos' => 'Avalos Aurora', 'dni' => null],
            ['nombres' => 'Janet Abigail', 'apellidos' => 'Díaz Moncada', 'dni' => null],
            ['nombres' => 'Nelson Dulce', 'apellidos' => 'Palacios Dulce', 'dni' => null],
            ['nombres' => 'Raúl Alfredo', 'apellidos' => 'Izaguirre Vivar', 'dni' => null],
            ['nombres' => 'Ana', 'apellidos' => 'Moreno Fernandez', 'dni' => null],
            ['nombres' => 'Miriam', 'apellidos' => 'Velásquez Guarniz', 'dni' => null],
            ['nombres' => 'Washington Alfonso', 'apellidos' => 'Trujillo Ulloa', 'dni' => null],
            ['nombres' => 'Teodoro', 'apellidos' => 'Moore Flores', 'dni' => null],
            ['nombres' => 'Gladis', 'apellidos' => 'Melgarejo Velásquez', 'dni' => null],
            // comisión de ingreso al campus universitario
            ['nombres' => 'Gilbert Nilo', 'apellidos' => 'Rodríguez Paúcar', 'dni' => null],
            ['nombres' => 'Alejandro Mauricio', 'apellidos' => 'Martinez Carrillo', 'dni' => null],
            ['nombres' => 'Fernando Augusto', 'apellidos' => 'Vasquez Ching', 'dni' => null],
            ['nombres' => 'Jose Luis', 'apellidos' => 'Saldaña Alva', 'dni' => null],
            ['nombres' => 'Mónica', 'apellidos' => 'Arias Tiznado', 'dni' => null],
            ['nombres' => 'Julio Alejandro', 'apellidos' => 'Reaño Jaime', 'dni' => null],
            ['nombres' => 'Dayana', 'apellidos' => 'Mejía Broncano', 'dni' => null],
            ['nombres' => 'Shirley Mahela', 'apellidos' => 'Diaz Montero', 'dni' => null],
            ['nombres' => 'Carmen', 'apellidos' => 'Goichochea Gamarra', 'dni' => null],
            ['nombres' => 'Lilian', 'apellidos' => 'Custodio Melendez', 'dni' => null],
            ['nombres' => 'Yermolai', 'apellidos' => 'Carrasco Wuinchonlong', 'dni' => null],
            ['nombres' => 'Cristian', 'apellidos' => 'Vigo Sal y Rosas', 'dni' => null],
            ['nombres' => 'Freddy', 'apellidos' => 'Desposorio Alquizar', 'dni' => null],
            ['nombres' => 'Henry', 'apellidos' => 'Urbina Lazo', 'dni' => null],
            ['nombres' => 'Victor', 'apellidos' => 'Arrascue Rodas', 'dni' => null],
            ['nombres' => 'Joel', 'apellidos' => 'Borja Campomanes', 'dni' => null],
            // comisión apoyo logístico
            ['nombres' => 'Miriam Vilma', 'apellidos' => 'Vallejo Martínez', 'dni' => null],
            ['nombres' => 'Evelyn Analí', 'apellidos' => 'Burgos Rios', 'dni' => null],
            ['nombres' => 'Oscar', 'apellidos' => 'Fuentes Fajardo', 'dni' => null],
            ['nombres' => 'Kevin', 'apellidos' => 'Horna Mori', 'dni' => null],
            ['nombres' => 'Evelyn', 'apellidos' => 'Saavedra Gonzáles', 'dni' => null],
            ['nombres' => 'Julio', 'apellidos' => 'Castillo Yarleque', 'dni' => null],
            // comisión de limpieza y ambientación de aulas
            ['nombres' => 'Armando', 'apellidos' => 'Huaman Delgado', 'dni' => null],
            ['nombres' => 'Victoria', 'apellidos' => 'Cherre Tume', 'dni' => null],
            ['nombres' => 'Nazaria', 'apellidos' => 'Padilla Castillo', 'dni' => null],
            ['nombres' => 'Yosber Ronaldo', 'apellidos' => 'Campos Roldán', 'dni' => null],
            ['nombres' => 'Blademir Ulises', 'apellidos' => 'Blas Oliva', 'dni' => null],
            ['nombres' => 'Hermes', 'apellidos' => 'Roldan Avalos', 'dni' => null],
            // comisión de procesamiento y calificación de examen
            ['nombres' => 'José', 'apellidos' => 'Castillo Ventura', 'dni' => null],
            ['nombres' => 'Gonzalo Italo', 'apellidos' => 'Pantigoo Layza', 'dni' => null],
            ['nombres' => 'Mario', 'apellidos' => 'Merchan Gordillo', 'dni' => null],
            ['nombres' => 'Isabel Deycy', 'apellidos' => 'Capillo Lucar', 'dni' => null],
            ['nombres' => 'Edson', 'apellidos' => 'Navarrete Leal', 'dni' => null],
            // comisión de publicación de resultados
            ['nombres' => 'Jossy Renzo', 'apellidos' => 'Teruel Luna', 'dni' => null],
            // comisión de atención médica
            ['nombres' => 'Mishell Romero', 'apellidos' => 'Salazar', 'dni' => null],
            ['nombres' => 'Carmen', 'apellidos' => 'Serrano Valderrama', 'dni' => null],
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

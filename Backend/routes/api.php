<?php

use App\Http\Controllers\AulaController;
use App\Http\Controllers\CargoController;
use App\Http\Controllers\ComisionAulaController;
use App\Http\Controllers\ComisionController;
use App\Http\Controllers\ComisionMiembroController;
use App\Http\Controllers\ComisionProcesoController;
use App\Http\Controllers\EspecialidadController;
use App\Http\Controllers\MiembroCargoController;
use App\Http\Controllers\PabellonController;
use App\Http\Controllers\PeriodoController;
use App\Http\Controllers\ProcesoController;
use App\Http\Controllers\ProcesoPeriodoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(["prefix" => "v1"], function () {
    // Miembro Cargo routes
    Route::resource('miembro-cargos', MiembroCargoController::class);
    Route::get('/miembro-cargos-pag', [MiembroCargoController::class, 'obtenerPag']);
    Route::get('/miembro-cargos-activos', [MiembroCargoController::class, 'obtenerActivos']);
    Route::get('/miembro-cargos-ultimo-id', [MiembroCargoController::class, 'obtenerUltimoId']);
    Route::patch('/miembro-cargos/{id}/cambiar-estado',[MiembroCargoController::class, 'cambiarEstado']);
    Route::get('/miembro-cargos-nombres', [MiembroCargoController::class, 'obtenerConNombres']);
    Route::get('/miembro-cargos-participacion-pag', [MiembroCargoController::class, 'obtenerParticipacionMiembrosPag']);
    // Comision routes
    Route::resource('comisiones', ComisionController::class);
    Route::get('/comisiones-pag', [ComisionController::class, 'obtenerPag']);
    Route::get('/comisiones-activos', [ComisionController::class, 'obtenerActivos']);
    Route::get('/comisiones-ultimo-id', [ComisionController::class, 'obtenerUltimoId']);
    Route::patch('/comisiones/{id}/cambiar-estado',[ComisionController::class, 'cambiarEstado']);
    Route::get('/comisiones-ultimo', [ComisionController::class, 'obtenerUltimo']);
    // Comision Miembro routes
    Route::resource('comision-miembros', ComisionMiembroController::class);
    Route::get('/comision-miembros-pag', [ComisionMiembroController::class, 'obtenerPag']);
    Route::get('/comision-miembros-activos', [ComisionMiembroController::class, 'obtenerActivos']);
    Route::get('/comision-miembros-ultimo-id', [ComisionMiembroController::class, 'obtenerUltimoId']);
    Route::patch('/comision-miembros/{id}/cambiar-estado',[ComisionMiembroController::class, 'cambiarEstado']);
    Route::get('/comision-miembros/comision/{comisionId}', [ComisionMiembroController::class, 'obtenerMiembrosPorComision']);
    // Rutas para asignación de miembros a aulas
    Route::get('/comision-miembros/disponibles-aula/{comisionProcesoId}', [ComisionMiembroController::class, 'obtenerMiembrosDisponiblesParaAula']);
    Route::get('/comision-miembros/asignados-aula/{aulaId}', [ComisionMiembroController::class, 'obtenerMiembrosAsignadosAula']);
    Route::post('/comision-miembros/asignar-aula', [ComisionMiembroController::class, 'asignarMiembrosAula']);
    Route::put('/comision-miembros/remover-aula/{aulaId}', [ComisionMiembroController::class, 'removerMiembrosAula']);
    // Cargo routes
    Route::resource('cargos', CargoController::class);
    Route::get('/cargos-pag', [CargoController::class, 'obtenerPag']);
    Route::get('/cargos-activos', [CargoController::class, 'obtenerActivos']);
    Route::get('/cargos-ultimo-id', [CargoController::class, 'obtenerUltimoId']);
    Route::patch('/cargos/{id}/cambiar-estado',[CargoController::class, 'cambiarEstado']);
    // Especialidad routes
    Route::resource('especialidades', EspecialidadController::class);
    Route::get('/especialidades-pag', [EspecialidadController::class, 'obtenerPag']);
    Route::get('/especialidades-activos', [EspecialidadController::class, 'obtenerActivos']);
    Route::get('/especialidades-ultimo-id', [EspecialidadController::class, 'obtenerUltimoId']);
    Route::patch('/especialidades/{id}/cambiar-estado',[EspecialidadController::class, 'cambiarEstado']);
    // Proceso routes
    Route::resource('procesos', ProcesoController::class);
    Route::get('/procesos-pag', [ProcesoController::class, 'obtenerPag']);
    Route::get('/procesos-activos', [ProcesoController::class, 'obtenerActivos']);
    Route::get('/procesos-ultimo-id', [ProcesoController::class, 'obtenerUltimoId']);
    Route::patch('/procesos/{id}/cambiar-estado',[ProcesoController::class, 'cambiarEstado']);
    Route::get('/procesos-ultimo', [ProcesoController::class, 'obtenerUltimo']);
    // Periodo routes
    Route::resource('periodos', PeriodoController::class);
    Route::get('/periodos-pag', [PeriodoController::class, 'obtenerPag']);
    Route::get('/periodos-activos', [PeriodoController::class, 'obtenerActivos']);
    Route::get('/periodos-ultimo-id', [PeriodoController::class, 'obtenerUltimoId']);
    Route::patch('/periodos/{id}/cambiar-estado',[PeriodoController::class, 'cambiarEstado']);
    Route::get('/periodos-ultimo', [PeriodoController::class, 'obtenerUltimo']);
    Route::get('/periodos-actual', [PeriodoController::class, 'obtenerActual']);
    // Proceso Periodo routes
    Route::resource('proceso-periodos', ProcesoPeriodoController::class);
    Route::get('/proceso-periodos-pag', [ProcesoPeriodoController::class, 'obtenerPag']);
    Route::get('/proceso-periodos-activos', [ProcesoPeriodoController::class, 'obtenerActivos']);
    Route::get('/proceso-periodos-ultimo-id', [ProcesoPeriodoController::class, 'obtenerUltimoId']);
    Route::patch('/proceso-periodos/{id}/cambiar-estado',[ProcesoPeriodoController::class, 'cambiarEstado']);
    Route::get('/proceso-periodos-actual', [ProcesoPeriodoController::class, 'obtenerActual']);
    // Comision Proceso routes
    Route::post('/comision-procesos-completo', [ComisionProcesoController::class, 'storeCompleto']);
    Route::get('/comision-procesos-completo/{id}', [ComisionProcesoController::class, 'showCompleto']);
    Route::put('/comision-procesos-completo/{id}', [ComisionProcesoController::class, 'updateCompleto']);
    Route::get('/comision-procesos-pag', [ComisionProcesoController::class, 'obtenerPag']);
    Route::get('/comision-procesos-activos', [ComisionProcesoController::class, 'obtenerActivos']);
    Route::get('/comision-procesos-ultimo-id', [ComisionProcesoController::class, 'obtenerUltimoId']);
    Route::patch('/comision-procesos/{id}/cambiar-estado',[ComisionProcesoController::class, 'cambiarEstado']);
    Route::resource('comision-procesos', ComisionProcesoController::class);
    // Aulas routes
    Route::resource('aulas', AulaController::class);
    Route::get('/aulas-pag', [AulaController::class, 'obtenerPag']);
    Route::get('/aulas-activos', [AulaController::class, 'obtenerActivos']);
    Route::get('/aulas-ultimo-id', [AulaController::class, 'obtenerUltimoId']);
    Route::patch('/aulas/{id}/cambiar-estado',[AulaController::class, 'cambiarEstado']);
    // Pabellones routes
    Route::resource('pabellones', PabellonController::class);
    Route::get('/pabellones-pag', [PabellonController::class, 'obtenerPag']);
    Route::get('/pabellones-activos', [PabellonController::class, 'obtenerActivos']);
    Route::get('/pabellones-ultimo-id', [PabellonController::class, 'obtenerUltimoId']);
    Route::patch('/pabellones/{id}/cambiar-estado',[PabellonController::class, 'cambiarEstado']);
    Route::get('/pabellones-ultimo', [PabellonController::class, 'obtenerUltimo']);
    // Comision Aula routes
    Route::resource('comision-aulas', ComisionAulaController::class);
    Route::get('/comision-aulas-pag', [ComisionAulaController::class, 'obtenerPag']);
    Route::get('/comision-aulas-activos', [ComisionAulaController::class, 'obtenerActivos']);
    Route::get('/comision-aulas-ultimo-id', [ComisionAulaController::class, 'obtenerUltimoId']);
    Route::patch('/comision-aulas/{id}/cambiar-estado',[ComisionAulaController::class, 'cambiarEstado']);
    Route::get('/comision-aulas-ultimo', [ComisionAulaController::class, 'obtenerUltimo']);
});

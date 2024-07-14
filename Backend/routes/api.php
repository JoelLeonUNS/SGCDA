<?php

use App\Http\Controllers\CargoController;
use App\Http\Controllers\ComisionController;
use App\Http\Controllers\ComisionProcesoController;
use App\Http\Controllers\MiembroCargoController;
use App\Http\Controllers\PeriodoController;
use App\Http\Controllers\ProcesoController;
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
    Route::put('/miembro-cargos/{id}/cambiar-estado',[MiembroCargoController::class, 'cambiarEstado']);
    // Comision routes
    Route::resource('comisiones', ComisionController::class);
    Route::get('/comisiones-pag', [ComisionController::class, 'obtenerPag']);
    Route::get('/comisiones-activos', [ComisionController::class, 'obtenerActivos']);
    Route::get('/comisiones-ultimo-id', [ComisionController::class, 'obtenerUltimoId']);
    Route::put('/comisiones/{id}/cambiar-estado',[ComisionController::class, 'cambiarEstado']);
    Route::get('/comisiones-ultimo', [ComisionController::class, 'obtenerUltimo']);
    // Cargo routes
    Route::resource('cargos', CargoController::class);
    Route::get('/cargos-pag', [CargoController::class, 'obtenerPag']);
    Route::get('/cargos-activos', [CargoController::class, 'obtenerActivos']);
    Route::get('/cargos-ultimo-id', [CargoController::class, 'obtenerUltimoId']);
    Route::put('/cargos/{id}/cambiar-estado',[CargoController::class, 'cambiarEstado']);
    // Proceso routes
    Route::resource('procesos', ProcesoController::class);
    Route::get('/procesos-pag', [ProcesoController::class, 'obtenerPag']);
    Route::get('/procesos-activos', [ProcesoController::class, 'obtenerActivos']);
    Route::get('/procesos-ultimo-id', [ProcesoController::class, 'obtenerUltimoId']);
    Route::put('/procesos/{id}/cambiar-estado',[ProcesoController::class, 'cambiarEstado']);
    Route::get('/procesos-ultimo', [ProcesoController::class, 'obtenerUltimo']);
    // Periodo routes
    Route::resource('periodos', PeriodoController::class);
    Route::get('/periodos-pag', [PeriodoController::class, 'obtenerPag']);
    Route::get('/periodos-activos', [PeriodoController::class, 'obtenerActivos']);
    Route::get('/periodos-ultimo-id', [PeriodoController::class, 'obtenerUltimoId']);
    Route::put('/periodos/{id}/cambiar-estado',[PeriodoController::class, 'cambiarEstado']);
    Route::get('/periodos-ultimo', [PeriodoController::class, 'obtenerUltimo']);
    // Comision Proceso routes
    Route::resource('comision-procesos', ComisionProcesoController::class);
    Route::get('/comision-procesos-pag', [ComisionProcesoController::class, 'obtenerPag']);
    Route::get('/comision-procesos-activos', [ComisionProcesoController::class, 'obtenerActivos']);
    Route::get('/comision-procesos-ultimo-id', [ComisionProcesoController::class, 'obtenerUltimoId']);
    Route::put('/comision-procesos/{id}/cambiar-estado',[ComisionProcesoController::class, 'cambiarEstado']);
});

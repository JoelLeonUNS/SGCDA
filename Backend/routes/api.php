<?php

use App\Http\Controllers\ComisionController;
use App\Http\Controllers\MiembroCargoController;
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
    Route::get('/miembro-cargos-activos', [MiembroCargoController::class, 'obtenerActivos']);
    Route::get('/miembro-cargos-pag', [MiembroCargoController::class, 'obtenerPag']);
    Route::post("miembro-cargos/{id}/cambiar-estado",[MiembroCargoController::class, 'cambiarEstado']);
    // Comision routes
    Route::resource('comisiones', ComisionController::class);
    Route::get('/comisiones-activos', [ComisionController::class, 'obtenerActivos']);
    Route::get('/comisiones-pag', [ComisionController::class, 'obtenerPag']);
    Route::post("comisiones/{id}/cambiar-estado",[ComisionController::class, 'cambiarEstado']);
});

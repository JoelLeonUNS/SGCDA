<?php

use App\Http\Controllers\MiembroController;
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
    Route::resource('miembros', MiembroController::class);
    Route::get('/miembros-activos', [MiembroController::class, 'obtenerMiembrosActivos']);
    Route::get('/miembros-pag', [MiembroController::class, 'obtenerMiembrosPaginados']);
    Route::post("miembros/{id}/cambiar-estado",[MiembroController::class, 'cambiarEstado']);
});

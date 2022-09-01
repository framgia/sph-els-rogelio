<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\WordChoiceController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('register',[RegisterController::class, 'register']);
Route::post('login',[LoginController::class, 'login']);
Route::post('logout',[LogoutController::class, 'logout']);
Route::middleware(['auth:sanctum'])->group(function () {
  Route::get('user',[UserController::class, 'user']);
});
Route::middleware(['auth:sanctum','admin'])->group(function () {
  Route::resource('lessons',LessonController::class);
  Route::get('/lessons/{id}/words',[WordChoiceController::class, 'index']);
  Route::post('/lessons/{id}/words',[WordChoiceController::class, 'store']);
});
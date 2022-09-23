<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\WordChoiceController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserLessonController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FollowerController;
use App\Http\Controllers\UsersListController;

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
  Route::get('/users',[UsersListController::class, 'users']);
  Route::put('/user/change/general-info',[UserController::class, 'changeGeneralInfo']);
  Route::put('/user/change/password',[UserController::class, 'changePassword']);
  Route::post('/user/change/avatar',[UserController::class, 'changeAvatar']);
  Route::resource('dashboard',DashboardController::class);
  Route::resource('profile',ProfileController::class);
  Route::post('/follow/{id}',[FollowerController::class, 'follow']);
  Route::get('/user/lessons',[UserLessonController::class, 'index']);
  Route::get('/user/lessons/{lessonID}/take',[UserLessonController::class, 'show']);
  Route::post('/user/lessons/{lessonID}/validate',[UserLessonController::class, 'validateAnswers']);
  Route::get('/user/lessons/{lessonID}/result',[UserLessonController::class, 'showResult']);
});
Route::middleware(['auth:sanctum','admin'])->group(function () {
  Route::get('/admins',[UsersListController::class, 'admins']);
  Route::resource('lessons',LessonController::class);
  Route::get('/lessons/{id}/words',[WordChoiceController::class, 'index']);
  Route::post('/lessons/{id}/words',[WordChoiceController::class, 'store']);
  Route::get('/lessons/{lessonID}/words/{wordID}',[WordChoiceController::class, 'show']);
  Route::put('/lessons/{lessonID}/words/{wordID}',[WordChoiceController::class, 'update']);
  Route::delete('/lessons/{lessonID}/words/{wordID}',[WordChoiceController::class, 'destroy']);
});
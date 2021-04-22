<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

use App\Http\Controllers\WordsController;
Route::get('/words', [WordsController::class, 'words']);
Route::get('/words/{id}', [WordsController::class, 'wordsById']);
Route::post('/words', [WordsController::class, 'wordsCreate']);
Route::delete('/words/{id}', [WordsController::class, 'wordsDelete']);
Route::put('/words/{id}', [WordsController::class, 'wordsUpdate']);


Route::get('/search', [WordsController::class, 'searchByWordEmpty']);
Route::get('/search/{name}', [WordsController::class, 'searchByWord']);

Route::post('/register', [\App\Http\Controllers\AuthController::class, 'register']);
Route::post('/login', [\App\Http\Controllers\AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/user', [\App\Http\Controllers\AuthController::class, 'user']);
    Route::post('/logout', [\App\Http\Controllers\AuthController::class, 'logout']);
});

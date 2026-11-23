<?php

use App\Http\Controllers\DishController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;

Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'service' => 'addis-eats-api',
        'time' => now()->toIso8601String(),
    ]);
});

Route::get('/areas', function () {
    return response()->json(config('addiseats.zones'));
});

Route::prefix('v1')->group(function () {
    Route::apiResource('dishes', DishController::class);

    Route::get('/menu', [
        \App\Http\Controllers\MenuController::class,
        'index',
    ]);



    Route::apiResource('orders', OrderController::class)
        ->only(['store', 'show']);
});

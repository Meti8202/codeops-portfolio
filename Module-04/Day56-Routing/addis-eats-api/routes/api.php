<?php

use App\Http\Controllers\Api\V1\DishController;
use App\Http\Controllers\Api\V1\RestaurantController;
use App\Http\Controllers\Api\V1\RestaurantDishController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

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

Route::prefix('v1')->name('v1.')->group(function () {
    Route::apiResource('dishes', DishController::class)
        ->where(['dish' => '[0-9]+']);

    Route::get('/menu', [MenuController::class, 'index']);

    Route::apiResource('orders', OrderController::class)
        ->only(['store', 'show'])
        ->where(['order' => '[0-9]+']);

    Route::apiResource('restaurants', RestaurantController::class)
        ->parameters(['restaurants' => 'restaurant'])
        ->where(['restaurant' => '[A-Za-z0-9-]+']);

    Route::apiResource('restaurants.dishes', RestaurantDishController::class)
        ->shallow()
        ->where([
            'restaurant' => '[A-Za-z0-9-]+',
            'dish' => '[0-9]+',
        ]);
});

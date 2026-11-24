<?php

use App\Http\Controllers\Api\V1\DishController;
use App\Http\Controllers\Api\V1\MenuController;
use App\Http\Controllers\Api\V1\OrderController;
use App\Http\Controllers\Api\V1\RestaurantController;
use App\Http\Controllers\Api\V1\RestaurantDishController;
use Illuminate\Support\Facades\Route;

Route::apiResource('dishes', DishController::class)
     ->where(['dish' => '[0-9]+']);

Route::get('/menu', [MenuController::class, 'index']);

Route::apiResource('orders', OrderController::class)
     ->only(['index', 'store', 'show'])
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

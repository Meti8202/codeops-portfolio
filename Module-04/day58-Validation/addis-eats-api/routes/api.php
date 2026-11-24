<?php

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

Route::prefix('v1')
    ->name('v1.')
    ->group(base_path('routes/api_v1.php'));

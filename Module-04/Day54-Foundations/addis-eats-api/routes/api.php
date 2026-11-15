<?php

use App\Domain\Dish;
use App\Domain\MenuService;
use App\Exceptions\OutsideZoneException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'service' => 'addis-eats-api',
        'time' => now()->toIso8601String(),
    ]);
});

Route::get('/areas', function () {
    return response()->json([
        'Bole',
        'Kazanchis',
        'Piassa',
        'Megenagna',
    ]);
});

Route::get('/menu', function (Request $request) {
    $dishes = collect([
        new Dish('Doro Wat', 'Yod Abyssinia', 42000, false),
        new Dish('Shiro', 'Yod Abyssinia', 18000, true),
        new Dish('Tibs', 'Yod Abyssinia', 35000, false),
        new Dish('Misir Wot', 'Kategna', 16000, true),
        new Dish('Kitfo', 'Kategna', 48000, false),
        new Dish('Firfir', 'Kategna', 22000, true),
        new Dish('Burger', 'Sishu', 30000, false),
        new Dish('Pasta', 'Sishu', 25000, false),
        new Dish('Salad', 'Sishu', 14000, true),
        new Dish('Beyaynet', 'Kategna', 20000, true),
        new Dish('Gomen Besiga', 'Yod Abyssinia', 28000, false),
        new Dish('Chechebsa', 'Sishu', 19000, true),
    ]);

    $area = (string) $request->query('area', 'Bole');
    $budget = (int) $request->query('budget', 25000);

    try {
        $menuService = new MenuService($dishes);

        return response()->json(
            $menuService->affordableIn($area, $budget)
        );
    } catch (OutsideZoneException $exception) {
        return response()->json([
            'error' => $exception->getMessage(),
            'area' => $exception->area,
        ], 422);
    }
});

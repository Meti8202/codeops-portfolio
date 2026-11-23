<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\DishResource;
use App\Http\Responses\ApiResponse;
use App\Models\Dish;
use Illuminate\Http\Request;

class DishController extends Controller
{
    private const SORTABLE = [
        'name',
        'price',
        'created_at',
    ];


    public function index(Request $request)
    {
        $dishes = Dish::query()
            ->when(
                $request->filled('area'),
                fn($query) => $query->where('area', $request->query('area'))
            )
            ->when(
                $request->filled('max_price'),
                fn($query) => $query->where(
                    'price',
                    '<=',
                    (int) $request->query('max_price')
                )
            )
            ->when(
                $request->boolean('fasting'),
                fn($query) => $query->where('is_fasting', true)
            )
            ->orderBy('price')
            ->get();

        return ApiResponse::ok(
            DishResource::collection($dishes),
            ['count' => $dishes->count()]
        );
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string'],
            'restaurant' => ['required', 'string'],
            'price' => ['required', 'integer', 'min:0'],
            'is_fasting' => ['required', 'boolean'],
            'area' => ['required', 'string'],
        ]);

        $dish = Dish::create($validated);

        return ApiResponse::created(
            new DishResource($dish),
            route('v1.dishes.show', $dish)
        );
    }

    public function show(Dish $dish)
    {
        return ApiResponse::ok(new DishResource($dish));
    }

    public function update(Request $request, Dish $dish)
    {
        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string'],
            'restaurant' => ['sometimes', 'required', 'string'],
            'price' => ['sometimes', 'required', 'integer', 'min:0'],
            'is_fasting' => ['sometimes', 'required', 'boolean'],
            'area' => ['sometimes', 'required', 'string'],
        ]);

        $dish->update($validated);

        return ApiResponse::ok(new DishResource($dish));
    }

    public function destroy(Dish $dish)
    {
        $dish->delete();

        return response()->noContent();
    }
}

<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\DishResource;
use App\Http\Responses\ApiResponse;
use App\Models\Dish;
use Illuminate\Http\Request;
use App\Http\Requests\V1\StoreDishRequest;
use App\Http\Requests\V1\UpdateDishRequest;

class DishController extends Controller
{
    private const SORTABLE = ['name', 'price', 'created_at'];
    private const PER_PAGE_DEFAULT = 15;
    private const PER_PAGE_MAX = 100;

    public function index(Request $request)
    {
        $sort = $request->string('sort', 'price')->toString();
        $direction = str_starts_with($sort, '-') ? 'desc' : 'asc';
        $column = ltrim($sort, '-');

        if (! in_array($column, self::SORTABLE, true)) {
            $column = 'price';
        }

        $perPage = min(
            $request->integer('per_page', self::PER_PAGE_DEFAULT) ?: self::PER_PAGE_DEFAULT,
            self::PER_PAGE_MAX,
        );

        $dishes = Dish::query()
            ->inArea($request->query('area'))
            ->under($request->integer('max_price'))
            ->fasting($request->boolean('fasting'))
            ->when(
                $request->filled('q'),
                fn($q) => $q->where('name', 'like', '%' . $request->query('q') . '%')
            )
            ->orderBy($column, $direction)
            ->paginate($perPage)
            ->withQueryString();

        return DishResource::collection($dishes);
    }

    public function store(StoreDishRequest $request)
    {
        $dish = Dish::create($request->validated());
        return ApiResponse::created(new DishResource($dish), route('v1.dishes.show', $dish));
    }

    public function update(UpdateDishRequest $request, Dish $dish)
    {
        $dish->update($request->validated());
        return ApiResponse::ok(new DishResource($dish));
    }

    public function show(Dish $dish)
    {
        return ApiResponse::ok(new DishResource($dish));
    }


    public function destroy(Dish $dish)
    {
        $dish->delete();

        return ApiResponse::noContent();
    }
}

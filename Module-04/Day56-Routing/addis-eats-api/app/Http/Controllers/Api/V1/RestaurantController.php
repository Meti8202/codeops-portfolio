<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\RestaurantResource;
use App\Http\Responses\ApiResponse;
use App\Models\Restaurant;
use Illuminate\Http\Request;

class RestaurantController extends Controller
{
    private const SORTABLE = [
        'name',
        'area',
        'created_at',
    ];

    private function sortColumn(Request $request): string
    {
        $sort = $request->string('sort', 'name')->toString();
        $column = ltrim($sort, '-');

        return in_array($column, self::SORTABLE, true)
            ? $column
            : 'name';
    }

    private function sortDirection(Request $request): string
    {
        return str_starts_with(
            $request->string('sort', 'name')->toString(),
            '-'
        ) ? 'desc' : 'asc';
    }

    public function index(Request $request)
    {
        $restaurants = Restaurant::query()
            ->withCount('dishes')
            ->when(
                $request->filled('area'),
                fn($q) => $q->where(
                    'area',
                    $request->query('area')
                )
            )
            ->when(
                $request->query('include') === 'dishes',
                fn($q) => $q->with('dishes')
            )
            ->orderBy(
                $this->sortColumn($request),
                $this->sortDirection($request)
            )
            ->get();

        return ApiResponse::ok(
            RestaurantResource::collection($restaurants),
            ['count' => $restaurants->count()]
        );
    }

    public function show(Request $request, Restaurant $restaurant)
    {
        $restaurant->loadCount('dishes');

        if ($request->query('include') === 'dishes') {
            $restaurant->load('dishes');
        }

        return ApiResponse::ok(
            new RestaurantResource($restaurant)
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string'],
            'slug' => ['required', 'string', 'alpha_dash', 'unique:restaurants,slug'],
            'area' => ['required', 'string'],
            'phone' => ['nullable', 'string'],
        ]);

        $restaurant = Restaurant::create($validated);
        $restaurant->loadCount('dishes');

        return ApiResponse::created(
            new RestaurantResource($restaurant),
            route('v1.restaurants.show', $restaurant)
        );
    }

    public function update(Request $request, Restaurant $restaurant)
    {
        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string'],
            'slug' => [
                'sometimes',
                'required',
                'string',
                'alpha_dash',
                'unique:restaurants,slug,' . $restaurant->id,
            ],
            'area' => ['sometimes', 'required', 'string'],
            'phone' => ['sometimes', 'nullable', 'string'],
        ]);

        $restaurant->update($validated);
        $restaurant->loadCount('dishes');

        return ApiResponse::ok(
            new RestaurantResource($restaurant)
        );
    }

    public function destroy(Restaurant $restaurant)
    {
        $restaurant->delete();

        return ApiResponse::noContent();
    }
}

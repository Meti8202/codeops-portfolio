<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\RestaurantResource;
use App\Http\Responses\ApiResponse;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use App\Http\Requests\V1\StoreRestaurantRequest;
use App\Http\Requests\V1\UpdateRestaurantRequest;

class RestaurantController extends Controller
{
    private const SORTABLE = ['name', 'area', 'created_at'];
    private const PER_PAGE_DEFAULT = 15;
    private const PER_PAGE_MAX = 100;

    private function sortColumn(Request $request): string
    {
        $sort = $request->string('sort', 'name')->toString();
        $column = ltrim($sort, '-');

        return in_array($column, self::SORTABLE, true) ? $column : 'name';
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
        $perPage = min(
            $request->integer('per_page', self::PER_PAGE_DEFAULT) ?: self::PER_PAGE_DEFAULT,
            self::PER_PAGE_MAX,
        );

        $restaurants = Restaurant::query()
            ->withCount('dishes')
            ->when(
                $request->filled('area'),
                fn($q) => $q->where('area', $request->query('area'))
            )
            ->when(
                $request->query('include') === 'dishes',
                fn($q) => $q->with('dishes')
            )
            ->orderBy(
                $this->sortColumn($request),
                $this->sortDirection($request)
            )
            ->paginate($perPage)
            ->withQueryString();

        return RestaurantResource::collection($restaurants);
    }

    public function show(Request $request, Restaurant $restaurant)
    {
        $restaurant->loadCount('dishes');

        if ($request->query('include') === 'dishes') {
            $restaurant->load('dishes');
        }

        return ApiResponse::ok(new RestaurantResource($restaurant));
    }

    public function store(StoreRestaurantRequest $request)
    {
        $restaurant = Restaurant::create($request->validated());
        $restaurant->loadCount('dishes');
        return ApiResponse::created(new RestaurantResource($restaurant), route('v1.restaurants.show', $restaurant));
    }

    public function update(UpdateRestaurantRequest $request, Restaurant $restaurant)
    {
        $restaurant->update($request->validated());
        $restaurant->loadCount('dishes');
        return ApiResponse::ok(new RestaurantResource($restaurant));
    }

    public function destroy(Restaurant $restaurant)
    {
        $restaurant->delete();

        return ApiResponse::noContent();
    }
}

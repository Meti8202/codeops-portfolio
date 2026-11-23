<?php

namespace App\Http\Controllers;

use App\Http\Resources\RestaurantResource;
use App\Models\Restaurant;

class RestaurantController extends Controller
{
    public function index()
    {
        return RestaurantResource::collection(
            Restaurant::orderBy('name')->get()
        );
    }

    public function show(Restaurant $restaurant)
    {
        return new RestaurantResource($restaurant);
    }
}

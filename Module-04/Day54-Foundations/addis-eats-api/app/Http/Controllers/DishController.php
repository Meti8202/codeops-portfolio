<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DishController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $area = $request->query('area', 'Bole');
        $budget = (int) $request->query('budget', 100000);

        return [
            'message' => 'List of dishes',
            'area' => $area,
            'budget' => $budget,
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $name = $request->input('name');
        $restaurant = $request->input('restaurant');

        return response()->json([
            'message' => 'Dish submitted',
            'name' => $name,
            'restaurant' => $restaurant,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return [
            'message' => 'Dish details',
            'dish_id' => $id,
        ];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        return [
            'message' => 'Dish updated',
            'dish_id' => $id,
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return response()->noContent();
    }
}

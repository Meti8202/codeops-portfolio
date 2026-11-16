<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DishController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return [
            'message' => 'List of dishes',
        ];
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return [
            'message' => 'Dish submitted',
        ];
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

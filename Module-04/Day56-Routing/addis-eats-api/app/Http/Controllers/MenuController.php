<?php

namespace App\Http\Controllers;

use App\Domain\MenuService;
use App\Exceptions\OutsideZoneException;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function __construct(
        private readonly MenuService $menu,
    ) {}

    public function index(Request $request)
    {
        try {
            return $this->menu->affordableIn(
                $request->query('area', 'Bole'),
                (int) $request->query('budget', 100000),
            );
        } catch (OutsideZoneException $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'area' => $e->area,
            ], 422);
        }
    }
}

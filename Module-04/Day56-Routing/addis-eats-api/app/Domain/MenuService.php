<?php

declare(strict_types=1);

namespace App\Domain;

use App\Exceptions\OutsideZoneException;
use App\Models\Dish as DishModel;
use App\Support\FormatsEtb;
use Illuminate\Support\Collection;

class MenuService
{
     use FormatsEtb;

     public function affordableIn(string $area, int $budget): Collection
     {
          $zones = config('addiseats.zones', []);

          if (! in_array($area, $zones, true)) {
               throw new OutsideZoneException($area);
          }

          return DishModel::query()
               ->where('area', $area)
               ->where('price', '<=', $budget)
               ->orderBy('price')
               ->get()
               ->map(fn(DishModel $dish) => [
                    'name' => $dish->name,
                    'price' => $this->toEtb($dish->price),
               ])
               ->values();
     }
}

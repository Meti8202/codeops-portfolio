<?php

declare(strict_types=1);

namespace App\Domain;

use App\Exceptions\OutsideZoneException;
use App\Support\FormatsEtb;
use Illuminate\Support\Collection;

class MenuService
{
     use FormatsEtb;

     public function __construct(
          private readonly Collection $dishes,
     ) {}

     public function affordableIn(string $area, int $budget): Collection
     {
          $zones = config('addiseats.zones', []);

          if (! in_array($area, $zones, true)) {
               throw new OutsideZoneException($area);
          }

          return $this->dishes
               ->filter(fn(Dish $d) => $d->price <= $budget)
               ->sortBy(fn(Dish $d) => $d->price)
               ->map(fn(Dish $d) => [
                    'name' => $d->name,
                    'price' => $this->toEtb($d->price),
               ])
               ->values();
     }
}

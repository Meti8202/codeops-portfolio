<?php

declare(strict_types=1);

namespace App\Domain;

use App\Exceptions\OutsideZoneException;

class DeliveryRule implements PricingRule
{
     public function feeFor(string $area): int
     {
          $zones = config('addiseats.zones', []);

          if (! in_array($area, $zones, true)) {
               throw new OutsideZoneException($area);
          }

          return match ($area) {
               'Bole', 'Kazanchis' => 4500,
               'Piassa' => 5500,
               'Megenagna' => 7000,
          };
     }
}

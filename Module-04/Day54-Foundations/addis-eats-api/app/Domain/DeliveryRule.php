<?php

declare(strict_types=1);

namespace App\Domain;

use App\Exceptions\OutsideZoneException;

class DeliveryRule implements PricingRule
{
     private const ZONES = [
          'Bole',
          'Kazanchis',
          'Piassa',
          'Megenagna',
     ];

     public function feeFor(string $area): int
     {
          if (! in_array($area, self::ZONES, true)) {
               throw new OutsideZoneException($area);
          }

          return match ($area) {
               'Bole', 'Kazanchis' => 4500,
               'Piassa' => 5500,
               'Megenagna' => 7000,
          };
     }
}

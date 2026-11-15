<?php

declare(strict_types=1);

namespace App\Domain;

class DeliveryRule implements PricingRule
{
     public function feeFor(string $area): int
     {
          return match ($area) {
               'Bole', 'Kazanchis' => 4500,
               'Piassa' => 5500,
               'Megenagna' => 7000,
               default => 7000,
          };
     }
}

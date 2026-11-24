<?php

declare(strict_types=1);

namespace App\Domain;

class FreeDeliveryRule implements PricingRule
{
     public function feeFor(string $area): int
     {
          return 0;
     }
}

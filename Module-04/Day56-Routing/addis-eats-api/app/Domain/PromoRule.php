<?php

declare(strict_types=1);

namespace App\Domain;

class PromoRule implements PricingRule
{
     public function __construct(
          private readonly PricingRule $deliveryRule,
     ) {}

     public function feeFor(string $area): int
     {
          $baseFee = $this->deliveryRule->feeFor($area);

          return (int) round($baseFee * 0.9);
     }
}

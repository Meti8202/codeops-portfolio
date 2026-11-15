<?php

declare(strict_types=1);

namespace App\Domain;

use App\Exceptions\EmptyOrderException;
use App\Support\FormatsEtb;
use Illuminate\Support\Collection;

class Order
{
     use FormatsEtb;

     public function __construct(
          public readonly Collection $lines,
          public readonly string $area,
          public readonly OrderStatus $status,
          public readonly PricingRule $pricingRule,
     ) {
          if ($this->lines->isEmpty()) {
               throw new EmptyOrderException();
          }
     }

     public function subtotal(): int
     {
          return $this->lines->sum(
               fn(OrderLine $line) => $line->subtotal()
          );
     }

     public function deliveryFee(): int
     {
          return $this->pricingRule->feeFor($this->area);
     }

     public function total(): int
     {
          return $this->subtotal() + $this->deliveryFee();
     }
}

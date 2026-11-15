<?php

declare(strict_types=1);

namespace App\Domain;

class OrderLine
{
     public function __construct(
          public readonly Dish $dish,
          public readonly int $quantity,
     ) {}

     public function subtotal(): int
     {
          return $this->dish->price * $this->quantity;
     }
}

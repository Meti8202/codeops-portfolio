<?php

declare(strict_types=1);

namespace App\Domain;

use App\Support\FormatsEtb;

class Dish
{
     use FormatsEtb;

     public function __construct(
          public readonly string $name,
          public readonly string $restaurant,
          public readonly int $price,
          public readonly bool $isFasting,
     ) {}

     public function priceInEtb(): string
     {
          return $this->toEtb($this->price);
     }
}

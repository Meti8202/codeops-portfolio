<?php

declare(strict_types=1);

namespace App\Domain;

class Dish
{
     public function __construct(
          public readonly string $name,
          public readonly string $restaurant,
          public readonly int $price,
          public readonly bool $isFasting,
     ) {}
}

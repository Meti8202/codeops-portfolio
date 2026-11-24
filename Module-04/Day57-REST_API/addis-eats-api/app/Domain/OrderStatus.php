<?php

declare(strict_types=1);

namespace App\Domain;

enum OrderStatus: string
{
     case Placed = 'placed';
     case Preparing = 'preparing';
     case OnTheWay = 'on_the_way';
     case Delivered = 'delivered';

     public function label(): string
     {
          return match ($this) {
               self::Placed => 'Placed',
               self::Preparing => 'Being prepared',
               self::OnTheWay => 'On the way',
               self::Delivered => 'Delivered',
          };
     }
}

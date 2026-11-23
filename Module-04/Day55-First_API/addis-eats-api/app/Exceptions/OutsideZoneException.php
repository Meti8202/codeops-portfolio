<?php

declare(strict_types=1);

namespace App\Exceptions;

class OutsideZoneException extends \DomainException
{
     public function __construct(
          public readonly string $area,
     ) {
          parent::__construct(
               "Addis Eats does not deliver to {$area}."
          );
     }
}

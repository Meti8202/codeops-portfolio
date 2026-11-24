<?php

declare(strict_types=1);

namespace App\Exceptions;

class EmptyOrderException extends \DomainException
{
     public function __construct()
     {
          parent::__construct('The order must contain at least one item.');
     }
}

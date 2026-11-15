<?php

declare(strict_types=1);

namespace App\Support;

trait FormatsEtb
{
     public function toEtb(int $santim): string
     {
          return number_format($santim / 100, 2) . ' ETB';
     }
}

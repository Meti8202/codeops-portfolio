<?php

declare(strict_types=1);

namespace App\Domain;

interface PricingRule
{
     public function feeFor(string $area): int;
}

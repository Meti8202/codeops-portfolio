<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class TeleBirrNumber implements ValidationRule
{
     public function validate(string $attribute, mixed $value, Closure $fail): void
     {
          if (! preg_match('/^09\d{8}$/', (string) $value)) {
               $fail('Enter a valid TeleBirr number as 09XXXXXXXX.');
          }
     }
}

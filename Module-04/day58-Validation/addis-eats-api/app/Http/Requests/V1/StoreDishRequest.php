<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreDishRequest extends FormRequest
{
     public function authorize(): bool
     {
          return true;
     }

     public function rules(): array
     {
          return [
               'name' => ['required', 'string', 'max:120'],
               'restaurant' => ['required', 'string', 'max:120'],
               'price' => ['required', 'integer', 'min:1', 'max:1000000'],
               'is_fasting' => ['required', 'boolean'],
               'area' => ['required', Rule::in(config('addiseats.zones', ['Bole', 'Kazanchis', 'Piassa', 'Megenagna']))],
          ];
     }
}

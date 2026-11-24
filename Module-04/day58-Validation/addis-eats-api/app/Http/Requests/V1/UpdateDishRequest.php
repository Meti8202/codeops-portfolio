<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateDishRequest extends FormRequest
{
     public function authorize(): bool
     {
          return true;
     }

     public function rules(): array
     {
          return [
               'name' => ['sometimes', 'required', 'string', 'max:120'],
               'restaurant' => ['sometimes', 'required', 'string', 'max:120'],
               'price' => ['sometimes', 'required', 'integer', 'min:1', 'max:1000000'],
               'is_fasting' => ['sometimes', 'required', 'boolean'],
               'area' => ['sometimes', 'required', Rule::in(config('addiseats.zones', ['Bole', 'Kazanchis', 'Piassa', 'Megenagna']))],
          ];
     }
}

<?php

namespace App\Http\Requests\V1;

use App\Rules\TeleBirrNumber;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRestaurantRequest extends FormRequest
{
     public function authorize(): bool
     {
          return true;
     }

     public function rules(): array
     {
          return [
               'name' => ['required', 'string', 'max:120'],
               'slug' => ['required', 'string', 'alpha_dash', 'unique:restaurants,slug'],
               'area' => ['required', Rule::in(config('addiseats.zones', ['Bole', 'Kazanchis', 'Piassa', 'Megenagna']))],
               'phone' => ['nullable', 'string', new TeleBirrNumber()],
          ];
     }
}

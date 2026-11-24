<?php

namespace App\Http\Requests\V1;

use App\Rules\TeleBirrNumber;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRestaurantRequest extends FormRequest
{
     public function authorize(): bool
     {
          return true;
     }

     public function rules(): array
     {
          return [
               'name' => ['sometimes', 'required', 'string', 'max:120'],
               'slug' => [
                    'sometimes',
                    'required',
                    'string',
                    'alpha_dash',
                    Rule::unique('restaurants', 'slug')->ignore($this->route('restaurant'))
               ],
               'area' => ['sometimes', 'required', Rule::in(config('addiseats.zones', ['Bole', 'Kazanchis', 'Piassa', 'Megenagna']))],
               'phone' => ['sometimes', 'nullable', 'string', new TeleBirrNumber()],
          ];
     }
}

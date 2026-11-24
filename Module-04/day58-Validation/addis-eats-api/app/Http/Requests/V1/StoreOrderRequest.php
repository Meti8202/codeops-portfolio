<?php

namespace App\Http\Requests\V1;

use App\Rules\TeleBirrNumber;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreOrderRequest extends FormRequest
{
     public function authorize(): bool
     {
          return true;
     }

     public function rules(): array
     {
          return [
               'area' => ['required', Rule::in(config('addiseats.zones', ['Bole', 'Kazanchis', 'Piassa', 'Megenagna']))],
               'phone' => ['required', 'string', new TeleBirrNumber()],
               'items' => ['required', 'array', 'min:1', 'max:30'],
               'items.*.dish_id' => ['required', 'integer', 'exists:dishes,id'],
               'items.*.quantity' => ['required', 'integer', 'between:1,50'],
          ];
     }
}

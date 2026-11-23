<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DishResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'restaurant' => $this->restaurant,
            'price_etb' => number_format($this->price / 100, 2),
            'price_santim' => $this->price,
            'fasting' => $this->is_fasting,
            'area' => $this->area,
        ];
    }
}
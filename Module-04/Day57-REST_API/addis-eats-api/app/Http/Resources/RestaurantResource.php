<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RestaurantResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'area' => $this->area,
            'phone' => $this->phone,
            'dish_count' => $this->whenCounted('dishes'),
            'dishes' => DishResource::collection(
                $this->whenLoaded('dishes')
            ),
        ];
    }
}

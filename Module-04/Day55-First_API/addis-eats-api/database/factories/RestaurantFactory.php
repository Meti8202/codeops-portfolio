<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class RestaurantFactory extends Factory
{
    public function definition(): array
    {
        $name = fake()->unique()->company();

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'area' => fake()->randomElement([
                'Bole',
                'Kazanchis',
                'Piassa',
                'Megenagna',
            ]),
        ];
    }
}

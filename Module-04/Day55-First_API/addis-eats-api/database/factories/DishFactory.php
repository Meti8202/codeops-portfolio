<?php

namespace Database\Factories;

use App\Models\Dish;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Dish>
 */
class DishFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    public function definition(): array
    {
        return [
            'name' => fake()->randomElement([
                'Doro Wat',
                'Shiro',
                'Kitfo',
                'Tibs',
                'Firfir',
            ]),
            'restaurant' => fake()->randomElement([
                'Yod Abyssinia',
                'Kategna',
                'Sishu',
            ]),
            'price' => fake()->numberBetween(12000, 60000),
            'is_fasting' => fake()->boolean(),
            'area' => fake()->randomElement(config('addiseats.zones')),
        ];
    }
}

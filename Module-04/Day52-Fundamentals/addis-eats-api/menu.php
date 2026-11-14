<?php

declare(strict_types=1);

$menu = [
     [
          'name' => 'Kitfo',
          'restaurant
          ' => 'Yod Abyssinia',
          'price' => 1800,
          'is_fasting' => false,
     ],
     [
          'name' => 'Tibs',
          'restaurant' => 'Yod Abyssinia',
          'price' => 2200,
          'is_fasting' => false,
     ],
     [
          'name' => 'Shiro',
          'restaurant' => 'Kategna',
          'price' => 900,
          'is_fasting' => true,
     ],
     [
          'name' => 'Beyaynetu',
          'restaurant' => 'Kategna',
          'price' => 1250,
          'is_fasting' => true,
     ],
     [
          'name' => 'Burger',
          'restaurant' => 'Sishu',
          'price' => 1600,
          'is_fasting' => false,
     ],
     [
          'name' => 'Salad',
          'restaurant' => 'Sishu',
          'price' => 1450,
          'is_fasting' => true,
     ],
     [
          'name' => 'Doro Wat',
          'restaurant' => 'Yod Abyssinia',
          'price' => 2400,
          'is_fasting' => false,
     ],
     [
          'name' => 'Pasta',
          'restaurant' => 'Kategna',
          'price' => 1100,
          'is_fasting' => true,
     ],
];

function formatPrice(int $price): string
{
     return 'ETB ' . number_format($price / 100, 2);
}

function formatDish(array $dish): string
{
     return $dish['name']
          . ' | ' . $dish['restaurant']
          . ' | ' . formatPrice($dish['price']);
}

echo "Report" . PHP_EOL;


$formattedMenu = array_map('formatDish', $menu);

foreach ($formattedMenu as $dish) {
     echo $dish . PHP_EOL;
}

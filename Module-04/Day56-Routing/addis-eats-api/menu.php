<?php

declare(strict_types=1);

$menu = [
     [
          'name' => 'Kitfo',
          'restaurant
          ' => 'Yod Abyssinia',
          'price' => 18000,
          'is_fasting' => false,
     ],
     [
          'name' => 'Tibs',
          'restaurant' => 'Yod Abyssinia',
          'price' => 22000,
          'is_fasting' => false,
     ],
     [
          'name' => 'Shiro',
          'restaurant' => 'Kategna',
          'price' => 9000,
          'is_fasting' => true,
     ],
     [
          'name' => 'Beyaynetu',
          'restaurant' => 'Kategna',
          'price' => 12500,
          'is_fasting' => true,
     ],
     [
          'name' => 'Burger',
          'restaurant' => 'Sishu',
          'price' => 16000,
          'is_fasting' => false,
     ],
     [
          'name' => 'Salad',
          'restaurant' => 'Sishu',
          'price' => 14500,
          'is_fasting' => true,
     ],
     [
          'name' => 'Doro Wat',
          'restaurant' => 'Yod Abyssinia',
          'price' => 24000,
          'is_fasting' => false,
     ],
     [
          'name' => 'Pasta',
          'restaurant' => 'Kategna',
          'price' => 11000,
          'is_fasting' => true,
     ],
];

function formatPrice(int $price): string
{
     return 'ETB ' . number_format($price / 100, 1);
}

function fastingLabel(bool $isFasting): string
{
    return match ($isFasting) {
        true => 'Fasting',
        false => 'Non-fasting',
    };
}

function formatDish(array $dish): string
{
    return $dish['name']
        . ' | ' . $dish['restaurant']
        . ' | ' . formatPrice($dish['price'])
        . ' | ' . fastingLabel($dish['is_fasting']);
}

function isFastingDish(array $dish): bool
{
    return $dish['is_fasting'] === true;
}

function getDishPrice(array $dish): int
{
    return $dish['price'];
}

echo "Report" . PHP_EOL;

$formattedMenu = array_map('formatDish', $menu);

foreach ($formattedMenu as $dish) {
    echo $dish . PHP_EOL;
}



$fastingDishes = array_filter($menu, 'isFastingDish');

echo PHP_EOL;
echo "Number of fasting dishes: " . count($fastingDishes) . PHP_EOL;



$prices = array_map('getDishPrice', $menu);

$totalPrice = array_sum($prices);

$averagePrice = intdiv($totalPrice, count($prices));




$sortedMenu = $menu;

usort(
    $sortedMenu,
    fn(array $a, array $b): int => $a['price'] <=> $b['price']
);




$cheapestDish = $sortedMenu[0];

echo PHP_EOL;
echo "Cheapest" . PHP_EOL;

echo $cheapestDish['name'] . PHP_EOL;
echo $cheapestDish['restaurant'] . PHP_EOL;
echo formatPrice($cheapestDish['price']) . PHP_EOL;

echo PHP_EOL;
echo "Average Menu Price" . PHP_EOL;

echo formatPrice($averagePrice) . PHP_EOL;
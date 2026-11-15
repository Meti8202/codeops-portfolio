<?php

declare(strict_types=1);

require __DIR__ . '/../vendor/autoload.php';

use App\Domain\DeliveryRule;
use App\Domain\Dish;
use App\Domain\Order;
use App\Domain\OrderLine;
use App\Domain\OrderStatus;
use App\Domain\Receipt;
use App\Exceptions\EmptyOrderException;
use App\Exceptions\OutsideZoneException;

$deliveryRule = new DeliveryRule();
$receipt = new Receipt();

// ORDER 1: Inside the delivery zone
try {
     $orderOne = new Order(
          lines: collect([
               new OrderLine(
                    new Dish('Shiro', 'Yod Abyssinia', 18000, true),
                    2
               ),
               new OrderLine(
                    new Dish('Misir Wot', 'Kategna', 16000, true),
                    1
               ),
          ]),
          area: 'Bole',
          status: OrderStatus::Placed,
          pricingRule: $deliveryRule,
     );

     echo "ORDER 1 - RECEIPT\n";
     print_r($receipt->generate($orderOne)->all());
} catch (OutsideZoneException | EmptyOrderException $exception) {
     echo "ORDER 1 ERROR: " . $exception->getMessage() . PHP_EOL;
}


// ORDER 2: Outside the delivery zone
try {
     $orderTwo = new Order(
          lines: collect([
               new OrderLine(
                    new Dish('Doro Wat', 'Yod Abyssinia', 42000, false),
                    1
               ),
          ]),
          area: 'Adama',
          status: OrderStatus::Placed,
          pricingRule: $deliveryRule,
     );

     echo "\nORDER 2 - RECEIPT\n";
     print_r($receipt->generate($orderTwo)->all());
} catch (OutsideZoneException | EmptyOrderException $exception) {
     echo "ORDER 2 ERROR: " . $exception->getMessage() . PHP_EOL;
}


// EMPTY ORDER: Demonstrate EmptyOrderException
try {
     $emptyOrder = new Order(
          lines: collect([]),
          area: 'Bole',
          status: OrderStatus::Placed,
          pricingRule: $deliveryRule,
     );
} catch (OutsideZoneException | EmptyOrderException $exception) {
     echo "\nEMPTY ORDER ERROR: " . $exception->getMessage() . PHP_EOL;
}

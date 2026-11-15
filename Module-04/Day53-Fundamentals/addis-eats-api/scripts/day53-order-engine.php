<?php

declare(strict_types=1);

require __DIR__ . '/../vendor/autoload.php';


use App\Domain\FreeDeliveryRule;
use App\Domain\PromoRule;
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

     echo "order 1 receipt: ";
     print_r($receipt->generate($orderOne)->all());
} catch (OutsideZoneException | EmptyOrderException $exception) {
     echo "Order 1 error: " . $exception->getMessage() . PHP_EOL;
}


// outside the delivery zone
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

     echo "\norder 2 receipt: ";
     print_r($receipt->generate($orderTwo)->all());
} catch (OutsideZoneException | EmptyOrderException $exception) {
     echo "Order 2 error: " . $exception->getMessage() . PHP_EOL;
}


// empty orders
try {
     $emptyOrder = new Order(
          lines: collect([]),
          area: 'Bole',
          status: OrderStatus::Placed,
          pricingRule: $deliveryRule,
     );
} catch (OutsideZoneException | EmptyOrderException $exception) {
     echo "\nempty order error: " . $exception->getMessage() . PHP_EOL;
}


echo "Pricing rule check";

$pricingRules = [
     'DeliveryRule' => $deliveryRule,
     'PromoRule' => new PromoRule($deliveryRule),
     'FreeDeliveryRule' => new FreeDeliveryRule(),
];

foreach ($pricingRules as $ruleName => $pricingRule) {
     $testOrder = new Order(
          lines: collect([
               new OrderLine(
                    new Dish('Shiro', 'Yod Abyssinia', 18000, true),
                    1
               ),
          ]),
          area: 'Bole',
          status: OrderStatus::Placed,
          pricingRule: $pricingRule,
     );

     $fee = $testOrder->deliveryFee();

     echo $ruleName . ': '
          . number_format($fee / 100, 2)
          . " ETB\n";
}

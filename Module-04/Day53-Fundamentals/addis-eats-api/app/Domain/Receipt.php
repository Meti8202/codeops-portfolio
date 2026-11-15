<?php

declare(strict_types=1);

namespace App\Domain;

use App\Support\FormatsEtb;
use Illuminate\Support\Collection;

class Receipt
{
     use FormatsEtb;

     public function generate(Order $order): Collection
     {
          $lines = $order->lines
               ->map(fn(OrderLine $line) => [
                    'dish' => $line->dish->name,
                    'quantity' => $line->quantity,
                    'unit_price' => $this->toEtb($line->dish->price),
                    'line_total' => $this->toEtb($line->subtotal()),
               ])
               ->values();

          return collect([
               'lines' => $lines,
               'subtotal' => $this->toEtb($order->subtotal()),
               'delivery_fee' => $this->toEtb($order->deliveryFee()),
               'total' => $this->toEtb($order->total()),
               'status' => $order->status->label(),
          ]);
     }
}

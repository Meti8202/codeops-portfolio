<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Domain\OrderStatus;
use App\Domain\PricingRule;
use App\Exceptions\OutsideZoneException;
use App\Models\Dish;
use App\Models\Order as EloquentOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
     public function __construct(
          private readonly PricingRule $pricingRule,
     ) {}

     public function index(Request $request)
     {
          $perPage = min(
               $request->integer('per_page', 15) ?: 15,
               100,
          );

          $orders = EloquentOrder::query()
               ->orderBy('created_at', 'desc')
               ->orderBy('id', 'desc')
               ->cursorPaginate($perPage)
               ->withQueryString();

          return response()->json($orders);
     }

     public function store(Request $request)
     {
          $validated = $request->validate([
               'area' => ['required', 'string'],
               'items' => ['required', 'array', 'min:1'],
               'items.*.dish_id' => ['required', 'integer', 'exists:dishes,id'],
               'items.*.quantity' => ['required', 'integer', 'min:1'],
          ]);

          try {
               $dishes = Dish::whereIn(
                    'id',
                    collect($validated['items'])->pluck('dish_id')
               )->get()->keyBy('id');

               $subtotal = collect($validated['items'])->sum(
                    fn($item) => $dishes[$item['dish_id']]->price * $item['quantity']
               );

               $deliveryFee = $this->pricingRule->feeFor($validated['area']);

               $order = DB::transaction(function () use (
                    $validated,
                    $dishes,
                    $subtotal,
                    $deliveryFee
               ) {
                    $order = EloquentOrder::create([
                         'area' => $validated['area'],
                         'status' => OrderStatus::Placed,
                         'subtotal' => $subtotal,
                         'delivery_fee' => $deliveryFee,
                         'total' => $subtotal + $deliveryFee,
                    ]);

                    foreach ($validated['items'] as $item) {
                         $dish = $dishes[$item['dish_id']];
                         $order->items()->create([
                              'dish_id' => $dish->id,
                              'quantity' => $item['quantity'],
                              'unit_price' => $dish->price,
                         ]);
                    }

                    return $order;
               });

               return response()->json($order->load('items.dish'), 201);
          } catch (OutsideZoneException $exception) {
               return response()->json([
                    'error' => $exception->getMessage(),
                    'area' => $exception->area,
               ], 422);
          }
     }

     public function show(EloquentOrder $order)
     {
          return response()->json($order->load('items.dish'));
     }
}

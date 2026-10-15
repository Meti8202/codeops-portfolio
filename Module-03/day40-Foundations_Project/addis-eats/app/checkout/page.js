"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { placeOrder } from "../actions";
import { useCart } from "../providers";

export default function CheckoutPage() {
  const [state, formAction, pending] = useActionState(placeOrder, null);
  const { clearCart } = useCart();

  useEffect(() => {
    if (state?.success) {
      clearCart();
    }
  }, [state?.success, clearCart]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>

      {state?.success && (
        <p className="mb-4 text-green-700">
          Order placed! ID: {state.id}. Your cart has been cleared.
        </p>
      )}

      <form action={formAction} className="space-y-4 max-w-md">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            className="mt-1 w-full border rounded px-3 py-2"
            required
          />
          {state?.fieldErrors?.name && (
            <p role="alert" className="text-red-600 text-sm mt-1">
              {state.fieldErrors.name[0]}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            className="mt-1 w-full border rounded px-3 py-2"
            placeholder="09xxxxxxxx or +2519xxxxxxxx"
            required
          />
          {state?.fieldErrors?.phone && (
            <p role="alert" className="text-red-600 text-sm mt-1">
              {state.fieldErrors.phone[0]}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium">
            Notes (optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={2}
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="bg-amber-800 text-white px-5 py-2 rounded-lg disabled:opacity-50"
        >
          {pending ? "Sending…" : "Place order"}
        </button>
      </form>

      <Link href="/cart" className="text-amber-800 underline mt-6 inline-block">
        ← Back to cart
      </Link>
    </div>
  );
}

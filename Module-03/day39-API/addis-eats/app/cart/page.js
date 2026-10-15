import Link from "next/link";

export default function CartPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      <p className="text-stone-600 mb-6">Cart coming soon.</p>
      <div className="flex gap-4">
        <Link href="/menu" className="text-amber-800 underline">
          Continue browsing menu
        </Link>
        <Link
          href="/checkout"
          className="bg-amber-800 text-white px-5 py-2 rounded-lg"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}

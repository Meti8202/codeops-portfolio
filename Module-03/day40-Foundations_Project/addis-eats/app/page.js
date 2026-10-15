import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Welcome to Addis Eats</h1>
      <p className="text-lg text-stone-600">
        Authentic Ethiopian flavors, delivered to your door.
      </p>
      <Link
        href="/menu"
        className="inline-block bg-amber-800 text-white px-6 py-3 rounded-lg font-medium"
      >
        Browse Menu
      </Link>
    </div>
  );
}

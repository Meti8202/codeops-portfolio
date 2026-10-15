import Link from "next/link";
import menuData from "../data/menu.json";

export default function HomePage() {
  const specials = menuData.data.slice(0, 3);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
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

      <section>
        <h2 className="text-2xl font-semibold mb-4">Today’s specials</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {specials.map((dish) => (
            <li
              key={dish.id}
              className="border rounded-xl p-4 bg-white shadow-sm"
            >
              <h3 className="font-semibold">{dish.nameEn}</h3>
              <p className="text-sm text-stone-600 mt-1">{dish.priceETB} ETB</p>
              <Link
                href={`/menu/${dish.slug}`}
                className="text-amber-800 text-sm underline mt-2 inline-block"
              >
                View dish
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

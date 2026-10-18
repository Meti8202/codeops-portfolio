import Link from "next/link";
import Image from "next/image";
import menuData from "../data/menu.json";

export const metadata = {
  title: "Home",
  description:
    "Order Ethiopian wats, tibs, and fasting dishes. Flavors from Addis, at your door.",
};

export default function HomePage() {
  const specials = menuData.data.slice(0, 3);

  const restaurantLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Addis Eats",
    description:
      "Authentic Ethiopian flavors delivered — wats, tibs, kitfo, and fasting dishes.",
    servesCuisine: "Ethiopian",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://addiseats.et",
  };

  return (
    <div className="space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantLd) }}
      />

      <section className="rounded-3xl bg-[var(--brand)] text-amber-50 px-8 py-14 shadow-lg overflow-hidden relative">
        <div className="relative z-10 max-w-xl space-y-5">
          <p className="text-amber-200 text-sm font-semibold tracking-widest uppercase">
            Ethiopian kitchen
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Flavors from Addis, at your door
          </h1>
          <p className="text-amber-100/90 text-lg">
            Slow-cooked wats, tibs, and fasting dishes — made the way they
            should be.
          </p>
          <Link
            href="/menu"
            className="inline-block bg-[var(--accent)] text-stone-900 px-7 py-3 rounded-full font-bold hover:bg-[var(--accent-dark)] transition"
          >
            Browse Menu
          </Link>
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-bold">Today’s specials</h2>
          <Link
            href="/menu"
            className="text-sm font-medium text-[var(--brand)] hover:underline"
          >
            View full menu →
          </Link>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {specials.map((dish, index) => (
            <li
              key={dish.id}
              className="rounded-2xl overflow-hidden bg-white shadow-md border border-[var(--line)] flex flex-col"
            >
              <Link href={`/menu/${dish.slug}`} className="flex-1">
                <div className="relative h-44 bg-stone-200">
                  <Image
                    src={`/images/${dish.image}`}
                    alt={dish.nameEn}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 33vw"
                    priority={index === 0}
                  />
                </div>
                <div className="bg-[var(--accent)] px-4 py-2.5">
                  <h3 className="font-bold text-stone-900 uppercase text-sm tracking-wide">
                    {dish.nameEn}
                  </h3>
                  <p className="font-semibold text-stone-800">
                    {dish.priceETB} ETB
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

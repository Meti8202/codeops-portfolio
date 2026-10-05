import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import menuData from "../../../data/menu.json";

export async function generateStaticParams() {
  return menuData.data.map((dish) => ({
    id: dish.slug,
  }));
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = menuData.data.find((d) => d.slug === id);

  if (!dish) {
    notFound();
  }

  return (
    <article>
      <Link href="/menu" className="text-amber-800 text-sm mb-4 inline-block">
        ← Back to menu
      </Link>

      <div className="relative h-72 rounded-xl overflow-hidden mb-6 bg-stone-200">
        <Image
          src={`/images/${dish.image}`}
          alt={dish.nameEn}
          fill
          className="object-cover"
          priority
        />
      </div>

      <h1 className="text-3xl font-bold">{dish.nameEn}</h1>
      <p className="text-stone-500">{dish.nameAm}</p>
      <p className="text-amber-800 font-medium text-xl mt-2">
        {dish.priceETB} ETB
      </p>
      <p className="mt-4 text-stone-600">{dish.description}</p>
    </article>
  );
}

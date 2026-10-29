import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import menuData from "../../../data/menu.json";
import AddToCartButton from "../AddToCartButton";

export async function generateStaticParams() {
  return menuData.data.map((dish) => ({
    id: dish.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = menuData.data.find((d) => d.slug === id);

  if (!dish) {
    return { title: "Dish not found" };
  }

  const description =
    dish.description?.slice(0, 155) ||
    `${dish.nameEn} — ${dish.priceETB} ETB at Addis Eats`;

  return {
    title: dish.nameEn,
    description,
    openGraph: {
      title: dish.nameEn,
      description,
      images: [
        {
          url: `/images/${dish.image}`,
          alt: dish.nameEn,
        },
      ],
    },
  };
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = menuData.data.find((d) => d.slug === id);

  if (!dish) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.nameEn,
    description: dish.description,
    image: `/images/${dish.image}`,
    offers: {
      "@type": "Offer",
      price: dish.priceETB,
      priceCurrency: "ETB",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link href="/menu" className="text-amber-800 text-sm mb-4 inline-block">
        ← Back to menu
      </Link>

      <div className="relative h-72 rounded-xl overflow-hidden mb-6 bg-stone-200">
        <Image
          src={`/images/${dish.image}`}
          alt={dish.nameEn}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 672px"
          priority
        />
      </div>

      <h1 className="text-3xl font-bold">{dish.nameEn}</h1>
      <p className="text-stone-500">{dish.nameAm}</p>
      <p className="text-amber-800 font-medium text-xl mt-2">
        {dish.priceETB} ETB
      </p>
      <p className="mt-4 text-stone-600">{dish.description}</p>

      <AddToCartButton dish={dish} />
    </article>
  );
}

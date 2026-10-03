import { Suspense } from "react";
import menuData from "../../data/menu.json";
import Dishlist from "./Dishlist";

export const revalidate = 3600;

function DishSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="h-64 bg-stone-200 animate-pulse rounded-xl" />
      ))}
    </div>
  );
}

export default function MenuPage() {
  const dishes = menuData.data;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Our Menu</h1>

      <Suspense fallback={<DishSkeleton />}>
        <Dishlist dishes={dishes} />
      </Suspense>
    </div>
  );
}

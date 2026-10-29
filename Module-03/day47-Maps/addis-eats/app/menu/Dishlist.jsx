import Link from "next/link";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";

export default function Dishlist({ dishes }) {
     return (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {dishes.map((dish) => (
                    <li
                         key={dish.id}
                         className="rounded-2xl overflow-hidden bg-white shadow-md flex flex-col border border-stone-200"
                    >
                         <Link href={`/menu/${dish.slug}`} className="flex-1">
                              <div className="relative h-48 bg-stone-200">
                                   <Image
                                        src={`/images/${dish.image}`}
                                        alt={dish.nameEn}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                   />
                              </div>
                              <div className="bg-[var(--accent)] px-4 py-2">
                                   <h2 className="font-bold text-stone-900 uppercase text-sm tracking-wide">
                                        {dish.nameEn}
                                   </h2>
                                   <p className="font-semibold text-stone-800">
                                        {dish.priceETB} ETB
                                   </p>
                              </div>
                              <div className="p-4 pt-2">
                                   <p className="text-sm text-stone-600 line-clamp-2">
                                        {dish.description}
                                   </p>
                              </div>
                         </Link>
                         <div className="px-4 pb-4">
                              <AddToCartButton dish={dish} />
                         </div>
                    </li>
               ))}
          </ul>
     );
}
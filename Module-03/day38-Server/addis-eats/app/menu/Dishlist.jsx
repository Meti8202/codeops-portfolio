import Link from "next/link";
import Image from "next/image";

export default function Dishlist({ dishes }) {
     return (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {dishes.map((dish) => (
                    <li
                         key={dish.id}
                         className="border rounded-xl overflow-hidden bg-white shadow-sm"
                    >
                         <Link href={`/menu/${dish.slug}`}>
                              <div className="relative h-48 bg-stone-200">
                                   <Image
                                        src={`/images/${dish.image}`}
                                        alt={dish.nameEn}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                   />
                              </div>
                              <div className="p-4">
                                   <h2 className="font-semibold text-lg">{dish.nameEn}</h2>
                                   <p className="text-sm text-stone-600 line-clamp-2">
                                        {dish.description}
                                   </p>
                                   <p className="mt-2 font-medium text-amber-800">
                                        {dish.priceETB} ETB
                                   </p>
                              </div>
                         </Link>
                    </li>
               ))}
          </ul>
     );
}
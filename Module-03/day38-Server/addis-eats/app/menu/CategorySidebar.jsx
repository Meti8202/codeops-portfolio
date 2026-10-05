"use client";

export default function CategorySidebar({ categories, active, onSelect }) {
     return (
          <aside className="w-56 shrink-0">
               <h2 className="font-semibold text-lg mb-3">Categories</h2>
               <ul className="space-y-1 text-sm">
                    <li>
                         <button
                              onClick={() => onSelect(null)}
                              className={`text-left w-full px-2 py-1 rounded ${!active ? "bg-amber-800 text-white" : "text-stone-600 hover:bg-stone-100"
                                   }`}
                         >
                              All dishes
                         </button>
                    </li>
                    {categories.map((cat) => (
                         <li key={cat}>
                              <button
                                   onClick={() => onSelect(cat)}
                                   className={`text-left w-full px-2 py-1 rounded ${active === cat
                                        ? "bg-amber-800 text-white"
                                        : "text-stone-600 hover:bg-stone-100"
                                        }`}
                              >
                                   {cat}
                              </button>
                         </li>
                    ))}
               </ul>
          </aside>
     );
}
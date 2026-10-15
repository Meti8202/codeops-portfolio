"use client";

export default function CategorySidebar({ categories, active, onSelect }) {
     return (
          <aside className="w-56 shrink-0">
               <h2 className="font-bold text-sm uppercase tracking-wider text-[var(--muted)] mb-3">
                    Categories
               </h2>
               <ul className="space-y-1 text-sm">
                    <li>
                         <button
                              onClick={() => onSelect(null)}
                              className={`text-left w-full px-3 py-2 rounded-lg font-medium transition ${!active
                                   ? "bg-[var(--brand)] text-white shadow-sm"
                                   : "text-stone-600 hover:bg-[var(--cream-dark)]"
                                   }`}
                         >
                              All dishes
                         </button>
                    </li>
                    {categories.map((cat) => (
                         <li key={cat}>
                              <button
                                   onClick={() => onSelect(cat)}
                                   className={`text-left w-full px-3 py-2 rounded-lg font-medium transition ${active === cat
                                        ? "bg-[var(--brand)] text-white shadow-sm"
                                        : "text-stone-600 hover:bg-[var(--cream-dark)]"
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
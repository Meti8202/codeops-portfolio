export default function Categorybar({ categories, active, onSelect }) {
     return (
          <div className="flex flex-wrap gap-2 mb-6">
               <button
                    onClick={() => onSelect(null)}
                    className={`px-4 py-1.5 rounded-full text-sm ${!active ? "bg-amber-800 text-white" : "bg-stone-200"
                         }`}
               >
                    All
               </button>
               {categories.map((cat) => (
                    <button
                         key={cat}
                         onClick={() => onSelect(cat)}
                         className={`px-4 py-1.5 rounded-full text-sm ${active === cat ? "bg-amber-800 text-white" : "bg-stone-200"
                              }`}
                    >
                         {cat}
                    </button>
               ))}
          </div>
     );
}
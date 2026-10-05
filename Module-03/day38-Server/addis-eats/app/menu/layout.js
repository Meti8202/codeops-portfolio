import menuData from "../../data/menu.json";

const categories = [...new Set(menuData.data.map((d) => d.category))];

export default function MenuLayout({ children }) {
  return (
    <div className="flex gap-8">
      <aside className="w-56 shrink-0">
        <h2 className="font-semibold text-lg mb-3">Categories</h2>
        <ul className="space-y-1 text-sm text-stone-600">
          {categories.map((cat) => (
            <li key={cat}>{cat}</li>
          ))}
        </ul>
      </aside>

      <div className="flex-1">{children}</div>
    </div>
  );
}

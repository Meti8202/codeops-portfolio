export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="h-8 w-48 bg-stone-200 animate-pulse rounded" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-64 bg-stone-200 animate-pulse rounded-xl" />
        ))}
      </div>
      <p className="text-center text-stone-500">Loading menu…</p>
    </div>
  );
}

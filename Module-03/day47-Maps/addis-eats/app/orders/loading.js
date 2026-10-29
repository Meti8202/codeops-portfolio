export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="h-9 w-48 bg-stone-200 animate-pulse rounded-lg" />
      <div className="space-y-2 border border-[var(--line)] rounded-2xl p-2 bg-white">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 bg-stone-200 animate-pulse rounded-lg" />
        ))}
      </div>
    </div>
  );
}

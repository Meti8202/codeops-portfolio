"use client";

export default function Error({ error, reset }) {
  return (
    <div className="border border-red-200 bg-red-50 rounded-2xl p-8 space-y-3">
      <h2 className="text-lg font-bold text-red-900">Could not load orders</h2>
      <p className="text-sm text-red-800">
        {error?.message || "Something went wrong."}
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="px-4 py-2 rounded-full bg-[var(--brand)] text-white text-sm font-bold"
      >
        Try again
      </button>
    </div>
  );
}

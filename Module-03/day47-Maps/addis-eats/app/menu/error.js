"use client";

export default function Error({ error, reset }) {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-red-700 mb-2">
        Something went wrong
      </h2>
      <p className="text-stone-600 mb-6">{error.message}</p>
      <button
        onClick={() => reset()}
        className="bg-amber-800 text-white px-5 py-2 rounded-lg"
      >
        Try again
      </button>
    </div>
  );
}

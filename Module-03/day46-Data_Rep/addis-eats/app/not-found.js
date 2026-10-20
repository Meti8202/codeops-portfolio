import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-4">404 – Not Found</h1>
      <p className="text-stone-600 mb-8">This dish or page does not exist.</p>
      <Link
        href="/menu"
        className="bg-amber-800 text-white px-6 py-3 rounded-lg"
      >
        Back to Menu
      </Link>
    </div>
  );
}

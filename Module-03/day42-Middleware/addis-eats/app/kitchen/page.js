import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import Link from "next/link";

export default async function KitchenPage() {
  const user = await getSession();

  if (!user) {
    redirect("/signin?next=/kitchen");
  }

  if (user.role !== "staff") {
    redirect("/");
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-3xl font-bold mb-4">Kitchen</h1>
      <p className="text-[var(--muted)] mb-6">
        Staff only. Signed in as {user.name}.
      </p>
      <p className="mb-4">Incoming orders</p>
      <Link
        href="/menu"
        className="text-[var(--brand)] font-medium hover:underline"
      >
        ← Back to menu
      </Link>
    </div>
  );
}

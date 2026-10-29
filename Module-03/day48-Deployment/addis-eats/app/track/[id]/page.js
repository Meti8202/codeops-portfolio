import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getOrder } from "@/lib/db";
import { getSession } from "@/lib/session";
import Map from "./Map";
import LiveStatus from "./LiveStatus";

export const metadata = {
  title: "Track order",
  description: "Live delivery tracking for your Addis Eats order.",
};

export default async function TrackPage({ params }) {
  const user = await getSession();
  if (!user) {
    redirect("/signin?next=/track");
  }

  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    notFound();
  }

  if (order.userId && order.userId !== user.id && user.role !== "staff") {
    notFound();
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <Link
          href={`/orders/${order.id}`}
          className="text-sm text-[var(--brand)] font-medium hover:underline"
        >
          ← Order details
        </Link>
        <h1 className="text-3xl font-bold mt-2">Track order</h1>
        <p className="text-sm text-[var(--muted)] mt-1 font-mono">{order.id}</p>
      </div>

      <section>
        <h2 className="text-lg font-bold mb-3">Delivery location</h2>
        <Map
          area={order.area}
          customerName={order.name}
          status={order.status}
        />
      </section>

      <section>
        <h2 className="text-lg font-bold mb-3">Live status</h2>
        <LiveStatus id={order.id} initial={order} />
      </section>
    </div>
  );
}

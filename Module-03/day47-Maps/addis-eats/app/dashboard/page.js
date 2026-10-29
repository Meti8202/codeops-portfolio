import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { listAllOrders, AREAS } from "@/lib/db";
import Link from "next/link";
import RevenueChart from "./RevenueChart";
import OrdersLineChart from "./OrdersLineChart";

export const metadata = {
  title: "Dashboard",
  description: "Revenue and order activity for Addis Eats kitchen staff.",
};

function dayKey(iso) {
  return iso.slice(0, 10);
}

export default async function DashboardPage() {
  const user = await getSession();
  if (!user) redirect("/signin?next=/dashboard");
  if (user.role !== "staff") redirect("/");

  const orders = await listAllOrders();

  const byArea = AREAS.map((area) => ({
    area,
    revenue: orders
      .filter((o) => o.area === area)
      .reduce((sum, o) => sum + (o.total ?? 0), 0),
  }));

  const byDayMap = new Map();
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    byDayMap.set(key, 0);
  }
  for (const o of orders) {
    const key = dayKey(o.createdAt);
    if (byDayMap.has(key)) {
      byDayMap.set(key, byDayMap.get(key) + 1);
    }
  }
  const byDay = [...byDayMap.entries()].map(([date, count]) => ({
    date,
    orders: count,
  }));

  const rangeLabel =
    byDay.length > 0
      ? `${byDay[0].date} → ${byDay[byDay.length - 1].date}`
      : "No range";

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-[var(--muted)] mt-1">
            Staff view · signed in as {user.name}
          </p>
        </div>
        <Link
          href="/orders"
          className="text-sm font-medium text-[var(--brand)] hover:underline"
        >
          All orders →
        </Link>
      </div>

      {orders.length === 0 ? (
        <p className="text-[var(--muted)] border border-[var(--line)] rounded-2xl bg-white p-8">
          No orders yet. Charts will appear when orders exist.
        </p>
      ) : (
        <>
          {/* Revenue by neighbourhood – bar chart + companion table */}
          <section>
            <h2 className="text-lg font-bold mb-1">Revenue by neighbourhood</h2>
            <p className="text-sm text-[var(--muted)] mb-4">
              Total order value (ETB) by area
            </p>
            <div className="bg-white border border-[var(--line)] rounded-2xl p-4 shadow-sm">
              <RevenueChart data={byArea} />
            </div>
            <table className="mt-4 w-full text-sm border border-[var(--line)] rounded-xl overflow-hidden bg-white">
              <caption className="sr-only">
                Revenue by neighbourhood in ETB
              </caption>
              <thead className="bg-[var(--cream-dark)] text-left">
                <tr>
                  <th scope="col" className="px-4 py-2 font-semibold">
                    Area
                  </th>
                  <th scope="col" className="px-4 py-2 font-semibold">
                    Revenue (ETB)
                  </th>
                </tr>
              </thead>
              <tbody>
                {byArea.map((row) => (
                  <tr key={row.area} className="border-t border-[var(--line)]">
                    <td className="px-4 py-2">{row.area}</td>
                    <td className="px-4 py-2">{row.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Orders per day – line chart + companion table (Day 46 requirement) */}
          <section>
            <h2 className="text-lg font-bold mb-1">Orders per day</h2>
            <p className="text-sm text-[var(--muted)] mb-4">
              Count of orders · {rangeLabel} · unit: orders
            </p>
            <div className="bg-white border border-[var(--line)] rounded-2xl p-4 shadow-sm">
              <OrdersLineChart data={byDay} />
            </div>
            <table className="mt-4 w-full text-sm border border-[var(--line)] rounded-xl overflow-hidden bg-white">
              <caption className="sr-only">
                Orders per day for the last seven days
              </caption>
              <thead className="bg-[var(--cream-dark)] text-left">
                <tr>
                  <th scope="col" className="px-4 py-2 font-semibold">
                    Date
                  </th>
                  <th scope="col" className="px-4 py-2 font-semibold">
                    Orders
                  </th>
                </tr>
              </thead>
              <tbody>
                {byDay.map((row) => (
                  <tr key={row.date} className="border-t border-[var(--line)]">
                    <td className="px-4 py-2">{row.date}</td>
                    <td className="px-4 py-2">{row.orders}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}
    </div>
  );
}

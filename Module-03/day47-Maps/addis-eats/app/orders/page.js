import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/session";
import { listAllOrders, listOrdersFor } from "@/lib/db";
import OrderTable from "./OrderTable";
import ExportButton from "./ExportButton";

export const metadata = {
  title: "Orders",
  description: "Order history for Addis Eats.",
};

const PAGE_SIZE = 5;

export default async function OrdersPage({ searchParams }) {
  const user = await getSession();
  if (!user) redirect("/signin?next=/orders");

  const params = await searchParams;
  const sort =
    params.sort === "total" || params.sort === "name" ? params.sort : "date";
  const dir = params.dir === "asc" ? "asc" : "desc";
  const page = Math.max(1, Number(params.page) || 1);

  if (params.state === "error") {
    throw new Error("Forced error state for demo");
  }

  let orders =
    user.role === "staff"
      ? await listAllOrders()
      : await listOrdersFor(user.id);

  if (params.state === "empty") {
    orders = [];
  }

  orders = [...orders].sort((a, b) => {
    let cmp = 0;
    if (sort === "total") cmp = (a.total ?? 0) - (b.total ?? 0);
    else if (sort === "name") cmp = (a.name || "").localeCompare(b.name || "");
    else cmp = (a.createdAt || "").localeCompare(b.createdAt || "");
    return dir === "asc" ? cmp : -cmp;
  });

  const total = orders.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const slice = orders.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            {user.role === "staff" ? "All orders" : "My orders"}
          </h1>
          <p className="text-sm text-[var(--muted)] mt-1">
            Sorted by {sort} ({dir}) · page {safePage} of {totalPages}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ExportButton orders={orders} />
          {user.role === "staff" && (
            <Link
              href="/dashboard"
              className="text-sm font-medium text-[var(--brand)] hover:underline"
            >
              ← Dashboard
            </Link>
          )}
        </div>
      </div>

      {total === 0 ? (
        <div className="border border-[var(--line)] rounded-2xl bg-white p-10 text-center space-y-3">
          <p className="font-bold text-lg">No orders yet</p>
          <p className="text-[var(--muted)] text-sm">
            When orders are placed, they will show up here.
          </p>
          <Link
            href="/menu"
            className="inline-block text-[var(--brand)] font-medium hover:underline"
          >
            Browse menu
          </Link>
        </div>
      ) : (
        <OrderTable
          orders={slice}
          sort={sort}
          dir={dir}
          page={safePage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}

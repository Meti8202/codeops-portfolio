import { notFound, redirect } from "next/navigation";
import { getOrder } from "@/lib/db";
import { getSession } from "@/lib/session";
import Status from "./Status";

export default async function OrderPage({ params }) {
  const user = await getSession();
  if (!user) {
    redirect("/signin");
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
    <div className="max-w-lg">
      <h1 className="text-3xl font-bold mb-6">Order status</h1>
      <Status id={id} fallbackData={order} />
    </div>
  );
}

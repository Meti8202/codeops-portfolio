import { notFound } from "next/navigation";
import { getOrder } from "@/lib/db";
import Status from "./Status";

export default async function OrderPage({ params }) {
  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    notFound();
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-3xl font-bold mb-6">Order status</h1>
      <Status id={id} fallbackData={order} />
    </div>
  );
}

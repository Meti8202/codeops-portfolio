"use server";

import { revalidatePath } from "next/cache";
import { orderSchema } from "@/data/schema";
import { createOrder, getOrder, markCancelled, getSession } from "@/data/db";

export async function placeOrder(prevState, formData) {
  const raw = {
    name: formData.get("name")?.toString().trim() || "",
    phone: formData.get("phone")?.toString().trim() || "",
    dishId: formData.get("dishId")?.toString() || undefined,
    quantity: formData.get("quantity") || 1,
    notes: formData.get("notes")?.toString().trim() || undefined,
  };

  const parsed = orderSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const order = await createOrder(parsed.data);
  revalidatePath("/checkout");
  return { id: order.id, success: true };
}

export async function cancelOrder(orderId) {
  const user = await getSession();
  if (!user) throw new Error("Not signed in");

  const order = await getOrder(orderId);
  if (!order) throw new Error("Order not found");
  if (order.userId !== user.id) throw new Error("Not yours");

  await markCancelled(orderId);
  revalidatePath("/checkout");
  return { success: true };
}

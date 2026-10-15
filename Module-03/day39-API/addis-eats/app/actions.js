"use server";

import { revalidatePath } from "next/cache";
import { orderSchema } from "@/data/schema";
import { createOrder, getOrder, markCancelled, getSession } from "@/data/db";

export async function placeOrder(prevState, formData) {
  const parsed = orderSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    dishId: formData.get("dishId") || undefined,
    quantity: formData.get("quantity") ? Number(formData.get("quantity")) : 1,
    notes: formData.get("notes") || undefined,
  });

  if (!parsed.success) {
    return {
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const order = await createOrder(parsed.data);
  revalidatePath("/orders"); // or whatever path lists orders
  return { id: order.id, success: true };
}

export async function cancelOrder(orderId) {
  const user = await getSession();
  if (!user) {
    throw new Error("Not signed in");
  }

  const order = await getOrder(orderId);
  if (!order) {
    throw new Error("Order not found");
  }

  if (order.userId !== user.id) {
    throw new Error("Not yours");
  }

  await markCancelled(orderId);
  revalidatePath("/orders");
  return { success: true };
}

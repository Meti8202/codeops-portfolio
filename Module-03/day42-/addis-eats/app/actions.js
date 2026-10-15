"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { orderSchema } from "@/lib/schema";
import { createOrder, getOrder, markCancelled } from "@/lib/db";
import { getSession, createSession, destroySession } from "@/lib/session";

export async function signIn(prevState, formData) {
  const phone = formData.get("phone")?.toString().trim() || "";
  const nextRaw = formData.get("next")?.toString() || "/";

  const next =
    nextRaw.startsWith("/") && !nextRaw.startsWith("//") ? nextRaw : "/";

  const user = await createSession(phone);
  if (!user) {
    return { error: "No account found for that phone number." };
  }

  redirect(next);
}

export async function signOut() {
  await destroySession();
  redirect("/");
}

export async function placeOrder(prevState, formData) {
  const user = await getSession();
  if (!user) {
    return { error: "You must be signed in to place an order." };
  }

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

  const order = await createOrder({
    ...parsed.data,
    userId: user.id,
  });

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

import { orderSchema } from "@/data/schema";
import { createOrder } from "@/data/db";

export async function POST(request) {
  const body = await request.json();
  const result = orderSchema.safeParse(body);

  if (!result.success) {
    return Response.json(
      {
        error: "Validation failed",
        fieldErrors: result.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  const order = await createOrder(result.data);
  return Response.json(order, { status: 201 });
}

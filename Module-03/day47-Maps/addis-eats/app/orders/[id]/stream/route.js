import { getOrder } from "@/lib/db";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  const user = await getSession();
  if (!user) {
    return new Response("Not signed in", { status: 401 });
  }

  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    return new Response("Order not found", { status: 404 });
  }

  if (order.userId && order.userId !== user.id && user.role !== "staff") {
    return new Response("Not yours", { status: 403 });
  }

  const encoder = new TextEncoder();
  let closed = false;

  const stream = new ReadableStream({
    async start(controller) {
      const send = (data) => {
        if (closed) return;
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      send({
        id: order.id,
        status: order.status,
        area: order.area,
        name: order.name,
        total: order.total,
        createdAt: order.createdAt,
      });

      const interval = setInterval(async () => {
        if (closed) {
          clearInterval(interval);
          return;
        }
        const current = await getOrder(id);
        if (!current) {
          send({ error: "Order not found" });
          clearInterval(interval);
          controller.close();
          return;
        }
        send({
          id: current.id,
          status: current.status,
          area: current.area,
          name: current.name,
          total: current.total,
          createdAt: current.createdAt,
        });

        // Close deliberately when the order is finished
        if (current.status === "delivered" || current.status === "cancelled") {
          clearInterval(interval);
          controller.close();
        }
      }, 4000);

      request.signal.addEventListener("abort", () => {
        closed = true;
        clearInterval(interval);
        try {
          controller.close();
        } catch {}
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}

"use client";

import { useEffect, useState } from "react";
import { etb, when, relative } from "@/lib/format";

export default function LiveStatus({ id, initial }) {
     const [order, setOrder] = useState(initial);
     const [connection, setConnection] = useState("connecting");

     useEffect(() => {
          const es = new EventSource(`/api/orders/${id}/stream`);

          es.onopen = () => setConnection("live");

          es.onmessage = (event) => {
               try {
                    const data = JSON.parse(event.data);
                    if (data.error) {
                         setConnection("closed");
                         es.close();
                         return;
                    }
                    setOrder((prev) => ({ ...prev, ...data }));
                    setConnection("live");

                    if (data.status === "delivered" || data.status === "cancelled") {
                         setConnection("closed");
                         es.close();
                    }
               } catch {

               }
          };

          es.onerror = () => {
               setConnection("closed");
               es.close();
          };

          return () => {
               es.close();
          };
     }, [id]);

     return (
          <div className="border border-[var(--line)] rounded-2xl bg-white p-5 shadow-sm space-y-3">
               <div className="flex items-center justify-between gap-3">
                    <p className="text-2xl font-bold capitalize">
                         Status:{" "}
                         <span
                              className={
                                   order.status === "cancelled"
                                        ? "text-red-700"
                                        : order.status === "delivered" || order.status === "ready"
                                             ? "text-green-700"
                                             : "text-[var(--brand)]"
                              }
                         >
                              {order.status}
                         </span>
                    </p>
                    <span
                         className={`text-xs font-medium px-2.5 py-1 rounded-full ${connection === "live"
                              ? "bg-green-100 text-green-800"
                              : connection === "connecting"
                                   ? "bg-amber-100 text-amber-800"
                                   : "bg-stone-100 text-stone-600"
                              }`}
                    >
                         {connection === "live"
                              ? "Live"
                              : connection === "connecting"
                                   ? "Connecting…"
                                   : "Closed"}
                    </span>
               </div>

               <dl className="text-sm space-y-1.5 text-[var(--muted)]">
                    <div className="flex justify-between gap-4">
                         <dt>Customer</dt>
                         <dd className="font-medium text-[var(--ink)]">{order.name}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                         <dt>Area</dt>
                         <dd className="font-medium text-[var(--ink)]">{order.area ?? "—"}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                         <dt>Total</dt>
                         <dd className="font-medium text-[var(--ink)]">
                              {etb.format(order.total ?? 0)}
                         </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                         <dt>Placed</dt>
                         <dd className="font-medium text-[var(--ink)]">
                              {when(order.createdAt)} ({relative(order.createdAt)})
                         </dd>
                    </div>
               </dl>

               <p className="text-xs text-[var(--muted)] pt-1">
                    Updates over connection.
               </p>
          </div>
     );
}
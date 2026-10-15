"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import Link from "next/link";

export default function Status({ id, fallbackData }) {
     const { data, error, isLoading } = useSWR(`/api/orders/${id}`, fetcher, {
          fallbackData,
          refreshInterval: 5000,
     });

     // With fallbackData the first paint never shows a spinner
     if (isLoading && !data) {
          return <p className="text-[var(--muted)]">Loading order…</p>;
     }

     if (error) {
          return (
               <p className="text-red-700">
                    Could not load the order.{" "}
                    <Link href="/menu" className="underline">
                         Back to menu
                    </Link>
               </p>
          );
     }

     return (
          <div className="space-y-4">
               <p className="text-sm text-[var(--muted)]">
                    Order <span className="font-mono font-semibold">{data.id}</span>
               </p>
               <p className="text-2xl font-bold capitalize">
                    Status:{" "}
                    <span
                         className={
                              data.status === "cancelled"
                                   ? "text-red-700"
                                   : data.status === "ready"
                                        ? "text-green-700"
                                        : "text-[var(--brand)]"
                         }
                    >
                         {data.status}
                    </span>
               </p>
               <p className="text-sm text-[var(--muted)]">
                    Updates every 5 seconds. You can leave this page open.
               </p>
               <Link
                    href="/menu"
                    className="inline-block mt-4 text-[var(--brand)] font-medium hover:underline"
               >
                    ← Back to menu
               </Link>
          </div>
     );
}
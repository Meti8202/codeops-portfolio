"use client";

import { toCsv, downloadCsv } from "@/lib/csv";
import { etb, when } from "@/lib/format";

export default function ExportButton({ orders }) {
     function handleExport() {
          if (!orders || orders.length === 0) return;

          const rows = orders.map((o) => ({
               id: o.id,
               name: o.name,
               area: o.area ?? "",
               status: o.status,
               total: etb.format(o.total ?? 0),
               placed: when(o.createdAt),
          }));

          const csv = toCsv(rows, ["id", "name", "area", "status", "total", "placed"]);
          downloadCsv(csv, "addis-eats-orders.csv");
     }

     return (
          <button
               type="button"
               onClick={handleExport}
               disabled={!orders || orders.length === 0}
               className="px-4 py-2 rounded-full border border-[var(--line)] text-sm font-medium hover:bg-[var(--cream-dark)] disabled:opacity-40 transition"
          >
               Export CSV
          </button>
     );
}
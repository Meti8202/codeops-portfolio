import Link from "next/link";

function sortHref(sort, dir, page, column) {
     const nextDir = sort === column && dir === "asc" ? "desc" : "asc";
     const params = new URLSearchParams({
          sort: column,
          dir: sort === column ? nextDir : "asc",
          page: "1",
     });
     return `/orders?${params.toString()}`;
}

function pageHref(sort, dir, page) {
     const params = new URLSearchParams({
          sort,
          dir,
          page: String(page),
     });
     return `/orders?${params.toString()}`;
}

export default function OrderTable({ orders, sort, dir, page, totalPages }) {
     return (
          <div className="space-y-4">
               <div className="overflow-x-auto border border-[var(--line)] rounded-2xl bg-white shadow-sm">
                    <table className="w-full text-sm text-left">
                         <caption className="caption-bottom p-3 text-[var(--muted)] text-xs">
                              Orders · click a column header to sort
                         </caption>
                         <thead className="bg-[var(--cream-dark)]">
                              <tr>
                                   <th scope="col" className="px-4 py-3 font-semibold">
                                        <Link
                                             href={sortHref(sort, dir, page, "date")}
                                             className="hover:underline"
                                             aria-sort={
                                                  sort === "date"
                                                       ? dir === "asc"
                                                            ? "ascending"
                                                            : "descending"
                                                       : "none"
                                             }
                                        >
                                             Date {sort === "date" ? (dir === "asc" ? "↑" : "↓") : ""}
                                        </Link>
                                   </th>
                                   <th scope="col" className="px-4 py-3 font-semibold">
                                        <Link
                                             href={sortHref(sort, dir, page, "name")}
                                             className="hover:underline"
                                             aria-sort={
                                                  sort === "name"
                                                       ? dir === "asc"
                                                            ? "ascending"
                                                            : "descending"
                                                       : "none"
                                             }
                                        >
                                             Name {sort === "name" ? (dir === "asc" ? "↑" : "↓") : ""}
                                        </Link>
                                   </th>
                                   <th scope="col" className="px-4 py-3 font-semibold">
                                        Area
                                   </th>
                                   <th scope="col" className="px-4 py-3 font-semibold">
                                        Status
                                   </th>
                                   <th scope="col" className="px-4 py-3 font-semibold">
                                        <Link
                                             href={sortHref(sort, dir, page, "total")}
                                             className="hover:underline"
                                             aria-sort={
                                                  sort === "total"
                                                       ? dir === "asc"
                                                            ? "ascending"
                                                            : "descending"
                                                       : "none"
                                             }
                                        >
                                             Total (ETB) {sort === "total" ? (dir === "asc" ? "↑" : "↓") : ""}
                                        </Link>
                                   </th>
                                   <th scope="col" className="px-4 py-3 font-semibold">
                                        <span className="sr-only">View</span>
                                   </th>
                              </tr>
                         </thead>
                         <tbody>
                              {orders.map((o) => (
                                   <tr key={o.id} className="border-t border-[var(--line)]">
                                        <td className="px-4 py-3 whitespace-nowrap">
                                             {o.createdAt?.slice(0, 10)}
                                        </td>
                                        <td className="px-4 py-3">{o.name}</td>
                                        <td className="px-4 py-3">{o.area ?? "—"}</td>
                                        <td className="px-4 py-3 capitalize">{o.status}</td>
                                        <td className="px-4 py-3">{o.total ?? "—"}</td>
                                        <td className="px-4 py-3">
                                             <Link
                                                  href={`/orders/${o.id}`}
                                                  className="text-[var(--brand)] font-medium hover:underline"
                                             >
                                                  View
                                             </Link>
                                        </td>
                                   </tr>
                              ))}
                         </tbody>
                    </table>
               </div>

               {totalPages > 1 && (
                    <nav
                         className="flex items-center justify-center gap-3"
                         aria-label="Order pages"
                    >
                         {page > 1 ? (
                              <Link
                                   href={pageHref(sort, dir, page - 1)}
                                   className="px-4 py-2 rounded-full border border-[var(--line)] text-sm"
                              >
                                   Previous
                              </Link>
                         ) : (
                              <span className="px-4 py-2 rounded-full border border-[var(--line)] text-sm opacity-40">
                                   Previous
                              </span>
                         )}
                         <span className="text-sm text-[var(--muted)]">
                              Page {page} of {totalPages}
                         </span>
                         {page < totalPages ? (
                              <Link
                                   href={pageHref(sort, dir, page + 1)}
                                   className="px-4 py-2 rounded-full border border-[var(--line)] text-sm"
                              >
                                   Next
                              </Link>
                         ) : (
                              <span className="px-4 py-2 rounded-full border border-[var(--line)] text-sm opacity-40">
                                   Next
                              </span>
                         )}
                    </nav>
               )}
          </div>
     );
}
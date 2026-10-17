"use client";

import { useState, useCallback } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import Search from "./Search";
import Dishlist from "./Dishlist";
import CategorySidebar from "./CategorySidebar";

export default function MenuWithSearch({ categories }) {
     const [query, setQuery] = useState("");
     const [page, setPage] = useState(1);
     const [activeCategory, setActiveCategory] = useState(null);

     const handleSearch = useCallback((term) => {
          setQuery(term);
          setPage(1);
     }, []);

     const key =
          query || activeCategory || page > 1
               ? `/api/dishes?q=${encodeURIComponent(query)}&page=${page}`
               : `/api/dishes?page=${page}`;

     const { data, error, isLoading } = useSWR(key, fetcher, {
          keepPreviousData: true,
     });

     const dishes = data?.items ?? [];
     const totalPages = data?.totalPages ?? 1;

     const filtered = activeCategory
          ? dishes.filter((d) => d.category === activeCategory)
          : dishes;

     return (
          <div>
               <Search value={query} onChange={handleSearch} />

               <div className="flex gap-8">
                    <CategorySidebar
                         categories={categories}
                         active={activeCategory}
                         onSelect={(cat) => {
                              setActiveCategory(cat);
                              setPage(1);
                         }}
                    />

                    <div className="flex-1">
                         {error && (
                              <p className="text-red-700 mb-4">Could not load dishes.</p>
                         )}
                         {isLoading && !data && (
                              <p className="text-[var(--muted)] mb-4">Loading menu…</p>
                         )}

                         <Dishlist dishes={filtered} />

                         {totalPages > 1 && (
                              <div className="mt-8 flex items-center justify-center gap-4">
                                   <button
                                        type="button"
                                        disabled={page <= 1}
                                        onClick={() => setPage((p) => p - 1)}
                                        className="px-4 py-2 rounded-full border border-[var(--line)] disabled:opacity-40"
                                   >
                                        Previous
                                   </button>
                                   <span className="text-sm text-[var(--muted)]">
                                        Page {page} of {totalPages}
                                   </span>
                                   <button
                                        type="button"
                                        disabled={page >= totalPages}
                                        onClick={() => setPage((p) => p + 1)}
                                        className="px-4 py-2 rounded-full border border-[var(--line)] disabled:opacity-40"
                                   >
                                        Next
                                   </button>
                              </div>
                         )}
                    </div>
               </div>
          </div>
     );
}
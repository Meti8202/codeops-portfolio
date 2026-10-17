"use client";

import { useState, useEffect } from "react";

export default function Search({ value, onChange }) {
     const [term, setTerm] = useState(value ?? "");


     useEffect(() => {
          const id = setTimeout(() => {
               onChange(term.trim());
          }, 300);
          return () => clearTimeout(id);
     }, [term, onChange]);

     return (
          <div className="mb-6">
               <label htmlFor="menu-search" className="sr-only">
                    Search dishes
               </label>
               <input
                    id="menu-search"
                    type="search"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="Search dishes…"
                    className="w-full max-w-md border border-[var(--line)] rounded-xl px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/30"
               />
          </div>
     );
}
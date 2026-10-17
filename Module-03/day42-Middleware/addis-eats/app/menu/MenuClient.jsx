"use client";

import { useState } from "react";
import CategorySidebar from "./CategorySidebar";
import Dishlist from "./Dishlist";

export default function MenuClient({ categories, dishes }) {
     const [active, setActive] = useState(null);

     const filtered = active
          ? dishes.filter((d) => d.category === active)
          : dishes;

     return (
          <div className="flex gap-8">
               <CategorySidebar
                    categories={categories}
                    active={active}
                    onSelect={setActive}
               />
               <div className="flex-1">
                    <Dishlist dishes={filtered} />
               </div>
          </div>
     );
}
"use client";

import dynamic from "next/dynamic";

const DeliveryMap = dynamic(() => import("./DeliveryMap"), {
     ssr: false,
     loading: () => (
          <div className="h-80 bg-[var(--cream-dark)] rounded-2xl animate-pulse" />
     ),
});

export default function Map(props) {
     return (
          <div>
               <DeliveryMap {...props} />
               <p className="text-sm text-[var(--muted)] mt-3">
                    Delivering to {props.customerName ?? "customer"} in{" "}
                    {props.area ?? "Addis Ababa"}. Status: {props.status ?? "pending"}.
               </p>
          </div>
     );
}
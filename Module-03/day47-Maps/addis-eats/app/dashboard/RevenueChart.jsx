"use client";

import {
     BarChart,
     Bar,
     XAxis,
     YAxis,
     Tooltip,
     ResponsiveContainer,
} from "recharts";

const etb = (value) =>
     new Intl.NumberFormat("en-ET", {
          style: "currency",
          currency: "ETB",
          maximumFractionDigits: 0,
     }).format(value);

export default function RevenueChart({ data }) {
     return (
          <div style={{ width: "100%", height: 300 }}>
               <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                         <XAxis dataKey="area" tick={{ fontSize: 12 }} />
                         <YAxis
                              width={80}
                              tick={{ fontSize: 12 }}
                              tickFormatter={etb}
                              domain={[0, "auto"]}
                              label={{ value: "ETB", angle: -90, position: "insideLeft" }}
                         />
                         <Tooltip
                              formatter={(value) => [etb(value), "Revenue"]}
                              labelFormatter={(label) => `Area: ${label}`}
                         />
                         <Bar dataKey="revenue" fill="#9a3412" name="Revenue" />
                    </BarChart>
               </ResponsiveContainer>
          </div>
     );
}

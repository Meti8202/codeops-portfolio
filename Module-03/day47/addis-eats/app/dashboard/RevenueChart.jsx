"use client";

import {
     BarChart,
     Bar,
     XAxis,
     YAxis,
     Tooltip,
     ResponsiveContainer,
} from "recharts";

export default function RevenueChart({ data }) {
     return (
          <div style={{ width: "100%", height: 300 }}>
               <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                         <XAxis dataKey="area" tick={{ fontSize: 12 }} />
                         <YAxis
                              tick={{ fontSize: 12 }}
                              tickFormatter={(v) => `${v}`}
                              label={{ value: "ETB", angle: -90, position: "insideLeft" }}
                         />
                         <Tooltip
                              formatter={(value) => [`${value} ETB`, "Revenue"]}
                              labelFormatter={(label) => `Area: ${label}`}
                         />
                         <Bar dataKey="revenue" fill="#9a3412" name="Revenue" />
                    </BarChart>
               </ResponsiveContainer>
          </div>
     );
}
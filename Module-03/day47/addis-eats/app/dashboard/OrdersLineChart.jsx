"use client";

import {
     LineChart,
     Line,
     XAxis,
     YAxis,
     Tooltip,
     ResponsiveContainer,
     CartesianGrid,
} from "recharts";

export default function OrdersLineChart({ data }) {
     return (
          <div style={{ width: "100%", height: 300 }}>
               <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                         <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
                         <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                         <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                         <Tooltip
                              formatter={(value) => [value, "Orders"]}
                              labelFormatter={(label) => `Date: ${label}`}
                         />
                         <Line
                              type="monotone"
                              dataKey="orders"
                              stroke="#9a3412"
                              strokeWidth={2}
                              dot={{ r: 4 }}
                              name="Orders"
                         />
                    </LineChart>
               </ResponsiveContainer>
          </div>
     );
}
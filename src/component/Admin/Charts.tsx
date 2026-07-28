"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", uploads: 120 },
  { month: "Feb", uploads: 200 },
  { month: "Mar", uploads: 170 },
  { month: "Apr", uploads: 320 },
  { month: "May", uploads: 420 },
  { month: "Jun", uploads: 510 },
  { month: "Jul", uploads: 620 },
  { month: "Aug", uploads: 590 },
  { month: "Sep", uploads: 710 },
  { month: "Oct", uploads: 850 },
  { month: "Nov", uploads: 920 },
  { month: "Dec", uploads: 1050 },
];

const AnalyticsChart = () => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-slate-900">
            Notes Upload Analytics
          </h2>

          <p className="text-slate-500">
            Monthly uploaded study resources
          </p>

        </div>

        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
          2026
        </span>

      </div>

      <div className="h-[360px]">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="uploads"
              stroke="#2563EB"
              strokeWidth={4}
              dot={{
                r: 5,
              }}
              activeDot={{
                r: 8,
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default AnalyticsChart;
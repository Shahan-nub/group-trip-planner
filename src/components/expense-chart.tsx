"use client";

import { PieChart, Pie, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = [
  "#3B82F6", // blue
  "#10B981", // emerald
  "#F59E0B", // amber
  "#EF4444", // red
  "#8B5CF6", // violet
  "#EC4899", // pink
  "#14B8A6", // teal
  "#F97316", // orange
  "#6366F1", // indigo
  "#06B6D4", // cyan
];

export default function ExpenseChart({ data }: { data: any[] }) {
  // Add fill color to each data item if not already present
  const coloredData = data.map((item, index) => ({
    ...item,
    fill: item.fill || COLORS[index % COLORS.length],
  }));

  return (
    <div className="w-full h-96 glass rounded-3xl p-6">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={coloredData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label={{ fill: "currentColor", fontSize: 12 }}
            isAnimationActive
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              borderRadius: "12px",
              backdropFilter: "blur(10px)",
            }}
          />
          <Legend 
            wrapperStyle={{ paddingTop: "20px" }}
            formatter={(value, entry) => (
              <span style={{ color: entry.color }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { formatPrice } from "../utils/formatters";
import { format } from "date-fns";

interface CryptoChartProps {
  data: [number, number][];
  isPositive: boolean;
}

export const CryptoChart = ({ data, isPositive }: CryptoChartProps) => {
  const chartData = data.map(([timestamp, price]) => ({
    timestamp,
    price,
    date: format(new Date(timestamp), "MMM dd"),
  }));

  return (
    <div className="glass rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-6">Price Chart</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={isPositive ? "#10b981" : "#ef4444"}
                stopOpacity={0.3}
              />
              <stop
                offset="95%"
                stopColor={isPositive ? "#10b981" : "#ef4444"}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            stroke="#6b7280"
            style={{ fontSize: "12px" }}
            tickLine={false}
          />
          <YAxis
            stroke="#6b7280"
            style={{ fontSize: "12px" }}
            tickLine={false}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "#9ca3af" }}
            formatter={(value: number) => [formatPrice(value), "Price"]}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke={isPositive ? "#10b981" : "#ef4444"}
            strokeWidth={2}
            fill="url(#colorPrice)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

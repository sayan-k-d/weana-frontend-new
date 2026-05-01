"use client";

import { AdminCard, SectionHeader } from "./Primitives";
import { ADMIN_COLORS, ADMIN_FONT } from "../../constants/tokens";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { TeamActivityPoint } from "../../constants/dashboard";
import { TEAM_ACTIVITY_DATA } from "../../constants/dashboard";

interface TeamActivityChartProps {
  data?: TeamActivityPoint[];
  onViewAll?: () => void;
  /**
   * When true the card uses flex:1 so it grows to fill
   * the remaining height of its flex-column parent.
   * This is what makes it bottom-align with the Accessories table.
   */
  flex?: boolean;
}

export function TeamActivityChart({
  data = TEAM_ACTIVITY_DATA,
  onViewAll,
  flex: shouldFlex,
}: TeamActivityChartProps) {
  return (
    <AdminCard
      sx={{
        p: 2.5,
        display: "flex",
        flexDirection: "column",
        // flex:1 stretches the card to consume all remaining height in the
        // right flex column, making it bottom-align with the Accessories table
        ...(shouldFlex ? { flex: 1 } : {}),
      }}
    >
      <SectionHeader title="Team Activity" onViewAll={onViewAll} />

      {/*
        ResponsiveContainer needs a parent with a defined height.
        flex:1 here fills whatever height the card has — the chart scales inside it.
      */}
      <ResponsiveContainer width="100%" height="100%" minHeight={160}>
        <LineChart
          data={data}
          margin={{ top: 8, right: 8, left: -28, bottom: 0 }}
        >
          <CartesianGrid
            vertical={false}
            stroke={ADMIN_COLORS.chartGrid}
            strokeDasharray="4 4"
          />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: ADMIN_FONT.sizes.xs,
              fill: ADMIN_COLORS.chartText,
            }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: ADMIN_FONT.sizes.xs,
              fill: ADMIN_COLORS.chartText,
            }}
            ticks={[0, 1000, 2000, 3000, 4000, 5000]}
          />
          <Tooltip
            cursor={{ stroke: ADMIN_COLORS.brand, strokeDasharray: "4 4" }}
            contentStyle={{
              borderRadius: 10,
              border: `1px solid ${ADMIN_COLORS.cardBorder}`,
              fontSize: ADMIN_FONT.sizes.sm,
              boxShadow: "0 4px 16px rgba(19,15,30,0.08)",
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={ADMIN_COLORS.brand}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5, fill: ADMIN_COLORS.brand }}
          />
        </LineChart>
      </ResponsiveContainer>
    </AdminCard>
  );
}

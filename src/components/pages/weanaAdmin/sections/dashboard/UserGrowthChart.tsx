"use client";

import { AdminCard, SectionHeader } from "./Primitives";
import {
  ADMIN_COLORS,
  ADMIN_FONT,
} from "@/components/pages/weanaAdmin/constants/tokens";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { UserGrowthBar } from "../../constants/dashboard";
import { USER_GROWTH_DATA } from "../../constants/dashboard";

interface UserGrowthChartProps {
  data?: UserGrowthBar[];
  onViewAll?: () => void;
}

export function UserGrowthChart({
  data = USER_GROWTH_DATA,
  onViewAll,
}: UserGrowthChartProps) {
  return (
    <AdminCard sx={{ p: 2.5 }}>
      <SectionHeader title="User Growth" onViewAll={onViewAll} />
      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 0, left: -28, bottom: 0 }}
          barCategoryGap="30%"
        >
          <CartesianGrid
            vertical={false}
            stroke={ADMIN_COLORS.chartGrid}
            strokeDasharray="4 4"
          />
          <XAxis
            dataKey="label"
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
            domain={[0, 100]}
            ticks={[0, 20, 40, 60, 80, 100]}
          />
          <Tooltip
            cursor={{ fill: "rgba(107,63,160,0.06)" }}
            contentStyle={{
              borderRadius: 10,
              border: `1px solid ${ADMIN_COLORS.cardBorder}`,
              fontSize: ADMIN_FONT.sizes.sm,
              boxShadow: "0 4px 16px rgba(19,15,30,0.08)",
            }}
          />
          <Bar
            dataKey="value"
            fill={ADMIN_COLORS.chartPrimary}
            radius={[4, 4, 0, 0]}
          >
            <LabelList
              dataKey="value"
              position="top"
              style={{
                fontSize: ADMIN_FONT.sizes.xs,
                fill: ADMIN_COLORS.textSecondary,
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </AdminCard>
  );
}

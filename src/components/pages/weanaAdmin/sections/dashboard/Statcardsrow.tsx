"use client";

import { Box, Typography } from "@mui/material";
import { AdminCard, ChangePill } from "./Primitives";
import {
  ADMIN_COLORS,
  ADMIN_FONT,
} from "@/components/pages/weanaAdmin/constants/tokens";
import type { StatCardData } from "../../constants/dashboard";
import { ADMIN_STAT_CARDS } from "../../constants/dashboard";

interface StatCardProps {
  data: StatCardData;
}

function StatCard({ data }: StatCardProps) {
  return (
    <AdminCard sx={{ p: 2, flex: 1, minWidth: 0 }}>
      <Typography
        sx={{
          fontSize: ADMIN_FONT.sizes.sm,
          color: ADMIN_COLORS.textSecondary,
          mb: 0.8,
          lineHeight: 1.3,
        }}
      >
        {data.label}
      </Typography>
      <Typography
        sx={{
          fontSize: ADMIN_FONT.sizes["4xl"],
          fontWeight: ADMIN_FONT.weights.bold,
          color: ADMIN_COLORS.textPrimary,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          mb: 0.3,
        }}
      >
        {data.value}
      </Typography>
      <ChangePill change={data.change} label={data.changeLabel} />
    </AdminCard>
  );
}

interface StatCardsRowProps {
  cards?: StatCardData[];
}

export function StatCardsRow({ cards = ADMIN_STAT_CARDS }: StatCardsRowProps) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1.5,
        flexWrap: "nowrap",
        overflowX: "auto",
        pb: 0.5,
        // Hide scrollbar
        "&::-webkit-scrollbar": { display: "none" },
        scrollbarWidth: "none",
      }}
    >
      {cards.map((card) => (
        <StatCard key={card.id} data={card} />
      ))}
    </Box>
  );
}

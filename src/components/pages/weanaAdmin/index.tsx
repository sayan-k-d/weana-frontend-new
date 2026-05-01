"use client";

import { Box, Typography } from "@mui/material";
import { StatCardsRow } from "./sections/dashboard/Statcardsrow";
import { UserGrowthChart } from "./sections/dashboard/UserGrowthChart";
import { AccessoriesTable } from "./sections/dashboard/AccessoriesTable";
import { RecentContactsList } from "./sections/dashboard/RecentContactsList";
import { TeamActivityChart } from "./sections/dashboard/TeamActivityChart";
import {
  ADMIN_COLORS,
  ADMIN_FONT,
  ADMIN_SPACING,
} from "@/components/pages/weanaAdmin/constants/tokens";

// ─── Page header ──────────────────────────────────────────────────────────────
function DashboardHeader() {
  return (
    <Box sx={{ mb: 2.5 }}>
      <Typography
        sx={{
          fontSize: ADMIN_FONT.sizes["2xl"],
          fontWeight: ADMIN_FONT.weights.bold,
          color: ADMIN_COLORS.brand,
          letterSpacing: "-0.02em",
        }}
      >
        Welcome to Weana Admin Dashboard
      </Typography>
    </Box>
  );
}

export default function AdminDashboardPage() {
  return (
    <Box
      sx={{
        p: `${ADMIN_SPACING.contentPadding}px`,
        fontFamily: ADMIN_FONT.family,
      }}
    >
      <DashboardHeader />

      {/* ── Stat cards ── */}
      <Box sx={{ mb: 2 }}>
        <StatCardsRow />
      </Box>

      {/*
        ── Two-column grid ──
        alignItems: "stretch" → both columns share the height of the taller one.
        The left column is naturally taller (UserGrowth + Accessories).
        The right column fills that same height by being a flex column:
          - RecentContacts gets a fixed maxHeight + scroll
          - TeamActivity uses flex:1 to consume all remaining space
        → bottom edges of Accessories and TeamActivity align perfectly.
      */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 320px",
          gap: 2,
          alignItems: "stretch",
        }}
      >
        {/* LEFT — drives the overall row height */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <UserGrowthChart onViewAll={() => console.log("view growth")} />
          <AccessoriesTable onViewAll={() => console.log("view accessories")} />
        </Box>

        {/* RIGHT — same height as left, distributes internally */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            height: "100%",
          }}
        >
          {/* Fixed height → scrollable when contacts overflow */}
          <RecentContactsList
            maxHeight={280}
            onViewAll={() => console.log("view contacts")}
          />
          {/* Fills remaining height → bottom-aligns with Accessories */}
          <TeamActivityChart
            flex
            onViewAll={() => console.log("view activity")}
          />
        </Box>
      </Box>
    </Box>
  );
}

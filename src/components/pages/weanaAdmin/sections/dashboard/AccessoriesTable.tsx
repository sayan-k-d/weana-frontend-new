"use client";

import { Box, IconButton, Typography } from "@mui/material";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { AdminCard, SectionHeader, StatusBadge } from "./Primitives";
import {
  ADMIN_COLORS,
  ADMIN_FONT,
  ADMIN_RADII,
} from "@/components/pages/weanaAdmin/constants/tokens";
import type { AccessoryRow } from "../../constants/dashboard";
import { ACCESSORIES_DATA } from "../../constants/dashboard";

// ── Column header row ─────────────────────────────────────────────────────────
function TableHeader() {
  const col = (label: string, flex?: number | string, extra?: object) => (
    <Typography
      sx={{
        fontSize: ADMIN_FONT.sizes.sm,
        fontWeight: ADMIN_FONT.weights.medium,
        color: ADMIN_COLORS.textMuted,
        flex: flex ?? 1,
        ...extra,
      }}
    >
      {label}
    </Typography>
  );

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        px: 2.5,
        py: 1.2,
        gap: 2,
        borderBottom: `1px solid ${ADMIN_COLORS.cardBorder}`,
      }}
    >
      {/* Logo col spacer */}
      <Box sx={{ width: 52, flexShrink: 0 }} />
      {col("Name", 2)}
      {col("Status")}
      {col("Link")}
      {col("Type")}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.3, flex: 1 }}>
        <Typography
          sx={{
            fontSize: ADMIN_FONT.sizes.sm,
            fontWeight: ADMIN_FONT.weights.medium,
            color: ADMIN_COLORS.textMuted,
          }}
        >
          Activated
        </Typography>
        <KeyboardArrowDownRoundedIcon
          sx={{ fontSize: 14, color: ADMIN_COLORS.textMuted }}
        />
      </Box>
      {/* Actions spacer */}
      <Box sx={{ width: 32, flexShrink: 0 }} />
    </Box>
  );
}

// ── Single data row ───────────────────────────────────────────────────────────
function AccessoryTableRow({ row }: { row: AccessoryRow }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        px: 2.5,
        py: 1.8,
        gap: 2,
        borderBottom: `1px solid ${ADMIN_COLORS.cardBorder}`,
        "&:last-child": { borderBottom: "none" },
        "&:hover": { bgcolor: ADMIN_COLORS.pageBg },
        transition: "background 0.12s",
      }}
    >
      {/* Logo badge */}
      <Box
        sx={{
          width: 52,
          height: 40,
          borderRadius: ADMIN_RADII.sm,
          bgcolor: row.logoBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Typography
          sx={{
            fontSize: ADMIN_FONT.sizes.xs,
            fontWeight: ADMIN_FONT.weights.bold,
            color: "#FFFFFF",
            letterSpacing: "0.03em",
          }}
        >
          {row.logoLabel}
        </Typography>
      </Box>

      {/* Name */}
      <Typography
        sx={{
          flex: 2,
          fontSize: ADMIN_FONT.sizes.md,
          fontWeight: ADMIN_FONT.weights.medium,
          color: ADMIN_COLORS.textPrimary,
        }}
      >
        {row.name}
      </Typography>

      {/* Status */}
      <Box sx={{ flex: 1 }}>
        <StatusBadge status={row.status} />
      </Box>

      {/* Link — empty */}
      <Box sx={{ flex: 1 }} />

      {/* Type — empty */}
      <Box sx={{ flex: 1 }} />

      {/* Activated date */}
      <Typography
        sx={{
          flex: 1,
          fontSize: ADMIN_FONT.sizes.sm,
          color: ADMIN_COLORS.textSecondary,
        }}
      >
        {row.activatedDate}
      </Typography>

      {/* Kebab */}
      <IconButton
        size="small"
        sx={{ color: ADMIN_COLORS.textMuted, flexShrink: 0, width: 32 }}
      >
        <MoreVertRoundedIcon sx={{ fontSize: 18 }} />
      </IconButton>
    </Box>
  );
}

// ── Exported component ────────────────────────────────────────────────────────
interface AccessoriesTableProps {
  data?: AccessoryRow[];
  onViewAll?: () => void;
}

export function AccessoriesTable({
  data = ACCESSORIES_DATA,
  onViewAll,
}: AccessoriesTableProps) {
  return (
    <AdminCard sx={{ overflow: "hidden" }}>
      <Box sx={{ px: 2.5, pt: 2.5 }}>
        <SectionHeader
          title="Accessories"
          onViewAll={onViewAll}
          sx={{ mb: 1.5 }}
        />
      </Box>
      <TableHeader />
      {data.map((row) => (
        <AccessoryTableRow key={row.id} row={row} />
      ))}
    </AdminCard>
  );
}

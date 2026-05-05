"use client";

import { Box, Typography, type SxProps, type Theme } from "@mui/material";
import { ADMIN_COLORS, ADMIN_RADII, ADMIN_SHADOWS, ADMIN_FONT } from "@/components/pages/weanaAdmin/constants/tokens"

// ─── AdminCard ────────────────────────────────────────────────────────────────
// Standard white card used everywhere. Extra sx props for overrides.
interface AdminCardProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  onClick?: () => void;
}

export function AdminCard({ children, sx, onClick }: AdminCardProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        bgcolor: ADMIN_COLORS.cardBg,
        border: `1px solid ${ADMIN_COLORS.cardBorder}`,
        borderRadius: ADMIN_RADII.lg,
        boxShadow: ADMIN_SHADOWS.card,
        overflow: "hidden",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

// ─── SectionHeader ────────────────────────────────────────────────────────────
// Consistent "Title  View all >" row used in User Growth, Accessories, etc.
interface SectionHeaderProps {
  title: string;
  onViewAll?: () => void;
  sx?: SxProps<Theme>;
}

export function SectionHeader({ title, onViewAll, sx }: SectionHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 2,
        ...sx,
      }}
    >
      <Typography
        sx={{
          fontSize: ADMIN_FONT.sizes.xl,
          fontWeight: ADMIN_FONT.weights.bold,
          color: ADMIN_COLORS.textPrimary,
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </Typography>
      {onViewAll && (
        <Box
          onClick={onViewAll}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.3,
            cursor: "pointer",
            color: ADMIN_COLORS.textMuted,
            fontSize: ADMIN_FONT.sizes.sm,
            fontWeight: ADMIN_FONT.weights.medium,
            "&:hover": { color: ADMIN_COLORS.brand },
            transition: "color 0.13s",
          }}
        >
          View all
          <Box component="span" sx={{ fontSize: 14, lineHeight: 1 }}>
            ›
          </Box>
        </Box>
      )}
    </Box>
  );
}

// ─── StatusBadge ─────────────────────────────────────────────────────────────
// Pill badge for Activated / Pending / Deactivated
type StatusVariant = "Activated" | "Pending" | "Deactivated";

const STATUS_STYLES: Record<
  StatusVariant,
  { bg: string; text: string; border: string }
> = {
  Activated: {
    bg: ADMIN_COLORS.successBg,
    text: ADMIN_COLORS.successText,
    border: ADMIN_COLORS.successBorder,
  },
  Pending: {
    bg: ADMIN_COLORS.brandLight,
    text: ADMIN_COLORS.brand,
    border: ADMIN_COLORS.brandBorder,
  },
  Deactivated: {
    bg: ADMIN_COLORS.dangerBg,
    text: ADMIN_COLORS.dangerText,
    border: ADMIN_COLORS.dangerBorder,
  },
};

interface StatusBadgeProps {
  status: StatusVariant;
  sx?: SxProps<Theme>;
}

export function StatusBadge({ status, sx }: StatusBadgeProps) {
  const styles = STATUS_STYLES[status];
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        px: 1.2,
        py: 0.35,
        borderRadius: ADMIN_RADII.full,
        bgcolor: styles.bg,
        border: `1px solid ${styles.border}`,
        fontSize: ADMIN_FONT.sizes.sm,
        fontWeight: ADMIN_FONT.weights.semibold,
        color: styles.text,
        whiteSpace: "nowrap",
        ...sx,
      }}
    >
      {status}
    </Box>
  );
}

// ─── AdminAvatar ──────────────────────────────────────────────────────────────
// Consistent circular avatar with initials fallback
interface AdminAvatarProps {
  src?: string | null;
  initials?: string;
  color?: string;
  size?: number;
  sx?: SxProps<Theme>;
}

export function AdminAvatar({
  src,
  initials = "?",
  color = ADMIN_COLORS.brand,
  size = 36,
  sx,
}: AdminAvatarProps) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: "50%",
        bgcolor: color,
        flexShrink: 0,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...sx,
      }}
    >
      {src ? (
        <Box
          component="img"
          src={src}
          alt={initials}
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <Typography
          sx={{
            fontSize: size * 0.36,
            fontWeight: ADMIN_FONT.weights.bold,
            color: "#FFFFFF",
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          {initials}
        </Typography>
      )}
    </Box>
  );
}

// ─── ChangePill ───────────────────────────────────────────────────────────────
// Green up / red down indicator on stat cards
interface ChangePillProps {
  change: number;
  label: string;
}

export function ChangePill({ change, label }: ChangePillProps) {
  const isUp = change >= 0;
  const bg = isUp ? ADMIN_COLORS.successBg : ADMIN_COLORS.dangerBg;
  const text = isUp ? ADMIN_COLORS.successText : ADMIN_COLORS.dangerText;
  const arrow = isUp ? "↑" : "↓";
  const displayVal =
    Math.abs(change) >= 10 || Number.isInteger(change)
      ? `${arrow}${Math.abs(change)}`
      : `${arrow}${Math.abs(change)}%`;

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mt: 0.5 }}>
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          px: 0.8,
          py: 0.2,
          borderRadius: ADMIN_RADII.full,
          bgcolor: bg,
          color: text,
          fontSize: ADMIN_FONT.sizes.xs,
          fontWeight: ADMIN_FONT.weights.bold,
        }}
      >
        {displayVal}
      </Box>
      <Typography
        sx={{
          fontSize: ADMIN_FONT.sizes.xs,
          color: ADMIN_COLORS.textMuted,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

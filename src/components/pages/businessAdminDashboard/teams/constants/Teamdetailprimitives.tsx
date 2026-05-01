"use client";

/**
 * Shared primitive components for TeamDetail panels.
 *
 * Each component has sensible default styles baked in.
 * Every component accepts an optional `sx` prop for surgical overrides,
 * so callers never need to fight the defaults.
 */

import {
  Box,
  Typography,
  Button,
  type SxProps,
  type Theme,
} from "@mui/material";

// ─── Design tokens (local — mirrors the rest of the TeamDetail palette) ────────
export const TD_COLORS = {
  brand: "#6B3FA0",
  brandLight: "#EDE9F8",
  brandBorder: "#D8D2F0",
  pageBg: "#F3F2F6",
  cardBg: "#FFFFFF",
  cardBorder: "#EAE8F0",
  textPrimary: "#1E1A28",
  textSecondary: "#5C5874",
  textMuted: "#9896A6",
  danger: "#E05858",
  successBg: "#E6F9EF",
  successText: "#1A8A3A",
  successBorder: "#9FE1CB",
} as const;

export const TD_RADII = {
  xs: "6px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  full: "999px",
} as const;

// ─── PanelTitle ───────────────────────────────────────────────────────────────
// Section heading used at the top of every panel (General, Restrictions, etc.)
interface PanelTitleProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}
export function PanelTitle({ children, sx }: PanelTitleProps) {
  return (
    <Typography
      sx={{
        fontSize: 16,
        fontWeight: 700,
        color: TD_COLORS.textPrimary,
        letterSpacing: "-0.01em",
        mb: 0.5,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
}

// ─── PanelSubtitle ────────────────────────────────────────────────────────────
// Small grey description line beneath a PanelTitle
interface PanelSubtitleProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}
export function PanelSubtitle({ children, sx }: PanelSubtitleProps) {
  return (
    <Typography
      sx={{
        fontSize: 12.5,
        color: TD_COLORS.textMuted,
        lineHeight: 1.6,
        mb: 2.5,
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
}

// ─── SurfaceCard ─────────────────────────────────────────────────────────────
// White rounded card with border — the main content container used in most panels
interface SurfaceCardProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  onClick?: () => void;
}
export function SurfaceCard({ children, sx, onClick }: SurfaceCardProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        bgcolor: TD_COLORS.cardBg,
        border: `1px solid ${TD_COLORS.cardBorder}`,
        borderRadius: TD_RADII.lg,
        overflow: "hidden",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

// ─── RowDivider ───────────────────────────────────────────────────────────────
// Thin horizontal separator used between rows inside a SurfaceCard
interface RowDividerProps {
  sx?: SxProps<Theme>;
}
export function RowDivider({ sx }: RowDividerProps) {
  return (
    <Box
      sx={{
        height: "1px",
        bgcolor: TD_COLORS.cardBorder,
        mx: 0,
        ...sx,
      }}
    />
  );
}

// ─── LogoCircle ───────────────────────────────────────────────────────────────
// Coloured circle with two-line "LO / GO" text — used in template rows
interface LogoCircleProps {
  bg: string;
  initials?: string;
  size?: number;
  sx?: SxProps<Theme>;
}
export function LogoCircle({
  bg,
  initials = "LO\nGO",
  size = 48,
  sx,
}: LogoCircleProps) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: "50%",
        bgcolor: bg,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...sx,
      }}
    >
      <Typography
        sx={{
          fontSize: size * 0.22,
          fontWeight: 800,
          color: "#fff",
          lineHeight: 1.2,
          textAlign: "center",
          whiteSpace: "pre-line",
          letterSpacing: "0.01em",
        }}
      >
        {initials}
      </Typography>
    </Box>
  );
}

// ─── PillButton ───────────────────────────────────────────────────────────────
// Rounded pill button — default is outlined/ghost style
// Variants: "ghost" | "primary" | "danger"
type PillButtonVariant = "ghost" | "primary" | "danger";

interface PillButtonProps {
  children: React.ReactNode;
  variant?: PillButtonVariant;
  disabled?: boolean;
  onClick?: () => void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  sx?: SxProps<Theme>;
}

const PILL_VARIANT_STYLES: Record<PillButtonVariant, SxProps<Theme>> = {
  ghost: {
    color: TD_COLORS.textSecondary,
    border: `1px solid ${TD_COLORS.cardBorder}`,
    bgcolor: TD_COLORS.pageBg,
    "&:hover": {
      borderColor: TD_COLORS.brandBorder,
      bgcolor: TD_COLORS.brandLight,
    },
    "&.Mui-disabled": {
      bgcolor: TD_COLORS.pageBg,
      color: TD_COLORS.textMuted,
      border: `1px solid ${TD_COLORS.cardBorder}`,
    },
  },
  primary: {
    color: "#fff",
    bgcolor: TD_COLORS.brand,
    border: `1px solid ${TD_COLORS.brand}`,
    "&:hover": { bgcolor: "#5A3490" },
    "&.Mui-disabled": {
      bgcolor: TD_COLORS.cardBorder,
      color: TD_COLORS.textMuted,
      border: "none",
    },
  },
  danger: {
    color: TD_COLORS.danger,
    border: `1px solid #F5A9A9`,
    bgcolor: "#FEF2F2",
    "&:hover": { bgcolor: "#FDE8E8", borderColor: TD_COLORS.danger },
  },
};

export function PillButton({
  children,
  variant = "ghost",
  disabled,
  onClick,
  startIcon,
  endIcon,
  sx,
}: PillButtonProps) {
  return (
    <Button
      disableElevation
      disabled={disabled}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{
        fontSize: 13,
        fontWeight: 600,
        textTransform: "none",
        borderRadius: TD_RADII.full,
        px: 2.2,
        py: 0.85,
        minWidth: 0,
        lineHeight: 1,
        ...PILL_VARIANT_STYLES[variant],
        ...sx,
      }}
    >
      {children}
    </Button>
  );
}

// ─── PanelFooter ─────────────────────────────────────────────────────────────
// Bottom row with Cancel + primary action button, right-aligned
interface PanelFooterProps {
  onCancel: () => void;
  onSubmit: () => void;
  submitLabel?: string;
  submitDisabled?: boolean;
  leftSlot?: React.ReactNode; // e.g. "Add Templates +" on the left
  sx?: SxProps<Theme>;
}
export function PanelFooter({
  onCancel,
  onSubmit,
  submitLabel = "Update",
  submitDisabled,
  leftSlot,
  sx,
}: PanelFooterProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mt: 2.5,
        gap: 1.5,
        flexWrap: "wrap",
        ...sx,
      }}
    >
      <Box>{leftSlot}</Box>
      <Box sx={{ display: "flex", gap: 1.2 }}>
        <PillButton variant="ghost" onClick={onCancel}>
          Cancel
        </PillButton>
        <PillButton
          variant={submitDisabled ? "ghost" : "primary"}
          disabled={submitDisabled}
          onClick={onSubmit}
        >
          {submitLabel}
        </PillButton>
      </Box>
    </Box>
  );
}

// ─── IntegrationTile ─────────────────────────────────────────────────────────
// Rounded card tile used in the integrations grid
interface IntegrationTileProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  onClick?: () => void;
}
export function IntegrationTile({
  children,
  sx,
  onClick,
}: IntegrationTileProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        px: 2,
        py: 1.8,
        border: `1px solid ${TD_COLORS.cardBorder}`,
        borderRadius: TD_RADII.md,
        bgcolor: TD_COLORS.cardBg,
        cursor: onClick ? "pointer" : "default",
        transition: "border-color 0.13s, background 0.13s",
        "&:hover": onClick
          ? {
              borderColor: TD_COLORS.brandBorder,
              bgcolor: TD_COLORS.brandLight,
            }
          : {},
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

// ─── IntegrationIconBox ───────────────────────────────────────────────────────
// Grey rounded square used as the icon placeholder in each integration tile
interface IntegrationIconBoxProps {
  children?: React.ReactNode;
  size?: number;
  sx?: SxProps<Theme>;
}
export function IntegrationIconBox({
  children,
  size = 38,
  sx,
}: IntegrationIconBoxProps) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        flexShrink: 0,
        borderRadius: TD_RADII.sm,
        border: `1px solid ${TD_COLORS.cardBorder}`,
        bgcolor: "#F7F6FA",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

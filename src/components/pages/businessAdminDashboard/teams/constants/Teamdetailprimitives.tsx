"use client";

/**
 * Shared primitive components for TeamDetail panels.
 *
 * MUI v9 compatible — variant logic uses styled() API, not sx spreading.
 * Every component accepts an optional `sx` prop for caller overrides.
 */

import {
  Box,
  Typography,
  Button,
  styled,
  type SxProps,
  type Theme,
} from "@mui/material";

// ─── Design tokens ─────────────────────────────────────────────────────────────
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

// ─── PanelTitle ────────────────────────────────────────────────────────────────
interface PanelTitleProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}
export function PanelTitle({ children, sx }: PanelTitleProps) {
  return (
    <Typography
      sx={
        {
          fontSize: 16,
          fontWeight: 700,
          color: TD_COLORS.textPrimary,
          letterSpacing: "-0.01em",
          mb: 0.5,
          ...sx,
        } as SxProps<Theme>
      }
    >
      {children}
    </Typography>
  );
}

// ─── PanelSubtitle ─────────────────────────────────────────────────────────────
interface PanelSubtitleProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}
export function PanelSubtitle({ children, sx }: PanelSubtitleProps) {
  return (
    <Typography
      sx={
        {
          fontSize: 12.5,
          color: TD_COLORS.textMuted,
          lineHeight: 1.6,
          mb: 2.5,
          ...sx,
        } as SxProps<Theme>
      }
    >
      {children}
    </Typography>
  );
}

// ─── SurfaceCard ───────────────────────────────────────────────────────────────
interface SurfaceCardProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  onClick?: () => void;
}
export function SurfaceCard({ children, sx, onClick }: SurfaceCardProps) {
  return (
    <Box
      onClick={onClick}
      sx={
        {
          bgcolor: TD_COLORS.cardBg,
          border: `1px solid ${TD_COLORS.cardBorder}`,
          borderRadius: TD_RADII.lg,
          overflow: "hidden",
          ...sx,
        } as SxProps<Theme>
      }
    >
      {children}
    </Box>
  );
}

// ─── RowDivider ────────────────────────────────────────────────────────────────
interface RowDividerProps {
  sx?: SxProps<Theme>;
}
export function RowDivider({ sx }: RowDividerProps) {
  return (
    <Box
      sx={
        {
          height: "1px",
          bgcolor: TD_COLORS.cardBorder,
          ...sx,
        } as SxProps<Theme>
      }
    />
  );
}

// ─── LogoCircle ────────────────────────────────────────────────────────────────
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
      sx={
        {
          width: size,
          height: size,
          borderRadius: "50%",
          bgcolor: bg,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...sx,
        } as SxProps<Theme>
      }
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

// ─── PillButton ────────────────────────────────────────────────────────────────
// MUI v9: variant-specific styles live in styled() — NOT in sx spreads.
// The sx prop is reserved for caller-side one-off overrides only.

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

// Base styled button — shared across all variants
const StyledPillBase = styled(Button)({
  fontSize: 13,
  fontWeight: 600,
  textTransform: "none",
  borderRadius: TD_RADII.full,
  paddingLeft: "17.6px", // px: 2.2 in MUI spacing (8px * 2.2 = 17.6)
  paddingRight: "17.6px",
  paddingTop: "6.8px", // py: 0.85 (8px * 0.85 = 6.8)
  paddingBottom: "6.8px",
  minWidth: 0,
  lineHeight: 1,
  boxShadow: "none",
  "&:active": { boxShadow: "none" },
});

// Per-variant styled components
const GhostPillButton = styled(StyledPillBase)({
  color: TD_COLORS.textSecondary,
  border: `1px solid ${TD_COLORS.cardBorder}`,
  backgroundColor: TD_COLORS.pageBg,
  "&:hover": {
    borderColor: TD_COLORS.brandBorder,
    backgroundColor: TD_COLORS.brandLight,
    boxShadow: "none",
  },
  "&.Mui-disabled": {
    backgroundColor: TD_COLORS.pageBg,
    color: TD_COLORS.textMuted,
    border: `1px solid ${TD_COLORS.cardBorder}`,
  },
});

const PrimaryPillButton = styled(StyledPillBase)({
  color: "#fff",
  backgroundColor: TD_COLORS.brand,
  border: `1px solid ${TD_COLORS.brand}`,
  "&:hover": {
    backgroundColor: "#5A3490",
    boxShadow: "none",
  },
  "&.Mui-disabled": {
    backgroundColor: TD_COLORS.cardBorder,
    color: TD_COLORS.textMuted,
    border: "none",
  },
});

const DangerPillButton = styled(StyledPillBase)({
  color: TD_COLORS.danger,
  border: "1px solid #F5A9A9",
  backgroundColor: "#FEF2F2",
  "&:hover": {
    backgroundColor: "#FDE8E8",
    borderColor: TD_COLORS.danger,
    boxShadow: "none",
  },
});

const VARIANT_COMPONENT: Record<PillButtonVariant, typeof StyledPillBase> = {
  ghost: GhostPillButton,
  primary: PrimaryPillButton,
  danger: DangerPillButton,
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
  const Component = VARIANT_COMPONENT[variant];
  return (
    <Component
      disableElevation
      disabled={disabled}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={sx}
    >
      {children}
    </Component>
  );
}

// ─── PanelFooter ───────────────────────────────────────────────────────────────
interface PanelFooterProps {
  onCancel: () => void;
  onSubmit: () => void;
  submitLabel?: string;
  submitDisabled?: boolean;
  leftSlot?: React.ReactNode;
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
      sx={
        {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 2.5,
          gap: 1.5,
          flexWrap: "wrap",
          ...sx,
        } as SxProps<Theme>
      }
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

// ─── IntegrationTile ──────────────────────────────────────────────────────────
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
      sx={
        {
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
          ...(onClick && {
            "&:hover": {
              borderColor: TD_COLORS.brandBorder,
              bgcolor: TD_COLORS.brandLight,
            },
          }),
          ...sx,
        } as SxProps<Theme>
      }
    >
      {children}
    </Box>
  );
}

// ─── IntegrationIconBox ───────────────────────────────────────────────────────
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
      sx={
        {
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
        } as SxProps<Theme>
      }
    >
      {children}
    </Box>
  );
}

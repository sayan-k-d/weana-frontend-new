// ─── Admin Dashboard Design Tokens ───────────────────────────────────────────
// All custom style values live here. Import from this file only — never
// hardcode colours or spacing values in components.

export const ADMIN_COLORS = {
  // Brand
  brand: "#6B3FA0",
  brandDark: "#5A3490",
  brandLight: "#EDE9F8",
  brandBorder: "#D8D2F0",

  // Sidebar
  sidebarBg: "#FFFFFF",
  sidebarActiveBg: "#F3F0FB",
  sidebarActiveText: "#6B3FA0",
  sidebarInactiveText: "#5C5874",
  sidebarHoverBg: "#F7F6FA",

  // Page
  pageBg: "#F3F2F6",

  // Surface
  cardBg: "#FFFFFF",
  cardBorder: "#EAE8F0",

  // Text
  textPrimary: "#1E1A28",
  textSecondary: "#5C5874",
  textMuted: "#9896A6",
  textLink: "#6B3FA0",

  // Status
  successBg: "#E6F9EF",
  successText: "#1A8A3A",
  successBorder: "#9FE1CB",

  warningBg: "#FFF8E7",
  warningText: "#A0660A",
  warningBorder: "#FAC775",

  dangerBg: "#FDECEA",
  dangerText: "#C0392B",
  dangerBorder: "#F5A9A9",

  neutralBg: "#F3F2F6",
  neutralText: "#5C5874",
  neutralBorder: "#D8D4EC",

  // Chart
  chartPrimary: "#7B68EE",
  chartGrid: "#EAE8F0",
  chartText: "#9896A6",
} as const;

export const ADMIN_RADII = {
  xs: "6px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "20px",
  full: "999px",
} as const;

export const ADMIN_SHADOWS = {
  card: "0 1px 4px rgba(19,15,30,0.06)",
  elevated: "0 4px 16px rgba(19,15,30,0.08)",
  dropdown: "0 8px 24px rgba(19,15,30,0.10)",
} as const;

export const ADMIN_FONT = {
  family: 'Inter, "Segoe UI", sans-serif',
  sizes: {
    xs: 11,
    sm: 12,
    base: 13,
    md: 14,
    lg: 15,
    xl: 16,
    "2xl": 18,
    "3xl": 22,
    "4xl": 28,
  },
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
} as const;

export const ADMIN_SPACING = {
  sidebarWidth: 200,
  topbarHeight: 64,
  contentPadding: 24,
  cardPadding: 20,
  cardGap: 16,
} as const;

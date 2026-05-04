// ─── Design tokens ────────────────────────────────────────────────────────────
export const T_COLORS = {
  brand: "#512B7A",
  brandBtn: "#6B3FA0",
  brandBtnHover: "#5A3490",
  brandLight: "#EDE9F8",
  brandBorder: "#DBD8E6",
  pageBg: "#F3F2F6",
  cardBg: "#FFFFFF",
  cardBorder: "#E8E6F0",
  rowBorder: "#EDE8F5",
  textPrimary: "#1E1A28",
  textSecondary: "#5C5874",
  textMuted: "#ADAAB7",
  avatarBg: "#F0EEF8",
} as const;

export const T_RADII = {
  xs: "6px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "20px",
  full: "999px",
} as const;

export const T_SHADOWS = {
  card: "0 1px 6px rgba(19,15,30,0.06)",
} as const;

// ─── Reused sx objects (import and spread where needed) ───────────────────────

export const PAGE_TITLE_SX = {
  fontSize: 20,
  fontWeight: 700,
  color: T_COLORS.brand,
  letterSpacing: "-0.02em",
} as const;

export const HEADER_ROW_SX = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  mb: 2.5,
} as const;

export const SEARCH_INPUT_SX = {
  borderRadius: T_RADII.full,
  fontSize: 13.5,
  bgcolor: T_COLORS.cardBg,
  height: 44,
  "& .MuiOutlinedInput-notchedOutline": { borderColor: T_COLORS.cardBorder },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#C4C0D8" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: T_COLORS.brandBtn,
    borderWidth: 1.5,
  },
} as const;

export const TABLE_CARD_SX = {
  bgcolor: T_COLORS.cardBg,
  border: `1px solid ${T_COLORS.cardBorder}`,
  borderRadius: T_RADII.lg,
  boxShadow: T_SHADOWS.card,
  overflow: "hidden",
} as const;

export const TABLE_HEADER_SX = {
  display: "grid",
  gridTemplateColumns: "1fr 180px 180px 40px",
  alignItems: "center",
  px: 3,
  py: 1.4,
  borderBottom: `1px solid ${T_COLORS.rowBorder}`,
} as const;

export const TABLE_ROW_SX = {
  display: "grid",
  gridTemplateColumns: "1fr 180px 180px 40px",
  alignItems: "center",
  px: 3,
  py: 1.6,
  borderBottom: `1px solid ${T_COLORS.rowBorder}`,
  transition: "background 0.13s",
  "&:last-child": { borderBottom: "none" },
  "&:hover": { bgcolor: "#FAF9FD" },
} as const;

export const COLUMN_LABEL_SX = {
  fontSize: 13,
  fontWeight: 500,
  color: T_COLORS.textMuted,
} as const;

export const MEMBER_NAME_SX = {
  fontSize: 14,
  fontWeight: 600,
  color: T_COLORS.textPrimary,
} as const;

export const EDIT_BTN_SX = {
  fontSize: 13,
  fontWeight: 600,
  textTransform: "none",
  borderRadius: T_RADII.full,
  px: 2.2,
  py: 0.7,
  color: T_COLORS.textPrimary,
  borderColor: T_COLORS.cardBorder,
  bgcolor: T_COLORS.cardBg,
  border: "1.5px solid",
  "&:hover": { borderColor: "#C4C0D8", bgcolor: T_COLORS.pageBg },
} as const;

export const ASSIGN_BTN_FILLED_SX = {
  fontSize: 13,
  fontWeight: 600,
  textTransform: "none",
  borderRadius: T_RADII.full,
  px: 2.2,
  py: 0.7,
  bgcolor: T_COLORS.brandBtn,
  color: "#fff",
  border: "none",
  "&:hover": { bgcolor: T_COLORS.brandBtnHover },
} as const;

export const ASSIGN_BTN_OUTLINE_SX = {
  fontSize: 13,
  fontWeight: 600,
  textTransform: "none",
  borderRadius: T_RADII.full,
  px: 2.2,
  py: 0.7,
  color: T_COLORS.textPrimary,
  borderColor: T_COLORS.cardBorder,
  bgcolor: T_COLORS.cardBg,
  border: "1.5px solid",
  "&:hover": { borderColor: "#C4C0D8", bgcolor: T_COLORS.pageBg },
} as const;

export const ADD_TEMPLATES_BTN_SX = {
  fontSize: 13.5,
  fontWeight: 700,
  textTransform: "none",
  borderRadius: T_RADII.full,
  px: 2.8,
  py: 1,
  bgcolor: T_COLORS.brandBtn,
  color: "#fff",
  "&:hover": { bgcolor: T_COLORS.brandBtnHover },
} as const;

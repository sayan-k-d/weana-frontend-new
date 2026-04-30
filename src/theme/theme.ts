import { createTheme, ThemeOptions } from "@mui/material/styles";
import { Shadows } from "@mui/material/styles";

const palette: ThemeOptions["palette"] = {
  mode: "light",
  primary: {
    main: "#4F46E5", // indigo — adjust to match Figma
    light: "#818CF8",
    dark: "#3730A3",
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#0F9E73",
    light: "#34D399",
    dark: "#065F46",
    contrastText: "#FFFFFF",
  },
  background: {
    default: "#F9FAFB",
    paper: "#FFFFFF",
  },
  text: {
    primary: "#111827",
    secondary: "#6B7280",
    disabled: "#9CA3AF",
  },
  error: { main: "#EF4444" },
  warning: { main: "#F59E0B" },
  success: { main: "#10B981" },
  info: { main: "#3B82F6" },
  divider: "rgba(0,0,0,0.08)",
};

export const theme = createTheme({
  palette,
  typography: {
    fontFamily:
      'var(--font-codec-pro), "Inter", "Helvetica Neue", Arial, sans-serif',
    h1: { fontSize: "2.25rem", fontWeight: 700, lineHeight: 1.2 },
    h2: { fontSize: "1.875rem", fontWeight: 700, lineHeight: 1.3 },
    h3: { fontSize: "1.5rem", fontWeight: 600, lineHeight: 1.4 },
    h4: { fontSize: "1.25rem", fontWeight: 600, lineHeight: 1.4 },
    h5: { fontSize: "1.125rem", fontWeight: 600, lineHeight: 1.5 },
    h6: { fontSize: "1rem", fontWeight: 600, lineHeight: 1.5 },
    body1: { fontSize: "0.875rem", lineHeight: 1.6 },
    body2: { fontSize: "0.8125rem", lineHeight: 1.6 },
    caption: { fontSize: "0.75rem", color: "#6B7280" },
    button: { textTransform: "none", fontWeight: 500 },
  },
  shape: { borderRadius: 10 },
  shadows: [
    "none",
    "0 1px 2px rgba(0,0,0,0.05)",
    "0 1px 4px rgba(0,0,0,0.07)",
    "0 2px 8px rgba(0,0,0,0.08)",
    "0 4px 16px rgba(0,0,0,0.08)",
    "0 8px 24px rgba(0,0,0,0.10)",
    ...Array(19).fill("none"),
  ] as unknown as Shadows, // TypeScript quirk for shadows array
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, padding: "8px 20px", fontWeight: 500 },
        contained: {
          boxShadow: "none",
          "&:hover": { boxShadow: "0 2px 8px rgba(0,0,0,0.15)" },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
          border: "1px solid rgba(0,0,0,0.06)",
        },
      },
    },
    MuiTextField: {
      defaultProps: { size: "small", variant: "outlined" },
      styleOverrides: {
        root: { "& .MuiOutlinedInput-root": { borderRadius: 8 } },
      },
    },
    MuiChip: {
      styleOverrides: { root: { borderRadius: 6, fontWeight: 500 } },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-head": {
            fontWeight: 600,
            backgroundColor: "#F9FAFB",
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          },
        },
      },
    },
  },
});

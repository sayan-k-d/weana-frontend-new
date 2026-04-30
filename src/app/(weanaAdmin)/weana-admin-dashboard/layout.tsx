// app/admin/layout.tsx
// ─────────────────────────────────────────────────────────────────────────────
// The AdminSidebar lives here once. Every page under /admin/* gets it
// automatically — no need to import it in individual page components.
//
// Structure:
//   <Box display="flex" height="100vh" overflow="hidden">
//     <AdminSidebar />               ← sticky, never scrolls
//     <Box flex="1" overflowY="auto">   ← only this area scrolls
//       {children}                   ← page content swaps here
//     </Box>
//   </Box>
// ─────────────────────────────────────────────────────────────────────────────

import { Box } from "@mui/material";
import { AdminSidebar } from "@/components/layout/weanaAdmin/AdminSidebar";
import {
  ADMIN_COLORS,
  ADMIN_FONT,
} from "@/components/pages/weanaAdmin/constants/tokens";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        bgcolor: ADMIN_COLORS.pageBg,
        fontFamily: ADMIN_FONT.family,
      }}
    >
      {/* ── Sidebar — rendered once, stays fixed while content scrolls ── */}
      <AdminSidebar />

      {/* ── Main content area — only this scrolls ── */}
      <Box
        component="main"
        sx={{
          flex: 1,
          overflowY: "auto",
          minWidth: 0, // prevents flex children from overflowing
          // Hide scrollbar but keep scroll functionality
          "&::-webkit-scrollbar": { width: 6 },
          "&::-webkit-scrollbar-track": { bgcolor: "transparent" },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: ADMIN_COLORS.cardBorder,
            borderRadius: "3px",
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

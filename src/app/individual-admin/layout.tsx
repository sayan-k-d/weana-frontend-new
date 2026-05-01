import { Box } from "@mui/material";
import IndividualSidebar from "@/components/layout/individualAdmin/sidebar";

export default function IndividualAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", overflow: "hidden" }}>
      <IndividualSidebar />
      <Box sx={{ flex: 1, overflowY: "auto" }}>{children}</Box>
    </Box>
  );
}

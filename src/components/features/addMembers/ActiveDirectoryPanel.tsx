import { Box, Typography } from "@mui/material";
import { IntegrationCard } from "./IntegrationCard";
import { ActiveDirectoryIconLarge } from "@/components/pages/members/constants/addMember";

export function ActiveDirectoryPanel() {
  return (
    <Box sx={{ px: { xs: 3, md: 4 }, py: 3.5 }}>
      <Typography
        sx={{
          fontSize: 18,
          fontWeight: 700,
          color: "#1E1A28",
          letterSpacing: "-0.02em",
          mb: 2.5,
        }}
      >
        Sync with Active Directory
      </Typography>

      <IntegrationCard
        icon={<ActiveDirectoryIconLarge />}
        name="Active Directory"
        description="Full platform of marketing, sales, customer service, and CRM software."
        primaryLabel="Start Setup"
      />
    </Box>
  );
}

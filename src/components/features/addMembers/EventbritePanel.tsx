import { Box, Typography } from "@mui/material";
import { IntegrationCard } from "./IntegrationCard";
import { EventbriteIconLarge } from "@/components/pages/businessAdminDashboard/members/constants/addMember";

export function EventbritePanel() {
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
        Sync with Eventbrite
      </Typography>

      <IntegrationCard
        icon={<EventbriteIconLarge />}
        name="Eventbrite"
        description="Sync attendees from Eventbrite to Weana for QR code and badge management."
        primaryLabel="Sync Now"
      />
    </Box>
  );
}

import { Avatar, Button, Paper, Stack, Typography } from "@mui/material";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";

import { whiteCardStyles } from "@/lib/utils";

export default function CampaignsCard() {
  return (
    <Paper
      elevation={0}
      sx={{ ...whiteCardStyles(), p: 2, mb: 1.7, minHeight: 182 }}
    >
      <Typography
        sx={{
          fontSize: 16,
          color: "#1E1A28",
          fontWeight: 700,
          mb: 2.1,
          letterSpacing: "-0.01em",
        }}
      >
        Campaigns
      </Typography>

      <Stack
        sx={{
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            width: 29,
            height: 29,
            bgcolor: "#FFFFFF",
            color: "#6E3AAE",
            mb: 1.1,
            border: "1px solid #E8E2F5",
            boxShadow: "0 4px 10px rgba(111, 66, 180, 0.18)",
          }}
        >
          <PhotoCameraOutlinedIcon sx={{ fontSize: 15 }} />
        </Avatar>

        <Typography sx={{ fontSize: 12, color: "#A5A3B1", mb: 1.2 }}>
          Create a campaign for your upcoming event
        </Typography>

        <Button
          variant="outlined"
          sx={{
            borderRadius: "999px",
            px: 2,
            py: 0.45,
            fontSize: 13,
            color: "#2B2736",
          }}
        >
          Create Campaign +
        </Button>
      </Stack>
    </Paper>
  );
}

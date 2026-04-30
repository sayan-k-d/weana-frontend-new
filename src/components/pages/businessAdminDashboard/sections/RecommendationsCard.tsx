import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";

import { whiteCardStyles } from "@/lib/utils";

export default function RecommendationsCard() {
  return (
    <Paper elevation={0} sx={{ ...whiteCardStyles(), p: 2, flex: 1 }}>
      <Typography
        sx={{
          fontSize: 16,
          color: "#1E1A28",
          fontWeight: 700,
          mb: 1.4,
          letterSpacing: "-0.01em",
        }}
      >
        Recommendations
      </Typography>

      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
          }}
          spacing={1}
        >
          {/* Status badge */}
          <Box
            sx={{
              px: 0.7,
              py: 0.2,
              borderRadius: 0.8,
              bgcolor: "#6C3EB2",
              color: "#fff",
              fontSize: 8.2,
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            TO DO
          </Box>

          {/* Person icon */}
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              border: "1px solid #E6E1F0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#6C3EB2",
              bgcolor: "#FFFFFF",
            }}
          >
            <PersonOutlineRoundedIcon sx={{ fontSize: 14 }} />
          </Box>

          <Typography sx={{ fontSize: 13, color: "#2A2636" }}>
            Invite or assign another full team admin to help manage your team
          </Typography>
        </Stack>

        <Button
          variant="outlined"
          sx={{
            borderRadius: "999px",
            px: 1.8,
            fontSize: 12,
            color: "#2B2736",
          }}
        >
          Add Admin
        </Button>
      </Stack>
    </Paper>
  );
}

import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";

import { LEADS } from "@/lib/constants";
import { whiteCardStyles, getInitials } from "@/lib/utils";

export default function RecentLeadsCard() {
  return (
    <Paper
      elevation={0}
      sx={{ ...whiteCardStyles(), p: 2, mb: 1.7, minHeight: 382 }}
    >
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 0.7,
        }}
      >
        <Typography
          sx={{
            fontSize: 16,
            color: "#1E1A28",
            fontWeight: 700,
            letterSpacing: "-0.01em",
          }}
        >
          Recent Leads Captured
        </Typography>
        <Typography sx={{ fontSize: 12, color: "#8F8A9D", cursor: "pointer" }}>
          View all
        </Typography>
      </Stack>

      {LEADS.map((lead) => (
        <Box key={lead.id} sx={{ py: 0.63 }}>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Stack
              direction="row"
              spacing={0.9}
              sx={{
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{
                  width: 23,
                  height: 23,
                  background:
                    "linear-gradient(135deg, #F48B86 0%, #FFC6C1 100%)",
                  color: "#FFFFFF",
                  fontSize: 10,
                  fontWeight: 700,
                }}
              >
                {getInitials(lead.name)}
              </Avatar>
              <Box>
                <Typography
                  sx={{
                    fontSize: 12.5,
                    color: "#2A2636",
                    fontWeight: 600,
                    lineHeight: 1.2,
                  }}
                >
                  {lead.name}
                </Typography>
                <Typography
                  sx={{ fontSize: 10.5, color: "#A4A2B0", lineHeight: 1.2 }}
                >
                  Connect with null
                </Typography>
              </Box>
            </Stack>
            <Typography sx={{ fontSize: 10.5, color: "#A8A5B3" }}>
              {lead.date}
            </Typography>
          </Stack>
        </Box>
      ))}
    </Paper>
  );
}

import { Box, Divider, Paper, Stack, Typography } from "@mui/material";

import TinyMetric from "@/components/ui/metrics/TinyMetric";
import { TEAM_METRICS } from "@/lib/constants";
import { whiteCardStyles } from "@/lib/utils";

export default function TeamPerformanceCard() {
  return (
    <Paper
      elevation={0}
      sx={{ ...whiteCardStyles(), p: 2, mb: 1.7, minHeight: 186 }}
    >
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 1.6,
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: 16,
              color: "#1E1A28",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              lineHeight: 1.1,
            }}
          >
            Team Performance
          </Typography>
          <Typography sx={{ fontSize: 12, color: "#A0A0AD", lineHeight: 1.1 }}>
            Last 30 days
          </Typography>
        </Stack>
        <Typography sx={{ fontSize: 12, color: "#8F8A9D", cursor: "pointer" }}>
          View all insights
        </Typography>
      </Stack>

      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {TEAM_METRICS.map((metric, index) => (
          <Box
            key={metric.label}
            sx={{ display: "flex", alignItems: "stretch" }}
          >
            {index > 0 && <Divider flexItem orientation="vertical" />}
            <TinyMetric
              value={metric.value}
              label={metric.label}
              accent={metric.accent}
            />
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}

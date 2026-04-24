import { Box, Typography } from "@mui/material";

interface TinyMetricProps {
  value: string;
  label: string;
  accent?: boolean;
}

export default function TinyMetric({
  value,
  label,
  accent = false,
}: TinyMetricProps) {
  return (
    <Box
      sx={{
        textAlign: "left",
        px: 0.8,
        minHeight: 78,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: 24,
          lineHeight: 1,
          fontWeight: 600,
          color: accent ? "#EA655D" : "#18151F",
        }}
      >
        {value}
      </Typography>
      <Typography
        sx={{ mt: 0.6, fontSize: 11, color: "#A8A7B3", fontWeight: 500 }}
      >
        {label}
      </Typography>
    </Box>
  );
}

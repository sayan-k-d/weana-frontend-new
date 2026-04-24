import { Box, Paper, Stack, Typography } from "@mui/material";

interface GoalChoiceProps {
  icon: React.ReactNode;
  label: string;
  fullWidth?: boolean;
}

export default function GoalChoice({
  icon,
  label,
  fullWidth = false,
}: GoalChoiceProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid #DDDBE7",
        borderRadius: 1.5,
        height: 54,
        px: 1.8,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gridColumn: fullWidth ? "1 / -1" : "auto",
        bgcolor: "#FFFFFF",
        cursor: "pointer",
        transition: "border-color 0.15s",
        "&:hover": { borderColor: "#6C3EB2" },
      }}
    >
      <Stack direction="row" spacing={1.1} style={{ alignItems: "center" }}>
        <Box sx={{ color: "#4E2A84", display: "flex", alignItems: "center" }}>
          {icon}
        </Box>
        <Typography sx={{ fontSize: 11.5, color: "#4A3C66", fontWeight: 600 }}>
          {label}
        </Typography>
      </Stack>
      {/* Radio dot */}
      <Box
        sx={{
          width: 13,
          height: 13,
          border: "1px solid #D8D7DF",
          borderRadius: "50%",
          flexShrink: 0,
        }}
      />
    </Paper>
  );
}

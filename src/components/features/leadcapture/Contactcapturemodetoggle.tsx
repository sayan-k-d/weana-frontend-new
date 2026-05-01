"use client";

import { Box, Switch, Typography, Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface ContactCaptureModeToggleProps {
  enabled: boolean;
  onChange: (val: boolean) => void;
}

export function ContactCaptureModeToggle({
  enabled,
  onChange,
}: ContactCaptureModeToggleProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        py: 1.8,
        border: "1px solid #EAE8F0",
        borderRadius: "12px",
        bgcolor: "#FAFAFA",
        mb: 1.5,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
        <Typography sx={{ fontSize: 13.5, fontWeight: 500, color: "#3D3A4A" }}>
          Contact Capture Mode
        </Typography>
        <Tooltip
          title="When enabled, visitors must share their info before viewing your card."
          placement="top"
          arrow
        >
          <InfoOutlinedIcon
            sx={{ fontSize: 15, color: "#A09EB8", cursor: "help" }}
          />
        </Tooltip>
      </Box>

      <Switch
        checked={enabled}
        onChange={(e) => onChange(e.target.checked)}
        size="small"
        sx={{
          "& .MuiSwitch-switchBase.Mui-checked": {
            color: "#6B3FA0",
          },
          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
            bgcolor: "#6B3FA0",
          },
        }}
      />
    </Box>
  );
}

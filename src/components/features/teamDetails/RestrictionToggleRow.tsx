"use client";

import { Box, Switch, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

interface RestrictionToggleRowProps {
  label: string;
  checked: boolean;
  onChange: (val: boolean) => void;
  /** When true the row is slightly muted (part of a locked-all state) */
  disabled?: boolean;
}

export function RestrictionToggleRow({
  label,
  checked,
  onChange,
  disabled = false,
}: RestrictionToggleRowProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        py: 1.4,
        border: "1px solid #EAE8F0",
        borderRadius: "10px",
        bgcolor: disabled ? "#FAFAFA" : "#FFFFFF",
        transition: "background 0.13s",
      }}
    >
      <Typography
        sx={{
          fontSize: 13.5,
          fontWeight: 500,
          color: disabled ? "#B0AEC4" : "#3D3A4A",
        }}
      >
        {label}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <LockOutlinedIcon
          sx={{ fontSize: 16, color: disabled ? "#D8D4EC" : "#B0AEC4" }}
        />
        <Switch
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          size="small"
          sx={{
            "& .MuiSwitch-switchBase.Mui-checked": { color: "#6B3FA0" },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              bgcolor: "#6B3FA0",
            },
          }}
        />
      </Box>
    </Box>
  );
}

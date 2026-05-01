"use client";

import { Box, Switch, Typography, Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface SectionToggleProps {
  label: string;
  description?: string;
  tooltip?: string;
  enabled: boolean;
  onChange: (val: boolean) => void;
}

/**
 * Generic toggle row used across Lead Capture, Follow Up Email, etc.
 * Renders: [label + optional description + optional info tooltip] — [Switch]
 */
export function SectionToggle({
  label,
  description,
  tooltip,
  enabled,
  onChange,
}: SectionToggleProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: description ? "flex-start" : "center",
        justifyContent: "space-between",
        gap: 2,
        mb: 2.5,
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.6,
            mb: description ? 0.5 : 0,
          }}
        >
          <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#1E1A28" }}>
            {label}
          </Typography>
          {tooltip && (
            <Tooltip title={tooltip} placement="top" arrow>
              <InfoOutlinedIcon
                sx={{ fontSize: 15, color: "#A09EB8", cursor: "help" }}
              />
            </Tooltip>
          )}
        </Box>
        {description && (
          <Typography
            sx={{ fontSize: 12.5, color: "#7B7892", lineHeight: 1.6 }}
          >
            {description}
          </Typography>
        )}
      </Box>

      <Switch
        checked={enabled}
        onChange={(e) => onChange(e.target.checked)}
        size="small"
        sx={{
          flexShrink: 0,
          mt: description ? 0.3 : 0,
          "& .MuiSwitch-switchBase.Mui-checked": { color: "#6B3FA0" },
          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
            bgcolor: "#6B3FA0",
          },
        }}
      />
    </Box>
  );
}

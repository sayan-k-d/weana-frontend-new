"use client";

import { Box, Tooltip, Typography } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { VB_COLOR_OPTIONS } from "@/components/pages/businessAdminDashboard/virtualBackground/constants/virtualBgConstants";

interface VBColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export function VBColorPicker({ value, onChange }: VBColorPickerProps) {
  return (
    <Box sx={{ mb: 0 }}>
      <Typography
        sx={{ fontSize: 13, fontWeight: 600, color: "#1E1A28", mb: 1.2 }}
      >
        Choose color
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.2,
          flexWrap: "wrap",
        }}
      >
        {VB_COLOR_OPTIONS.map((opt) => {
          const isSelected = value === opt.value;
          const isTransparent = opt.value === "transparent";

          return (
            <Tooltip key={opt.value} title={opt.label} placement="top" arrow>
              <Box
                onClick={() => onChange(opt.value)}
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  cursor: "pointer",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  transition: "transform 0.1s",
                  "&:hover": { transform: "scale(1.12)" },
                  ...(isTransparent
                    ? {
                        border: "1.5px solid #D8D4EC",
                        bgcolor: "#FFFFFF",
                        background:
                          "linear-gradient(to bottom right, transparent calc(50% - 1px), #D8D4EC calc(50% - 1px), #D8D4EC calc(50% + 1px), transparent calc(50% + 1px))",
                      }
                    : {
                        bgcolor: opt.value,
                        boxShadow: isSelected
                          ? `0 0 0 2px #fff, 0 0 0 4px ${opt.value}`
                          : "none",
                      }),
                }}
              >
                {isSelected && !isTransparent && (
                  <CheckRoundedIcon
                    sx={{
                      fontSize: 14,
                      color: opt.value === "#F5C842" ? "#1E1A28" : "#fff",
                    }}
                  />
                )}
                {isSelected && isTransparent && (
                  <Box
                    sx={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      bgcolor: "#6B3FA0",
                    }}
                  />
                )}
              </Box>
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  );
}

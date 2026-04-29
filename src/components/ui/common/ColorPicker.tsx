"use client";

import { Box, Typography, Tooltip } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

export interface ColorOption {
  label: string;
  value: string;
}

interface ColorPickerProps {
  label?: string;
  options: ColorOption[];
  value: string;
  onChange: (color: string) => void;
}

/**
 * Generic row of colour-circle swatches.
 * The first swatch with value "transparent" is rendered as a diagonal-slash eraser.
 * All others show a coloured circle; selected state shows ring + checkmark.
 */
export function ColorPicker({
  label = "Choose color",
  options,
  value,
  onChange,
}: ColorPickerProps) {
  return (
    <Box sx={{ mb: 3 }}>
      {label && (
        <Typography
          sx={{ fontSize: 13, fontWeight: 600, color: "#1E1A28", mb: 1.5 }}
        >
          {label}
        </Typography>
      )}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.2,
          flexWrap: "wrap",
        }}
      >
        {options.map((opt) => {
          const isSelected = value === opt.value;
          const isTransparent = opt.value === "transparent";

          return (
            <Tooltip key={opt.value} title={opt.label} placement="top" arrow>
              <Box
                onClick={() => onChange(opt.value)}
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  cursor: "pointer",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
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
                  transition: "box-shadow 0.15s, transform 0.1s",
                  "&:hover": { transform: "scale(1.12)" },
                }}
              >
                {isSelected && !isTransparent && (
                  <CheckRoundedIcon
                    sx={{
                      fontSize: 15,
                      color: opt.value === "#F5C842" ? "#1E1A28" : "#fff",
                    }}
                  />
                )}
                {isSelected && isTransparent && (
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
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

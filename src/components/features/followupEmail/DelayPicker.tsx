"use client";

import { Box, OutlinedInput, Typography, Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface DelayPickerProps {
  hours: number;
  minutes: number;
  onChange: (patch: { delayHours?: number; delayMinutes?: number }) => void;
}

const numInputSx = {
  height: 44,
  borderRadius: "10px",
  fontSize: 13.5,
  color: "#3D3A4A",
  bgcolor: "#F7F6FA",
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E8E6F0" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#C4C0D8" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#6B3FA0",
    borderWidth: 1.5,
  },
  "& input": {
    textAlign: "center",
    py: 0,
    px: 1,
    MozAppearance: "textfield",
    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
    },
  },
};

const unitLabelSx = {
  fontSize: 13,
  color: "#9896A6",
  fontWeight: 500,
  ml: 1,
  whiteSpace: "nowrap" as const,
};

export function DelayPicker({ hours, minutes, onChange }: DelayPickerProps) {
  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, mb: 1.2 }}>
        <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#5C5874" }}>
          Schedule Follow Up Email Delay
        </Typography>
        <Tooltip
          title="The delay before the follow-up email is sent after connecting."
          placement="top"
          arrow
        >
          <InfoOutlinedIcon
            sx={{ fontSize: 14, color: "#A09EB8", cursor: "help" }}
          />
        </Tooltip>
      </Box>

      <Box sx={{ display: "flex", gap: 1.5 }}>
        {/* Hours */}
        <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
          <OutlinedInput
            type="number"
            value={hours}
            onChange={(e) =>
              onChange({ delayHours: Math.max(0, Number(e.target.value)) })
            }
            inputProps={{ min: 0, max: 999 }}
            sx={{ ...numInputSx, flex: 1 }}
            endAdornment={<Typography sx={unitLabelSx}>Hours</Typography>}
          />
        </Box>

        {/* Minutes */}
        <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
          <OutlinedInput
            type="number"
            value={minutes}
            onChange={(e) =>
              onChange({
                delayMinutes: Math.min(59, Math.max(0, Number(e.target.value))),
              })
            }
            inputProps={{ min: 0, max: 59 }}
            sx={{ ...numInputSx, flex: 1 }}
            endAdornment={<Typography sx={unitLabelSx}>Minutes</Typography>}
          />
        </Box>
      </Box>
    </Box>
  );
}

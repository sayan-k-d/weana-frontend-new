"use client";

import { useState } from "react";
import {
  Box,
  Collapse,
  Typography,
  TextField,
  Stack,
} from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import type { LeadCaptureFormData } from "./index";

type AdvancedOptionsProps = Pick<
  LeadCaptureFormData,
  "header" | "disclaimer" | "connectButtonText"
> & {
  onChange: (patch: Partial<LeadCaptureFormData>) => void;
};

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    fontSize: 13,
    bgcolor: "#F7F6FA",
    "& fieldset": { borderColor: "#E8E6F0" },
    "&:hover fieldset": { borderColor: "#C4C0D8" },
    "&.Mui-focused fieldset": { borderColor: "#6B3FA0", borderWidth: 1.5 },
  },
  "& .MuiInputBase-input": {
    py: 1.4,
    px: 1.8,
    color: "#3D3A4A",
    "&::placeholder": { color: "#B0AEC4", opacity: 1 },
  },
};

const labelSx = {
  fontSize: 12.5,
  fontWeight: 600,
  color: "#5C5874",
  mb: 0.8,
  display: "block",
};

export function AdvancedOptions({
  header,
  disclaimer,
  connectButtonText,
  onChange,
}: AdvancedOptionsProps) {
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        border: "1px solid #EAE8F0",
        borderRadius: "12px",
        bgcolor: "#FAFAFA",
        overflow: "hidden",
      }}
    >
      {/* Header / toggle row */}
      <Box
        onClick={() => setOpen((p) => !p)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1.8,
          cursor: "pointer",
          userSelect: "none",
          "&:hover": { bgcolor: "#F3F1F8" },
          transition: "background 0.15s",
        }}
      >
        <Typography sx={{ fontSize: 13.5, fontWeight: 500, color: "#3D3A4A" }}>
          Advanced Options
        </Typography>
        {open ? (
          <KeyboardArrowUpRoundedIcon sx={{ fontSize: 20, color: "#A09EB8" }} />
        ) : (
          <KeyboardArrowDownRoundedIcon
            sx={{ fontSize: 20, color: "#A09EB8" }}
          />
        )}
      </Box>

      {/* Collapsible body */}
      <Collapse in={open} timeout={200}>
        <Stack spacing={2} sx={{ px: 2, pb: 2.5, pt: 1 }}>
          {/* Header */}
          <Box>
            <Typography component="label" sx={labelSx}>
              Header
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Share your info back with Diago"
              value={header}
              onChange={(e) => onChange({ header: e.target.value })}
              sx={inputSx}
            />
          </Box>

          {/* Disclaimer */}
          <Box>
            <Typography component="label" sx={labelSx}>
              Disclaimer
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Weana does not share or sell your data"
              value={disclaimer}
              onChange={(e) => onChange({ disclaimer: e.target.value })}
              sx={inputSx}
            />
          </Box>

          {/* Connect Button Text */}
          <Box>
            <Typography component="label" sx={labelSx}>
              Connect Button Text
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Connect"
              value={connectButtonText}
              onChange={(e) => onChange({ connectButtonText: e.target.value })}
              sx={inputSx}
            />
          </Box>
        </Stack>
      </Collapse>
    </Box>
  );
}
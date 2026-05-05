"use client";

import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import {
  VB_FIELD_CHECKBOXES,
  type VirtualBgFormData,
} from "@/components/pages/businessAdminDashboard/virtualBackground/constants/virtualBgConstants";

interface VBFieldCheckboxesProps {
  form: VirtualBgFormData;
  onChange: (patch: Partial<VirtualBgFormData>) => void;
}

const checkboxSx = {
  p: "2px 6px 2px 2px",
  color: "#C4C0D8",
  "&.Mui-checked": { color: "#6B3FA0" },
  "& .MuiSvgIcon-root": { fontSize: 19 },
};

export function VBFieldCheckboxes({ form, onChange }: VBFieldCheckboxesProps) {
  // QR Code is full width with subtitle; the rest go 2-column
  const qrItem = VB_FIELD_CHECKBOXES.find((i) => i.key === "showQRCode")!;
  const fieldItems = VB_FIELD_CHECKBOXES.filter((i) => i.key !== "showQRCode");

  return (
    <Box>
      {/* ── QR Code — full width with subtitle ── */}
      <FormControlLabel
        control={
          <Checkbox
            checked={form.showQRCode}
            onChange={(e) => onChange({ showQRCode: e.target.checked })}
            sx={checkboxSx}
          />
        }
        label={
          <Box>
            <Typography
              sx={{ fontSize: 13.5, fontWeight: 600, color: "#1E1A28" }}
            >
              {qrItem.label}
            </Typography>
            {qrItem.subtitle && (
              <Typography
                sx={{ fontSize: 12, color: "#9896A6", lineHeight: 1.4 }}
              >
                {qrItem.subtitle}
              </Typography>
            )}
          </Box>
        }
        sx={{ alignItems: "flex-start", m: 0, mb: 1 }}
      />

      {/* ── Field toggles — 2-column grid ── */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          columnGap: 2,
          rowGap: 0.5,
        }}
      >
        {fieldItems.map(({ key, label }) => (
          <FormControlLabel
            key={key}
            control={
              <Checkbox
                checked={form[key] as boolean}
                onChange={(e) => onChange({ [key]: e.target.checked })}
                sx={checkboxSx}
              />
            }
            label={
              <Typography
                sx={{ fontSize: 13.5, fontWeight: 600, color: "#1E1A28" }}
              >
                {label}
              </Typography>
            }
            sx={{ m: 0, alignItems: "center" }}
          />
        ))}
      </Box>
    </Box>
  );
}

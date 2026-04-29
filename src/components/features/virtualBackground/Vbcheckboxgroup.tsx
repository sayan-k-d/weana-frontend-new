"use client";

import { Box, Checkbox, Typography, FormControlLabel } from "@mui/material";
import type { VirtualBackgroundFormData } from "@/components/pages/members/constants/qrCode";

interface VBCheckboxGroupProps {
  form: VirtualBackgroundFormData;
  onChange: (patch: Partial<VirtualBackgroundFormData>) => void;
}

const checkboxSx = {
  color: "#C4C0D8",
  padding: "2px 6px 2px 2px",
  "&.Mui-checked": { color: "#6B3FA0" },
  "& .MuiSvgIcon-root": { fontSize: 20, borderRadius: "4px" },
};

const labelSx = {
  fontSize: 13,
  fontWeight: 600,
  color: "#1E1A28",
  userSelect: "none" as const,
};

const subLabelSx = {
  fontSize: 12,
  color: "#9896A6",
  mt: 0.1,
};

export function VBCheckboxGroup({ form, onChange }: VBCheckboxGroupProps) {
  return (
    <Box sx={{ mb: 3 }}>
      {/* ── Condensed view ── */}
      <Box sx={{ mb: 1.8 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={form.condensedView}
              onChange={(e) => onChange({ condensedView: e.target.checked })}
              sx={checkboxSx}
            />
          }
          label={
            <Box>
              <Typography sx={labelSx}>Condensed view</Typography>
              <Typography sx={subLabelSx}>
                Optimal for Microsoft Teams
              </Typography>
            </Box>
          }
          sx={{ alignItems: "flex-start", m: 0 }}
        />
      </Box>

      {/* ── QR Code ── */}
      <Box sx={{ mb: 1.8 }}>
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
              <Typography sx={labelSx}>QR Code</Typography>
              <Typography sx={subLabelSx}>
                QR Code can be customized in the QR Code section
              </Typography>
            </Box>
          }
          sx={{ alignItems: "flex-start", m: 0 }}
        />
      </Box>

      {/* ── 2-column field toggles ── */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          columnGap: 2,
          rowGap: 0.5,
        }}
      >
        {(
          [
            { key: "showName", label: "Name" },
            { key: "showCompany", label: "Company" },
            { key: "showJobTitle", label: "Job Title" },
            { key: "showLocation", label: "Location" },
          ] as { key: keyof VirtualBackgroundFormData; label: string }[]
        ).map(({ key, label }) => (
          <FormControlLabel
            key={key}
            control={
              <Checkbox
                checked={form[key] as boolean}
                onChange={(e) => onChange({ [key]: e.target.checked })}
                sx={checkboxSx}
              />
            }
            label={<Typography sx={labelSx}>{label}</Typography>}
            sx={{ m: 0, alignItems: "center" }}
          />
        ))}
      </Box>
    </Box>
  );
}

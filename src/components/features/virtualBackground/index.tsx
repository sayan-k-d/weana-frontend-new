"use client";

import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import { ColorPicker } from "@/components/ui/common/ColorPicker";
import { VBCheckboxGroup } from "./Vbcheckboxgroup";
import { VBImageTabs } from "./Vbimagetabs";
import {
  DEFAULT_VIRTUAL_BG_FORM,
  VB_COLOR_OPTIONS,
  type VirtualBackgroundFormData,
} from "@/components/pages/members/constants/qrCode";

interface VirtualBackgroundSectionProps {
  form?: VirtualBackgroundFormData;
  onChange?: (patch: Partial<VirtualBackgroundFormData>) => void;
  onUseTeamAssets?: () => void;
}

export function VirtualBackgroundSection({
  form: externalForm,
  onChange,
  onUseTeamAssets,
}: VirtualBackgroundSectionProps) {
  const [form, setForm] = useState<VirtualBackgroundFormData>(
    () => externalForm ?? DEFAULT_VIRTUAL_BG_FORM,
  );
  const safeForm: VirtualBackgroundFormData = form ?? DEFAULT_VIRTUAL_BG_FORM;
  const patch = (update: Partial<VirtualBackgroundFormData>) => {
    const next = { ...form, ...update };
    setForm(next);
    onChange?.(update);
  };

  return (
    <Box sx={{ px: 3, pb: 4 }}>
      {/* ── Title ── */}
      <Typography
        sx={{
          fontSize: 15,
          fontWeight: 700,
          color: "#1E1A28",
          mb: 2,
          letterSpacing: "-0.01em",
        }}
      >
        Virtual Background
      </Typography>

      {/* ── Use Team Assets button ── */}
      <Button
        variant="contained"
        disableElevation
        startIcon={<GroupOutlinedIcon sx={{ fontSize: "16px !important" }} />}
        onClick={onUseTeamAssets}
        sx={{
          mb: 3,
          fontSize: 13,
          fontWeight: 700,
          textTransform: "none",
          borderRadius: "999px",
          px: 2.5,
          py: 1,
          bgcolor: "#6B3FA0",
          color: "#fff",
          "&:hover": { bgcolor: "#5A3490" },
        }}
      >
        Use Tem Assets
      </Button>

      {/* ── Color picker ── */}
      <ColorPicker
        label="Choose color"
        options={
          VB_COLOR_OPTIONS as unknown as { label: string; value: string }[]
        }
        value={safeForm.color}
        onChange={(color) => patch({ color })}
      />

      {/* ── Checkboxes ── */}
      <VBCheckboxGroup form={safeForm} onChange={patch} />

      {/* ── Image tabs + grid ── */}
      <VBImageTabs form={safeForm} onChange={patch} />
    </Box>
  );
}

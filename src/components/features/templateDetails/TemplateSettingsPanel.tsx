"use client";

import { useState } from "react";
import { Box, Switch, Typography } from "@mui/material";
import {
  DEFAULT_TEMPLATE_SETTINGS,
  type TemplateSettingsFormData,
} from "@/components/pages/businessAdminDashboard/templates/constants/templateDetailConstants";

interface TemplateSettingsPanelProps {
  initialData?: TemplateSettingsFormData;
  onChange?: (patch: Partial<TemplateSettingsFormData>) => void;
}

export function TemplateSettingsPanel({
  initialData,
  onChange,
}: TemplateSettingsPanelProps) {
  const [form, setForm] = useState<TemplateSettingsFormData>(
    initialData ?? { ...DEFAULT_TEMPLATE_SETTINGS },
  );

  const patch = (update: Partial<TemplateSettingsFormData>) => {
    const next = { ...form, ...update };
    setForm(next);
    onChange?.(update);
  };

  return (
    <Box sx={{ px: 3, pb: 4 }}>
      {/* Title */}
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 700,
          color: "#1E1A28",
          mb: 2.5,
          letterSpacing: "-0.01em",
        }}
      >
        Template Settings
      </Typography>

      {/* Toggle card */}
      <Box
        sx={{
          border: "1px solid #EAE8F0",
          borderRadius: "12px",
          px: 2.5,
          py: 2,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 2,
          bgcolor: "#FAFAFA",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{ fontSize: 13.5, fontWeight: 600, color: "#1E1A28", mb: 0.5 }}
          >
            Allow non-admins to assign this template to their cards
          </Typography>
          <Typography
            sx={{ fontSize: 12.5, color: "#7B7892", lineHeight: 1.6 }}
          >
            When enabled, it is recommended that all unique links on this
            template are unlocked.
          </Typography>
        </Box>

        <Switch
          checked={form.allowNonAdminAssign}
          onChange={(e) => patch({ allowNonAdminAssign: e.target.checked })}
          sx={{
            flexShrink: 0,
            mt: 0.3,
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

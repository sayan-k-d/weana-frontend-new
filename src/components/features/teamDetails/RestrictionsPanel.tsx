"use client";

import { useState } from "react";
import { Box, Button, Switch, Typography } from "@mui/material";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { RestrictionToggleRow } from "./RestrictionToggleRow";
import { RestrictionsTabContent } from "./RestrictionsTabContent";
import {
  DEFAULT_TEAM_RESTRICTIONS_FORM,
  type TeamRestrictionsFormData,
  type RestrictionsTab,
} from "@/components/pages/businessAdminDashboard/teams/constants/teamDetail";

const TABS: { id: RestrictionsTab; label: string }[] = [
  { id: "about", label: "About" },
  { id: "content", label: "Content" },
  { id: "qr-code", label: "QR Code" },
  { id: "settings", label: "Settings" },
];

interface RestrictionsPanelProps {
  initialData?: TeamRestrictionsFormData;
  onSave?: (data: TeamRestrictionsFormData) => void;
  onCopyFromTeam?: () => void;
}

export function RestrictionsPanel({
  initialData,
  onSave,
  onCopyFromTeam,
}: RestrictionsPanelProps) {
  const [form, setForm] = useState<TeamRestrictionsFormData>(
    initialData ?? { ...DEFAULT_TEAM_RESTRICTIONS_FORM },
  );

  const patch = (update: Partial<TeamRestrictionsFormData>) => {
    setForm((prev) => ({ ...prev, ...update }));
    onSave?.({ ...form, ...update });
  };

  return (
    <Box>
      {/* ── Title row ── */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 2,
          mb: 2.5,
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 700,
              color: "#1E1A28",
              mb: 0.5,
              letterSpacing: "-0.01em",
            }}
          >
            Restrictions
          </Typography>
          <Typography
            sx={{ fontSize: 12.5, color: "#7B7892", lineHeight: 1.6 }}
          >
            Restrict members from being able to change account settings.
            <br />
            Restrictions will not be applied to admins.
          </Typography>
        </Box>

        <Button
          variant="outlined"
          startIcon={
            <ContentCopyOutlinedIcon sx={{ fontSize: "15px !important" }} />
          }
          onClick={onCopyFromTeam}
          sx={{
            fontSize: 12.5,
            fontWeight: 600,
            textTransform: "none",
            borderRadius: "999px",
            px: 2,
            py: 0.9,
            color: "#3D3A4A",
            borderColor: "#D8D4EC",
            bgcolor: "#FAFAFA",
            flexShrink: 0,
            "&:hover": {
              borderColor: "#6B3FA0",
              color: "#6B3FA0",
              bgcolor: "#F3F0FB",
            },
          }}
        >
          Copy restrictions from another Team
        </Button>
      </Box>

      {/* ── Allow change requests banner ── */}
      <Box
        sx={{
          border: "1px solid #EAE8F0",
          borderRadius: "12px",
          px: 2.5,
          py: 2,
          mb: 3,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 2,
          bgcolor: "#FAFAFA",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{ fontSize: 14, fontWeight: 600, color: "#1E1A28", mb: 0.4 }}
          >
            Allow change requests
          </Typography>
          <Typography
            sx={{ fontSize: 12.5, color: "#7B7892", lineHeight: 1.6 }}
          >
            If toggled on, members can submit requests to make changes to
            restricted elements.
            <br />
            ONLY applies to restrictions on the About and QR Code pages below
          </Typography>
        </Box>
        <Switch
          checked={form.allowChangeRequests}
          onChange={(e) => patch({ allowChangeRequests: e.target.checked })}
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

      {/* ── Pill tab bar ── */}
      <Box
        sx={{
          display: "flex",
          border: "1.5px solid #EAE8F0",
          borderRadius: "999px",
          overflow: "hidden",
          mb: 2.5,
          bgcolor: "#F3F2F6",
        }}
      >
        {TABS.map((tab) => {
          const isActive = form.activeTab === tab.id;
          return (
            <Box
              key={tab.id}
              onClick={() => patch({ activeTab: tab.id })}
              sx={{
                flex: 1,
                textAlign: "center",
                py: 1,
                fontSize: 13,
                fontWeight: isActive ? 700 : 500,
                color: isActive ? "#FFFFFF" : "#7B7892",
                bgcolor: isActive ? "#6B3FA0" : "transparent",
                borderRadius: "999px",
                cursor: "pointer",
                userSelect: "none",
                transition: "all 0.15s",
                "&:hover": !isActive
                  ? { color: "#3D3A4A", bgcolor: "#ECEAF5" }
                  : {},
              }}
            >
              {tab.label}
            </Box>
          );
        })}
      </Box>

      {/* ── Lock All row ── */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1.4,
          border: "1px solid #EAE8F0",
          borderRadius: "10px",
          mb: 1.5,
          bgcolor: form.lockAll ? "#F3F0FB" : "#FFFFFF",
          transition: "background 0.15s",
        }}
      >
        <Typography
          sx={{
            fontSize: 13.5,
            fontWeight: 600,
            color: form.lockAll ? "#6B3FA0" : "#1E1A28",
          }}
        >
          Lock All
        </Typography>
        <Switch
          checked={form.lockAll}
          onChange={(e) => patch({ lockAll: e.target.checked })}
          size="small"
          sx={{
            "& .MuiSwitch-switchBase.Mui-checked": { color: "#6B3FA0" },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              bgcolor: "#6B3FA0",
            },
          }}
        />
      </Box>

      {/* ── Tab-specific restriction rows ── */}
      <RestrictionsTabContent
        activeTab={form.activeTab}
        form={form}
        onChange={patch}
      />
    </Box>
  );
}

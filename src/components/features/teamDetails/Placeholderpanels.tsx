"use client";

import { Box, Typography } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import ExtensionOutlinedIcon from "@mui/icons-material/ExtensionOutlined";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";

function ComingSoonPanel({
  label,
  icon,
}: {
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        minHeight: 320,
        gap: 1.5,
        color: "#C4C0D8",
      }}
    >
      <Box sx={{ fontSize: 40, display: "flex" }}>{icon}</Box>
      <Typography sx={{ fontSize: 15, fontWeight: 600, color: "#B0AEC4" }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: 13, color: "#C4C0D8" }}>
        Coming soon
      </Typography>
    </Box>
  );
}

export function GeneralPanel() {
  return (
    <ComingSoonPanel
      label="General"
      icon={<SettingsOutlinedIcon sx={{ fontSize: 44, color: "#C4C0D8" }} />}
    />
  );
}

export function RestrictionsPanel() {
  return (
    <ComingSoonPanel
      label="Restrictions"
      icon={<BlockOutlinedIcon sx={{ fontSize: 44, color: "#C4C0D8" }} />}
    />
  );
}

export function TemplateAutoAssignPanel() {
  return (
    <ComingSoonPanel
      label="Template Auto Assign"
      icon={
        <PlaylistAddCheckOutlinedIcon sx={{ fontSize: 44, color: "#C4C0D8" }} />
      }
    />
  );
}

export function IntegrationsPanel() {
  return (
    <ComingSoonPanel
      label="Integrations"
      icon={<ExtensionOutlinedIcon sx={{ fontSize: 44, color: "#C4C0D8" }} />}
    />
  );
}

export function ViewMembersPanel() {
  return (
    <ComingSoonPanel
      label="View Members"
      icon={
        <PeopleOutlineRoundedIcon sx={{ fontSize: 44, color: "#C4C0D8" }} />
      }
    />
  );
}

"use client";

import { Box, Typography } from "@mui/material";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import ExtensionOutlinedIcon from "@mui/icons-material/ExtensionOutlined";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import type { TeamDetailSectionId } from "@/components/pages/businessAdminDashboard/teams/constants/teamDetail";

interface SidebarItem {
  id: TeamDetailSectionId;
  label: string;
  icon: React.ReactNode;
  external?: boolean;
}

const ITEMS: SidebarItem[] = [
  {
    id: "edit-members",
    label: "Edit Members",
    icon: <GroupAddOutlinedIcon sx={{ fontSize: 20 }} />,
  },
  {
    id: "general",
    label: "General",
    icon: <SettingsOutlinedIcon sx={{ fontSize: 20 }} />,
  },
  {
    id: "restrictions",
    label: "Restrictions",
    icon: <BlockOutlinedIcon sx={{ fontSize: 20 }} />,
  },
  {
    id: "template-auto-assign",
    label: "Template Auto Assign",
    icon: <PlaylistAddCheckOutlinedIcon sx={{ fontSize: 20 }} />,
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: <ExtensionOutlinedIcon sx={{ fontSize: 20 }} />,
  },
  {
    id: "view-members",
    label: "View Members",
    icon: <PeopleOutlineRoundedIcon sx={{ fontSize: 20 }} />,
    external: true,
  },
];

interface TeamDetailSidebarProps {
  activeId: TeamDetailSectionId;
  onChange: (id: TeamDetailSectionId) => void;
}

export function TeamDetailSidebar({
  activeId,
  onChange,
}: TeamDetailSidebarProps) {
  return (
    <Box
      sx={{
        width: 220,
        flexShrink: 0,
        py: 1.5,
        px: 1,
        borderRight: "1px solid #EAE8F0",
        bgcolor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        gap: 0.3,
      }}
    >
      {ITEMS.map((item) => {
        const isActive = activeId === item.id;
        return (
          <Box
            key={item.id}
            onClick={() => onChange(item.id)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1.2,
              px: 1.5,
              py: 1.1,
              borderRadius: "10px",
              cursor: "pointer",
              bgcolor: isActive ? "#EDE9F8" : "transparent",
              color: isActive ? "#6B3FA0" : "#5C5874",
              transition: "background 0.13s, color 0.13s",
              "&:hover": {
                bgcolor: isActive ? "#EDE9F8" : "#F3F2F6",
                color: isActive ? "#6B3FA0" : "#3D3A4A",
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
              <Box
                sx={{
                  color: isActive ? "#6B3FA0" : "#9896A6",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {item.icon}
              </Box>
              <Typography
                sx={{
                  fontSize: 13.5,
                  fontWeight: isActive ? 700 : 500,
                  color: "inherit",
                  lineHeight: 1,
                }}
              >
                {item.label}
              </Typography>
            </Box>

            {item.external && (
              <OpenInNewRoundedIcon
                sx={{ fontSize: 14, color: "#B0AEC4", flexShrink: 0 }}
              />
            )}
          </Box>
        );
      })}
    </Box>
  );
}

"use client";

import { Box, Stack, Typography } from "@mui/material";
import { SectionLabel } from "@/components/ui/common/SectionLabel";
import {
  SIDE_MENU_ITEMS,
  MENU_SECTIONS,
} from "@/components/pages/businessAdminDashboard/members/constants/memberProfile";
import type { SideMenuItemId } from "@/types";

interface ProfileSideMenuProps {
  activeId: SideMenuItemId;
  onChange: (id: SideMenuItemId) => void;
  lastLogin?: string;
}

export function ProfileSideMenu({
  activeId,
  onChange,
  lastLogin,
}: ProfileSideMenuProps) {
  return (
    <Box
      sx={{
        // width: 160,
        minWidth: 230,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        py: 1,
        pr: 1,
      }}
    >
      {/* Grouped nav items by section */}
      {MENU_SECTIONS.map((section) => {
        const items = SIDE_MENU_ITEMS.filter((i) => i.section === section);
        return (
          <Box key={section}>
            <SectionLabel label={section} />
            {items.map((item) => {
              const isActive = item.id === activeId;
              return (
                <Box
                  key={item.id}
                  onClick={() => onChange(item.id)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    px: 1.2,
                    py: 1,
                    borderRadius: "8px",
                    cursor: "pointer",
                    bgcolor: isActive ? "#EDE8F8" : "transparent",
                    transition: "background 0.14s",
                    mb: 0.75,
                    "&:hover": { bgcolor: isActive ? "#EDE8F8" : "#F3F1FA" },
                  }}
                >
                  <Box
                    sx={{
                      color: isActive ? "#6B3FA0" : "#7A7892",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography
                    sx={{
                      fontSize: 12.5,
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? "#4E2A84" : "#3D3A4A",
                      lineHeight: 1,
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        );
      })}

      {/* Last login */}
      {lastLogin && (
        <Box sx={{ mt: "auto", pt: 3 }}>
          <Typography sx={{ fontSize: 11, color: "#A09EB8" }}>
            Last Login :{" "}
            <Box component="span" sx={{ fontWeight: 600, color: "#6B6880" }}>
              {lastLogin}
            </Box>
          </Typography>
        </Box>
      )}
    </Box>
  );
}

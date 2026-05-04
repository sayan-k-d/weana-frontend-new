"use client";

import { Box, Typography } from "@mui/material";
import {
  TEMPLATE_SIDE_MENU_ITEMS,
  type TemplateSectionId,
} from "@/components/pages/businessAdminDashboard/templates/constants/templateDetailConstants";

interface TemplateSideMenuProps {
  activeId: TemplateSectionId;
  onChange: (id: TemplateSectionId) => void;
}

export function TemplateSideMenu({
  activeId,
  onChange,
}: TemplateSideMenuProps) {
  return (
    <Box
      sx={{
        minWidth: 200,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        py: 1,
        pr: 1,
      }}
    >
      {/* Section label */}
      <Typography
        sx={{
          fontSize: 10.5,
          fontWeight: 700,
          color: "#A09EB8",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          px: 1.2,
          mb: 0.8,
          mt: 0.5,
        }}
      >
        CONTENT
      </Typography>

      {TEMPLATE_SIDE_MENU_ITEMS.map((item) => {
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
              mb: 0.5,
              transition: "background 0.14s",
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
                whiteSpace: "nowrap",
              }}
            >
              {item.label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

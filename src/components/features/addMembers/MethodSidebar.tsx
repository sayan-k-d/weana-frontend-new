"use client";

import { Box, Typography } from "@mui/material";
import {
  ADD_METHODS,
  MethodIcon,
} from "@/components/pages/businessAdminDashboard/members/constants/addMember";
import type { MethodId } from "@/types";

interface MethodSidebarProps {
  activeId: MethodId;
  onChange: (id: MethodId) => void;
}

export function MethodSidebar({ activeId, onChange }: MethodSidebarProps) {
  return (
    <Box
      sx={{
        minWidth: 250,
        width: 250,
        flexShrink: 0,
        borderRight: "1px solid #EEECF5",
        py: 2.5,
        px: 1.6,
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
      }}
    >
      {ADD_METHODS.map((method) => {
        const isActive = activeId === method.id;
        return (
          <Box
            key={method.id}
            onClick={() => onChange(method.id)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.4,
              px: 1.4,
              py: 1.1,
              borderRadius: "10px",
              cursor: "pointer",
              bgcolor: isActive ? "#EDE8F8" : "transparent",
              border: "1px solid",
              borderColor: isActive ? "#D6C9F5" : "transparent",
              transition: "all 0.15s",
              "&:hover": { bgcolor: isActive ? "#EDE8F8" : "#F5F2FC" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <MethodIcon id={method.id} active={isActive} />
            </Box>
            <Typography
              sx={{
                fontSize: 13.5,
                fontWeight: isActive ? 700 : 500,
                color: isActive ? "#4E2A84" : "#2D2840",
                letterSpacing: "-0.01em",
                lineHeight: 1.3,
              }}
            >
              {method.label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

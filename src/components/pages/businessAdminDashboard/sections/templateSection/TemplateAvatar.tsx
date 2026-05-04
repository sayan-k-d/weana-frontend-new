"use client";

import { Box, Typography, type SxProps, type Theme } from "@mui/material";
import {
  T_COLORS,
  T_RADII,
} from "@/components/pages/businessAdminDashboard/templates/constants/Templatesstyles";

interface TemplateAvatarProps {
  name: string;
  avatarUrl?: string | null;
  size?: number;
  sx?: SxProps<Theme>;
}

export function TemplateAvatar({
  name,
  avatarUrl,
  size = 68,
  sx,
}: TemplateAvatarProps) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: T_RADII.md,
        bgcolor: T_COLORS.avatarBg,
        overflow: "hidden",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `1px solid ${T_COLORS.cardBorder}`,
        ...(sx as object),
      }}
    >
      {avatarUrl ? (
        <Box
          component="img"
          src={avatarUrl}
          alt={name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      ) : (
        <Typography
          sx={{
            fontSize: size * 0.36,
            fontWeight: 700,
            color: T_COLORS.brandBtn,
            userSelect: "none",
          }}
        >
          {initial}
        </Typography>
      )}
    </Box>
  );
}

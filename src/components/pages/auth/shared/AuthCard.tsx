"use client";

import { Box, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 440,
        bgcolor: "#FFFFFF",
        border: "1px solid #E9DFF5",
        borderRadius: "16px",
        boxShadow: "0 8px 24px rgba(81, 43, 122, 0.06)",
        p: { xs: 3, sm: 4 },
      }}
    >
      <Stack spacing={3}>
        <Stack spacing={0.75}>
          <Typography
            component="h1"
            sx={{
              color: "#512B7A",
              fontSize: 25,
              fontWeight: 500,
              lineHeight: "135%",
              letterSpacing: "-0.01em",
              fontFamily: 'var(--font-codec-pro), sans-serif',
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              color: "#4F4F4F",
              fontSize: 13,
              lineHeight: 1.55,
            }}
          >
            {subtitle}
          </Typography>
        </Stack>

        {children}
      </Stack>
    </Box>
  );
}

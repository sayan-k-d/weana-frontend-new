"use client";

import { useState } from "react";
import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

import {
  MethodSidebar,
  EmailPanel,
  CsvPanel,
  CompanyPanel,
  ActiveDirectoryPanel,
  EventbritePanel,
  type MethodId,
} from "@/components/features/addMembers";
import { useRouter } from "next/navigation";

// ─── Panel dispatcher ─────────────────────────────────────────────────────────

function ActivePanel({ id }: { id: MethodId }) {
  switch (id) {
    case "email":
      return <EmailPanel />;
    case "csv":
      return <CsvPanel />;
    case "company":
      return <CompanyPanel />;
    case "activedirectory":
      return <ActiveDirectoryPanel />;
    case "eventbrite":
      return <EventbritePanel />;
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AddMembersPage() {
  const router = useRouter();

  const [activeMethod, setActiveMethod] = useState<MethodId>("email");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F3F2F6",
        fontFamily: 'Inter, "Segoe UI", sans-serif',
        p: { xs: 2, md: 3 },
      }}
    >
      {/* ── Page header ── */}
      <Stack direction="row" spacing={1.5} sx={{ mb: 3, alignItems: "center" }}>
        <IconButton
          size="small"
          sx={{
            color: "#6B7280",
            "&:hover": { bgcolor: "#EDE8F6", color: "#6B3FA0" },
          }}
        >
          <ArrowBackIosNewRoundedIcon
            sx={{ fontSize: 15 }}
            onClick={() => router.back()}
          />
        </IconButton>

        <Box
          sx={{ width: "1px", height: 22, bgcolor: "#D1D0DA", flexShrink: 0 }}
        />

        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 700,
            color: "#512B7A",
            letterSpacing: "-0.02em",
          }}
        >
          Add Members
        </Typography>
      </Stack>

      {/* ── Main card: sidebar + dynamic panel ── */}
      <Paper
        elevation={0}
        sx={{
          border: "1px solid #E7E6EE",
          borderRadius: "16px",
          boxShadow: "0 1px 4px rgba(23,19,33,0.06)",
          bgcolor: "#FFFFFF",
          overflow: "hidden",
          display: "flex",
          minHeight: 520,
        }}
      >
        <MethodSidebar activeId={activeMethod} onChange={setActiveMethod} />

        <Box sx={{ flex: 1 }}>
          <ActivePanel id={activeMethod} />
        </Box>
      </Paper>
    </Box>
  );
}

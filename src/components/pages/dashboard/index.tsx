"use client";

import { useState } from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import Sidebar from "@/components/layout/Sidebar";
import WelcomeDialog from "./sections/WelcomeDialog";
import OnboardingBanner from "./sections/OnboardingBanner";
import TeamPerformanceCard from "./sections/TeamPerformanceCard";
import CampaignsCard from "./sections/CampaignsCard";
import RecommendationsCard from "./sections/RecommendationsCard";
import RecentLeadsCard from "./sections/LeadsSection";
import { ExpertCard, FeatureExplorer } from "./sections/FeaturesSection";
import { useWelcomeDialog } from "@/hooks/useWelcomeDialog";

export default function BusinessAdminDashboard() {
  const { isOpen: isWelcomeOpen, close: closeWelcome } = useWelcomeDialog(true);
  const [showBanner, setShowBanner] = useState(true);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F3F2F6",
        fontFamily: 'Inter, "Segoe UI", sans-serif',
      }}
    >
      {/* ── Welcome onboarding dialog ── */}
      <WelcomeDialog open={isWelcomeOpen} onClose={closeWelcome} />

      {/* ── Layout: sidebar + main ── */}
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />

        {/* ── Main content ── */}
        <Box sx={{ flex: 1, p: 2.2, overflow: "auto" }}>
          {/* Breadcrumb + action */}
          <Stack
            direction="row"
            sx={{
              mb: 1.6,
              pl: 0.6,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Stack direction="row" spacing={0.7} sx={{ alignItems: "center" }}>
              <Typography
                sx={{
                  fontSize: 14,
                  color: "#512B7A",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                }}
              >
                Dashboard
              </Typography>
              <ChevronRightRoundedIcon
                sx={{ color: "#ADAAB7", fontSize: 17 }}
              />
              <Typography
                sx={{
                  fontSize: 14,
                  color: "#512B7A",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                }}
              >
                Welcome to Weana
              </Typography>
            </Stack>

            <Button
              variant="outlined"
              sx={{
                borderColor: "#DBD8E6",
                borderRadius: "999px",
                px: 2,
                py: 0.5,
                color: "#2C2738",
                fontSize: 11.5,
                fontWeight: 600,
                bgcolor: "#FFFFFF",
              }}
            >
              Add Members +
            </Button>
          </Stack>

          {/* Onboarding banner (dismissible) */}
          {showBanner && (
            <OnboardingBanner onDismiss={() => setShowBanner(false)} />
          )}

          {/* Two-column grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1.25fr 0.85fr",
              gap: 1.7,
              mb: 1.7,
              alignItems: "stretch",
            }}
          >
            {/* Left column */}
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TeamPerformanceCard />
              <CampaignsCard />
              <RecommendationsCard />
            </Box>

            {/* Right column */}
            <Box>
              <RecentLeadsCard />
              <ExpertCard />
            </Box>
          </Box>

          {/* Feature explorer */}
          <FeatureExplorer />
        </Box>
      </Box>
    </Box>
  );
}

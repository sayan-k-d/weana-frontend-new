"use client";

import { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import WelcomeDialog from "./sections/dashboard/WelcomeDialog";
import OnboardingBanner from "./sections/dashboard/OnboardingBanner";
import TeamPerformanceCard from "./sections/dashboard/TeamPerformanceCard";
import CampaignsCard from "./sections/dashboard/CampaignsCard";
import RecommendationsCard from "./sections/dashboard/RecommendationsCard";
import RecentLeadsCard from "./sections/dashboard/LeadsSection";
import {
  ExpertCard,
  FeatureExplorer,
} from "./sections/dashboard/FeaturesSection";
import { useWelcomeDialog } from "@/hooks/useWelcomeDialog";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";

export default function BusinessAdminDashboard() {
  const { isOpen: isWelcomeOpen, close: closeWelcome } = useWelcomeDialog(true);
  const [showBanner, setShowBanner] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosInstance.get("profile");
        console.log("User:", data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        router.push("/");
      }
    };

    fetchProfile();
  }, []);
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
            <ChevronRightRoundedIcon sx={{ color: "#ADAAB7", fontSize: 17 }} />
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
  );
}

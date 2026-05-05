"use client";

import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import MobileAppModal from "./sections/MobileAppModal";
import OnboardingCard from "./sections/OnboardingCard";
import ProfileCards from "./sections/ProfileCards";
import ShareProfileModal from "./sections/ShareProfileModal";
import { useProfile } from "@/hooks/useProfile";

const ONBOARDING_STEPS = [
  "Create your profile",
  "Set up your profile",
  "Sign into mobile app",
  "Share your profile",
  "Add your contacts",
  "Try NFC share",
];

const PROGRESS_NODES = [1, 2, 3, 4, 5];
const VISIBLE_STEP_CARDS = 4;
const MOBILE_APP_TRIGGER_STEP = "Sign into mobile app";
const PROFILE_LINK = "https://weana.co/profiles/dash";

export default function IndividualAdminDashboardPage() {
  const router = useRouter();
  const [stepStartIndex, setStepStartIndex] = useState(0);
  const [isMobileAppModalOpen, setIsMobileAppModalOpen] = useState(false);
  const [isShareProfileModalOpen, setIsShareProfileModalOpen] = useState(false);
  const maxStepStart = Math.max(ONBOARDING_STEPS.length - VISIBLE_STEP_CARDS, 0);

  const activeSteps = useMemo(
    () => ONBOARDING_STEPS.slice(stepStartIndex, stepStartIndex + VISIBLE_STEP_CARDS),
    [stepStartIndex],
  );

  const handleSlideNext = () => {
    setStepStartIndex((prev) => (prev >= maxStepStart ? 0 : prev + 1));
  };

  const handleStepClick = (step: string) => {
    if (step === MOBILE_APP_TRIGGER_STEP) {
      setIsMobileAppModalOpen(true);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F7F7F7",
        p: 2.2,
        fontFamily: 'Inter, "Segoe UI", sans-serif',
      }}
    >
      <Stack
        direction="row"
        sx={{ alignItems: "center", justifyContent: "space-between", mb: 1.7 }}
      >
        <Stack direction="row" spacing={0.6} sx={{ alignItems: "center", pl: 0.4 }}>
          <Typography sx={{ fontSize: 14, color: "#5A2A95", fontWeight: 700 }}>
            Dashboard
          </Typography>
          <ChevronRightRoundedIcon sx={{ color: "#A59CB8", fontSize: 16 }} />
          <Typography sx={{ fontSize: 14, color: "#5A2A95", fontWeight: 700 }}>
            Welcome to Weana
          </Typography>
        </Stack>

        <Button
          variant="contained"
          endIcon={<NorthEastRoundedIcon sx={{ fontSize: 14 }} />}
          onClick={() => setIsShareProfileModalOpen(true)}
          sx={{
            textTransform: "none",
            borderRadius: "999px",
            bgcolor: "#6F3AB1",
            px: 2,
            py: 0.65,
            fontSize: 12.5,
            fontWeight: 600,
            boxShadow: "none",
            "&:hover": { bgcolor: "#5F2D9E", boxShadow: "none" },
          }}
        >
          Share Your Profile
        </Button>
      </Stack>

      <OnboardingCard
        activeSteps={activeSteps}
        progressNodes={PROGRESS_NODES}
        onStepClick={handleStepClick}
        onSlideNext={handleSlideNext}
        triggerStep={MOBILE_APP_TRIGGER_STEP}
      />

      <ProfileCards
        onShareProfileClick={() => setIsShareProfileModalOpen(true)}
        onCreateNewProfileClick={() => router.push("/individual-admin/member-profile")}
      />

      <MobileAppModal
        open={isMobileAppModalOpen}
        onClose={() => setIsMobileAppModalOpen(false)}
        profileLink={PROFILE_LINK}
      />
      <ShareProfileModal
        open={isShareProfileModalOpen}
        onClose={() => setIsShareProfileModalOpen(false)}
      />
    </Box>
  );
}

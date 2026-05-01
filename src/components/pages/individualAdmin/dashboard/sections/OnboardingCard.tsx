"use client";

import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";

type OnboardingCardProps = {
  activeSteps: string[];
  progressNodes: number[];
  onStepClick: (step: string) => void;
  onSlideNext: () => void;
  triggerStep: string;
};

export default function OnboardingCard({
  activeSteps,
  progressNodes,
  onStepClick,
  onSlideNext,
  triggerStep,
}: OnboardingCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid #A551FF",
        bgcolor: "#FEFAFF",
        px: 2.2,
        py: 1.55,
        mb: 2.2,
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: "flex-start", justifyContent: "space-between", mb: 1.25 }}
      >
        <Box>
          <Typography sx={{ fontSize: 33, color: "#191225", fontWeight: 700, lineHeight: 1.2 }}>
            Congrats, you&apos;ve completed all steps!
          </Typography>
          <Typography sx={{ fontSize: 15, color: "#9188A5", mt: 0.55 }}>
            Your Weana team is now set up for success
          </Typography>
        </Box>

        <Stack direction="row" spacing={0.9} sx={{ alignItems: "center", pt: 0.2 }}>
          <Stack direction="row" spacing={0.62} sx={{ alignItems: "center" }}>
            {progressNodes.map((node, index) => (
              <Stack key={node} direction="row" spacing={0.6} sx={{ alignItems: "center" }}>
                <Box
                  sx={{
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    bgcolor: "#6D35AB",
                    color: "#FFFFFF",
                    fontSize: 9,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    lineHeight: 1,
                  }}
                >
                  {node}
                </Box>

                {index < progressNodes.length - 1 && (
                  <Box
                    sx={{
                      width: 74,
                      height: 2,
                      borderRadius: 999,
                      bgcolor: "#7A52B9",
                    }}
                  />
                )}
              </Stack>
            ))}
          </Stack>
          <Typography sx={{ fontSize: 12, color: "#5D5572", fontWeight: 600 }}>
            5 / 5 Complete
          </Typography>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={1.15} sx={{ alignItems: "stretch", position: "relative" }}>
        {activeSteps.map((step, index) => (
          <Box
            key={step}
            onClick={() => onStepClick(step)}
            sx={{
              flex: 1,
              px: 2,
              py: 1.2,
              borderRadius: 2,
              border: "1px solid #EBE6F4",
              bgcolor: "#FFFFFF",
              position: "relative",
              minHeight: 90,
              cursor: step === triggerStep ? "pointer" : "default",
              ...(index === activeSteps.length - 1
                ? {
                    overflow: "hidden",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      right: 0,
                      top: 0,
                      width: "44%",
                      height: "100%",
                      background:
                        "linear-gradient(to right, rgba(255,255,255,0), rgba(246, 242, 252, 0.92))",
                      pointerEvents: "none",
                    },
                  }
                : {}),
            }}
          >
            <Stack sx={{ alignItems: "center", gap: 0.7 }}>
              <CheckCircleRoundedIcon sx={{ color: "#6D35AB", fontSize: 19 }} />
              <Typography
                sx={{
                  fontSize: 13.2,
                  color: "#2C2538",
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                {step}
              </Typography>
            </Stack>

            {index === activeSteps.length - 1 && (
              <IconButton
                onClick={onSlideNext}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 28,
                  height: 28,
                  bgcolor: "#FFFFFF",
                  border: "1px solid #ECE7F6",
                  boxShadow: "0 4px 12px rgba(44, 26, 80, 0.08)",
                  zIndex: 3,
                  "&:hover": { bgcolor: "#FFFFFF" },
                }}
              >
                <ArrowForwardIosRoundedIcon sx={{ fontSize: 14, color: "#7B7291" }} />
              </IconButton>
            )}
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}

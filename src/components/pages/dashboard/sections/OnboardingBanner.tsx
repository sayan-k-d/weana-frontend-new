"use client";

import {
  Box,
  Button,
  Collapse,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

import { ONBOARDING_STEPS } from "@/lib/constants";
import { useState } from "react";
interface OnboardingBannerProps {
  onDismiss: () => void;
}

export default function OnboardingBanner({ onDismiss }: OnboardingBannerProps) {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid #B47CDB",
        borderRadius: "16px",
        boxShadow: "0 1px 2px rgba(23, 19, 33, 0.04)",
        bgcolor: "#FFFAFF",
        p: 2,
        mb: 1.8,
      }}
    >
      {/* ── Top row: title + stepper + actions ── */}
      <Stack
        direction="row"
        style={{ alignItems: "center", justifyContent: "space-between" }}
        spacing={1.6}
      >
        {/* Title */}
        <Box>
          <Typography
            sx={{
              fontSize: 22,
              color: "#181520",
              fontWeight: 700,
              letterSpacing: "-0.01em",
            }}
          >
            Congrats, you&apos;ve completed all steps!
          </Typography>
          <Typography
            sx={{ fontSize: 12, color: "#9A98A7", mt: 0.45, fontWeight: 500 }}
          >
            Your Weana team is now set up for success
          </Typography>
        </Box>

        {/* Stepper + actions */}
        <Stack
          direction="row"
          style={{ alignItems: "center" }}
          spacing={2.6}
          sx={{ mt: 0.3 }}
        >
          {[1, 2, 3, 4].map((step) => (
            <Stack
              key={step}
              direction="row"
              style={{ alignItems: "center" }}
              spacing={1}
            >
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  bgcolor: "#512B7A",
                  color: "#fff",
                  fontSize: 8,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {step}
              </Box>
              {step < 4 && (
                <Box
                  sx={{
                    width: 70,
                    height: 2.5,
                    bgcolor: "#512B7A",
                    borderRadius: 2,
                  }}
                />
              )}
            </Stack>
          ))}

          <Typography
            sx={{ fontSize: 12, color: "#24212F", fontWeight: 600, mr: 0.7 }}
          >
            4 / 4 Complete
          </Typography>

          {/* Collapse toggle (visual only — extend with useState if needed) */}
          <Button
            onClick={() => setExpanded((prev) => !prev)}
            sx={{
              minWidth: 30,
              width: 30,
              height: 30,
              borderRadius: "50%",
              p: 0,
              bgcolor: "#F7F7FA",
              mr: 0.5,
            }}
          >
            <KeyboardArrowDownRoundedIcon
              sx={{
                fontSize: 18,
                color: "#2F2B3A",
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}
            />
          </Button>

          <Button
            variant="contained"
            onClick={onDismiss}
            sx={{
              bgcolor: "#6750A4",
              borderRadius: "999px",
              px: 3.8,
              py: 0.75,
              fontSize: 13,
              fontWeight: 600,
              boxShadow: "none",
              ml: 0.5,
            }}
          >
            Dismiss
          </Button>
        </Stack>
      </Stack>

      {/* ── Completed task cards ── */}
      <Collapse in={expanded}>
        <Divider sx={{ my: 2 }} />
        <Box
          sx={{
            mt: 2,
            display: "grid",
            gridTemplateColumns: "repeat(3, 324px) 1fr 36px",
            columnGap: 3.6,
            alignItems: "center",
          }}
        >
          {ONBOARDING_STEPS.map(({ step, task }) => (
            <Paper
              key={task}
              elevation={0}
              sx={{
                border: "1px solid #ECEAF4",
                borderRadius: 1.5,
                p: 3.65,
                textAlign: "center",
                width: 324,
                justifySelf: "start",
              }}
            >
              <Box
                sx={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  bgcolor: "#512B7A",
                  color: "#fff",
                  fontSize: 12,
                  mx: "auto",
                  mb: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✓
              </Box>
              <Typography
                sx={{ fontSize: 14, fontWeight: 600, color: "#24212F" }}
              >
                {task}
              </Typography>
            </Paper>
          ))}

          {/* Scroll arrow */}
          <Box
            sx={{
              gridColumn: 5,
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "1px solid #E9E6F1",
              bgcolor: "#FFFFFF",
              color: "#7A7590",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(32, 26, 48, 0.08)",
              fontSize: 18,
              justifySelf: "end",
              cursor: "pointer",
            }}
          >
            ›
          </Box>
        </Box>
      </Collapse>
    </Paper>
  );
}

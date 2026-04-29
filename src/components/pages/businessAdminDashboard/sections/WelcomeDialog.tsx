"use client";

import { Box, Button, Dialog, Divider, Stack, Typography } from "@mui/material";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ControlPointDuplicateOutlinedIcon from "@mui/icons-material/ControlPointDuplicateOutlined";

import GoalChoice from "@/components/ui/metrics/GoalChoice";
import { GOAL_OPTIONS } from "@/lib/constants";

interface WelcomeDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function WelcomeDialog({ open, onClose }: WelcomeDialogProps) {
  return (
    <Dialog
      open={open}
      maxWidth={false}
      // Prevent accidental close on backdrop click
      onClose={(_, reason) => {
        if (reason === "backdropClick") return;
        onClose();
      }}
      slotProps={{
        paper: {
          sx: {
            width: "min(900px, calc(100vw - 52px))",
            borderRadius: "26px",
            m: 2,
            p: 0,
            overflow: "hidden",
            boxShadow: "0 18px 56px rgba(19, 15, 30, 0.22)",
          },
        },
      }}
    >
      {/* ── Body ── */}
      <Box
        sx={{
          px: { xs: 2.5, md: 3.2 },
          pt: { xs: 2.2, md: 2.8 },
          pb: 2.2,
          bgcolor: "#FFFFFF",
        }}
      >
        {/* Header */}
        <Stack spacing={0.7} sx={{ marginBottom: 2.4, alignItems: "center" }}>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              bgcolor: "#4E2A84",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 6px 14px rgba(108, 62, 178, 0.25)",
            }}
          >
            <RocketLaunchRoundedIcon sx={{ fontSize: 21 }} />
          </Box>

          <Typography
            sx={{
              fontSize: { xs: 29, md: 40 },
              fontWeight: 700,
              color: "#4E2A84",
              lineHeight: 1.05,
            }}
          >
            Welcome aboard
          </Typography>

          <Typography
            sx={{ fontSize: 11.5, color: "#8F8B9E", fontWeight: 500 }}
          >
            Help us to understand you better so we can personalize your
            experience.
          </Typography>
        </Stack>

        {/* Question label */}
        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: "center", marginBottom: 1.2 }}
        >
          <Box
            sx={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              bgcolor: "#6F42B4",
              color: "#fff",
              fontSize: 12,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            1
          </Box>
          <Typography
            sx={{
              fontSize: { xs: 15, md: 18 },
              color: "#1E1A28",
              fontWeight: 700,
            }}
          >
            What is your primary goal for using our platform?
          </Typography>
        </Stack>

        {/* Goal options grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 1,
          }}
        >
          {GOAL_OPTIONS.map((goal) => (
            <GoalChoice key={goal.label} icon={goal.icon} label={goal.label} />
          ))}

          {/* "Other" free-text option */}
          <Box
            component="label"
            sx={{
              border: "1px solid #DDDBE7",
              borderRadius: 1.5,
              height: 54,
              px: 1.8,
              display: "flex",
              alignItems: "center",
              gap: 1.1,
              gridColumn: "1 / -1",
              bgcolor: "#FFFFFF",
              cursor: "text",
            }}
          >
            <ControlPointDuplicateOutlinedIcon
              sx={{ fontSize: 19, color: "#4E2A84" }}
            />
            <Typography
              sx={{
                fontSize: 11.5,
                color: "#4B2C70",
                fontWeight: 600,
                mr: 1.2,
              }}
            >
              Other
            </Typography>
            <Box
              component="input"
              placeholder="Please specify..."
              sx={{
                flex: 1,
                height: 34,
                borderRadius: 1,
                bgcolor: "#F5F5F8",
                border: "1px solid #F0F0F5",
                px: 1.4,
                color: "#1E1A28",
                fontSize: 10.5,
                outline: "none",
                fontFamily: "inherit",
                "&::placeholder": { color: "#A6A2B3" },
              }}
            />
          </Box>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "#ECEBF2" }} />

      {/* ── Footer actions ── */}
      <Box
        sx={{
          px: { xs: 2.5, md: 3.2 },
          py: 1.7,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: "#FFFFFF",
        }}
      >
        <Typography sx={{ fontSize: 9.7, color: "#8E8A9E" }}>
          You can always update your goals later in your profile settings
        </Typography>

        <Stack direction="row" spacing={1.2}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              borderRadius: "999px",
              px: 2.2,
              py: 0.55,
              fontSize: 14,
              color: "#5A3B8A",
              borderColor: "#DAD7E4",
              bgcolor: "#FFFFFF",
            }}
          >
            Skip for now
          </Button>

          <Button
            variant="contained"
            sx={{
              borderRadius: "999px",
              px: 2.6,
              py: 0.55,
              fontSize: 14,
              bgcolor: "#6C3EB2",
              boxShadow: "0 6px 16px rgba(108, 62, 178, 0.3)",
            }}
          >
            Continue <ArrowForwardRoundedIcon sx={{ fontSize: 18, ml: 0.6 }} />
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
}

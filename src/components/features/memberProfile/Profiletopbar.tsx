"use client";

import {
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";

interface ProfileTopBarProps {
  memberName: string;
  memberEmail: string;
  memberAvatarUrl?: string;
  cardLabel?: string;
  initials?: string;
}

export function ProfileTopBar({
  memberName,
  memberEmail,
  memberAvatarUrl,
  cardLabel = "Default",
  initials = "SD",
}: ProfileTopBarProps) {
  return (
    <Box
      sx={{
        my: 2,
        display: "flex",
        alignItems: "center",
        px: 2.5,
        gap: 2,
        flexShrink: 0,
      }}
    >
      {/* Back arrow */}
      <IconButton
        size="small"
        sx={{ color: "#9896A6", "&:hover": { bgcolor: "#F3F1FA" } }}
      >
        <ArrowBackIosNewRoundedIcon sx={{ fontSize: 14 }} />
      </IconButton>

      {/* Member avatar + info */}
      <Stack
        direction="row"
        spacing={1}
        sx={{ flexShrink: 0, alignItems: "center" }}
      >
        <Avatar
          src={memberAvatarUrl}
          sx={{ width: 60, height: 60, border: "2px solid #E8E6F0" }}
        />
        <Box>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 700,
              color: "#1E1A28",
              lineHeight: 1.2,
            }}
          >
            {memberName}
          </Typography>
          <Typography sx={{ fontSize: 11, color: "#9896A6", lineHeight: 1.2 }}>
            {memberEmail}
          </Typography>
        </Box>
        <KeyboardArrowDownRoundedIcon sx={{ fontSize: 18, color: "#9896A6" }} />
      </Stack>

      {/* Spacer */}
      <Box sx={{ flex: 1 }} />

      {/* Right side controls */}
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Paper
          elevation={1}
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            borderRadius: 50,
            border: "1px solid #E2E2E2",
            py: 0.5,
            pr: 2,
            pl: 1,
          }}
        >
          {/* Card selector */}
          <Stack
            direction="row"
            spacing={0.8}
            sx={{
              width: "150px",
              px: 1.4,
              py: 0.5,
              cursor: "pointer",
              alignItems: "center",
              justifyContent: "space-between",
              //   "&:hover": { bgcolor: "#F3F1FA" },
            }}
          >
            <Box sx={{ display: "flex", alignContent: "center", gap: 1 }}>
              <Avatar src={memberAvatarUrl} sx={{ width: 24, height: 24 }} />
              <Typography
                sx={{ fontSize: 13, fontWeight: 600, color: "#1E1A28" }}
              >
                {memberName}
              </Typography>
            </Box>
            <KeyboardArrowDownRoundedIcon
              sx={{ fontSize: 16, color: "#9896A6" }}
            />
          </Stack>
          <Box
            sx={{
              width: "1px",
              mx: 1,
              height: 22,
              bgcolor: "#D1D0DA",
              flexShrink: 0,
            }}
          />
          {/* Default badge */}
          <Box
            sx={{
              px: 1.4,
              py: 0.4,
              border: "1px solid #E8E6F0",
              borderRadius: "999px",
              bgcolor: "#FFFFFF",
            }}
          >
            <Typography
              sx={{ fontSize: 12, fontWeight: 500, color: "#6B6880" }}
            >
              {cardLabel}
            </Typography>
          </Box>
        </Paper>
        {/* Initials circle */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* LEFT SIDE */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
            <Box
              sx={{
                borderRadius: 50,
                border: "1px solid #C5C5C5",
                px: 1,
                py: 0.75,
                display: "flex",
                alignItems: "center",
                maxWidth: 90,
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid white",
                    backgroundColor: "#6B3FA0",
                  }}
                >
                  <Typography sx={{ color: "#fff", fontSize: 8 }}>
                    {initials}
                  </Typography>
                </Box>
              </Box>

              <AddRoundedIcon
                sx={{
                  fontSize: 18,
                  ml: 0.5,
                  width: 24,
                  height: 24,
                  backgroundColor: "#CFCFCF",
                  borderRadius: "50%",
                  p: 0.3,
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Lock */}
        <Box
          sx={{
            borderRadius: 50,
            border: "1px solid #C5C5C5",
            px: 2,
            py: 0.75,
            display: "flex",
            alignItems: "center",
            maxWidth: 90,
          }}
        >
          <LockOpenOutlinedIcon
            sx={{ fontSize: 16, color: "#6B6880", width: 24, height: 24 }}
          />
        </Box>

        {/* More */}
        <IconButton size="small" sx={{ color: "#6B6880" }}>
          <MoreVertRoundedIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Stack>
    </Box>
  );
}

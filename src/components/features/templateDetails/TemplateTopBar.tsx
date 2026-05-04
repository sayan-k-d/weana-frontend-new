"use client";

import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";

interface TemplateTopBarProps {
  memberName: string;
  memberEmail: string;
  memberAvatarUrl?: string;
  onBack?: () => void;
  onAddTemplate?: () => void;
  onMoreOptions?: () => void;
}

export function TemplateTopBar({
  memberName,
  memberEmail,
  memberAvatarUrl,
  onBack,
  onAddTemplate,
  onMoreOptions,
}: TemplateTopBarProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        px: 2.5,
        py: 1.5,
        gap: 1.5,
        flexShrink: 0,
        bgcolor: "transparent",
      }}
    >
      {/* ── Back arrow ── */}
      <IconButton
        size="small"
        onClick={onBack}
        sx={{
          color: "#9896A6",
          "&:hover": { bgcolor: "#F3F1FA" },
          flexShrink: 0,
        }}
      >
        <ArrowBackIosNewRoundedIcon sx={{ fontSize: 14 }} />
      </IconButton>

      {/* ── Member avatar + name + chevron ── */}
      <Stack
        direction="row"
        spacing={1.2}
        sx={{ alignItems: "center", flexShrink: 0 }}
      >
        <Avatar
          src={memberAvatarUrl}
          sx={{ width: 44, height: 44, border: "2px solid #E8E6F0" }}
        />
        <Box>
          <Typography
            sx={{
              fontSize: 13.5,
              fontWeight: 700,
              color: "#1E1A28",
              lineHeight: 1.2,
            }}
          >
            {memberName}
          </Typography>
          <Typography sx={{ fontSize: 11, color: "#9896A6", lineHeight: 1.3 }}>
            {memberEmail}
          </Typography>
        </Box>
        <KeyboardArrowDownRoundedIcon sx={{ fontSize: 18, color: "#9896A6" }} />
      </Stack>

      {/* ── Spacer ── */}
      <Box sx={{ flex: 1 }} />

      {/* ── Right: Add Templates + kebab ── */}
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Button
          variant="contained"
          disableElevation
          startIcon={<AddRoundedIcon sx={{ fontSize: "15px !important" }} />}
          onClick={onAddTemplate}
          sx={{
            fontSize: 13,
            fontWeight: 700,
            textTransform: "none",
            borderRadius: "999px",
            px: 2.2,
            py: 0.9,
            bgcolor: "#6B3FA0",
            color: "#fff",
            "&:hover": { bgcolor: "#5A3490" },
          }}
        >
          Add Templates +
        </Button>

        <IconButton
          size="small"
          onClick={onMoreOptions}
          sx={{ color: "#6B6880" }}
        >
          <MoreVertRoundedIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Stack>
    </Box>
  );
}

"use client";

import { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";

interface TeamDetailTopBarProps {
  teamName: string;
  onBack: () => void;
  onViewTeamMembers: () => void;
  onRenameTeam?: () => void;
  onDeleteTeam?: () => void;
}

export function TeamDetailTopBar({
  teamName,
  onBack,
  onViewTeamMembers,
  onRenameTeam,
  onDeleteTeam,
}: TeamDetailTopBarProps) {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [nameMenuAnchor, setNameMenuAnchor] = useState<null | HTMLElement>(
    null,
  );

  return (
    <Box
      sx={{
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2.5,
        bgcolor: "#F3F2F6",
        borderBottom: "1px solid #EAE8F0",
        flexShrink: 0,
      }}
    >
      {/* ── Left: back + team name ── */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <IconButton
          onClick={onBack}
          size="small"
          sx={{ color: "#5C5874", mr: 0.5 }}
        >
          <ArrowBackIosNewRoundedIcon sx={{ fontSize: 16 }} />
        </IconButton>

        <Box sx={{ width: "1px", height: 20, bgcolor: "#D8D4EC", mx: 0.5 }} />

        {/* Team name — clickable to open rename/switch dropdown */}
        <Button
          endIcon={
            <KeyboardArrowDownRoundedIcon
              sx={{ fontSize: "18px !important", color: "#5B2D9E" }}
            />
          }
          onClick={(e) => setNameMenuAnchor(e.currentTarget)}
          disableRipple
          sx={{
            fontSize: 17,
            fontWeight: 700,
            color: "#5B2D9E",
            textTransform: "none",
            letterSpacing: "-0.01em",
            px: 0.5,
            "&:hover": { bgcolor: "transparent", opacity: 0.85 },
          }}
        >
          {teamName}
        </Button>

        <Menu
          anchorEl={nameMenuAnchor}
          open={Boolean(nameMenuAnchor)}
          onClose={() => setNameMenuAnchor(null)}
          slotProps={{
            paper: {
              sx: {
                borderRadius: "12px",
                border: "1px solid #EAE8F0",
                boxShadow: "0 8px 24px rgba(19,15,30,0.10)",
                minWidth: 180,
                mt: 0.5,
              },
            },
          }}
        >
          <MenuItem
            onClick={() => {
              onRenameTeam?.();
              setNameMenuAnchor(null);
            }}
            sx={{ fontSize: 13, color: "#3D3A4A", py: 1 }}
          >
            Rename team
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />
          <MenuItem
            onClick={() => setNameMenuAnchor(null)}
            sx={{ fontSize: 13, color: "#3D3A4A", py: 1 }}
          >
            Switch team
          </MenuItem>
        </Menu>
      </Box>

      {/* ── Right: View Team Members + kebab ── */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Button
          variant="contained"
          disableElevation
          startIcon={
            <PeopleOutlineRoundedIcon sx={{ fontSize: "16px !important" }} />
          }
          onClick={onViewTeamMembers}
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
          View Team Members
        </Button>

        <IconButton
          size="small"
          onClick={(e) => setMenuAnchor(e.currentTarget)}
          sx={{
            color: "#5C5874",
            border: "1px solid #E8E6F0",
            borderRadius: "8px",
            p: 0.6,
          }}
        >
          <MoreVertRoundedIcon sx={{ fontSize: 18 }} />
        </IconButton>

        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={() => setMenuAnchor(null)}
          slotProps={{
            paper: {
              sx: {
                borderRadius: "12px",
                border: "1px solid #EAE8F0",
                boxShadow: "0 8px 24px rgba(19,15,30,0.10)",
                minWidth: 160,
                mt: 0.5,
              },
            },
          }}
        >
          <MenuItem
            onClick={() => {
              onRenameTeam?.();
              setMenuAnchor(null);
            }}
            sx={{ fontSize: 13, color: "#3D3A4A", py: 1 }}
          >
            Rename team
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />
          <MenuItem
            onClick={() => {
              onDeleteTeam?.();
              setMenuAnchor(null);
            }}
            sx={{ fontSize: 13, color: "#E05858", py: 1 }}
          >
            Delete team
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}

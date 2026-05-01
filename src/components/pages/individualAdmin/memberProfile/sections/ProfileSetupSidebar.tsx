"use client";

import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import QrCode2RoundedIcon from "@mui/icons-material/QrCode2Rounded";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import ViewSidebarRoundedIcon from "@mui/icons-material/ViewSidebarRounded";
import WallpaperRoundedIcon from "@mui/icons-material/WallpaperRounded";
import { Box, Typography } from "@mui/material";

const sectionItems = [
  { label: "About", icon: <ViewSidebarRoundedIcon sx={{ fontSize: 16 }} />, active: true },
  { label: "Links", icon: <LinkRoundedIcon sx={{ fontSize: 16 }} /> },
  { label: "Lead Capture Form", icon: <SellOutlinedIcon sx={{ fontSize: 16 }} /> },
  { label: "Follow Up Email", icon: <MailOutlineRoundedIcon sx={{ fontSize: 16 }} /> },
  { label: "QR Code", icon: <QrCode2RoundedIcon sx={{ fontSize: 16 }} /> },
  { label: "Virtual Background", icon: <WallpaperRoundedIcon sx={{ fontSize: 16 }} /> },
  { label: "Email Signature", icon: <MailOutlineRoundedIcon sx={{ fontSize: 16 }} /> },
  { label: "Accessories", icon: <StarBorderRoundedIcon sx={{ fontSize: 16 }} /> },
];

export default function ProfileSetupSidebar() {
  return (
    <Box
      sx={{
        width: 210,
        borderRight: "1px solid #E7E3EE",
        px: 1.6,
        py: 2,
        bgcolor: "#FFFFFF",
      }}
    >
      <Typography sx={{ fontSize: 10, color: "#736D82", mb: 0.9, fontWeight: 600 }}>
        CONTENT
      </Typography>

      {sectionItems.map((item) => (
        <Box
          key={item.label}
          sx={{
            px: 1,
            py: 0.85,
            mb: 0.25,
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            gap: 0.8,
            color: item.active ? "#5F33A4" : "#3E384A",
            bgcolor: item.active ? "#ECE3FD" : "transparent",
            border: item.active ? "1px solid #D7C9F8" : "1px solid transparent",
          }}
        >
          {item.icon}
          <Typography sx={{ fontSize: 13, fontWeight: item.active ? 600 : 500 }}>
            {item.label}
          </Typography>
        </Box>
      ))}

      <Typography sx={{ fontSize: 12, color: "#2A2437", mt: 8.5 }}>
        Last Login : Apr 13, 2026
      </Typography>
    </Box>
  );
}

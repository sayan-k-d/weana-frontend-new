"use client";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import XIcon from "@mui/icons-material/X";
import { Box, Button, Dialog, IconButton, Stack, Typography } from "@mui/material";
import Image from "next/image";

type MobileAppModalProps = {
  open: boolean;
  onClose: () => void;
  profileLink: string;
};

const shareItems = [
  {
    label: "Email",
    icon: <EmailRoundedIcon sx={{ color: "#FFFFFF", fontSize: 16 }} />,
    iconBg: "#4DB4F8",
  },
  {
    label: "Whatsapp",
    icon: <WhatsAppIcon sx={{ color: "#FFFFFF", fontSize: 16 }} />,
    iconBg: "#25D366",
  },
  {
    label: "Twitter/X",
    icon: <XIcon sx={{ color: "#FFFFFF", fontSize: 15 }} />,
    iconBg: "#111111",
  },
  {
    label: "LinkedIn",
    icon: <LinkedInIcon sx={{ color: "#FFFFFF", fontSize: 15 }} />,
    iconBg: "#0A66C2",
  },
];

export default function MobileAppModal({
  open,
  onClose,
  profileLink,
}: MobileAppModalProps) {
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(profileLink);
    } catch {
      // no-op if clipboard is unavailable
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      slotProps={{
        paper: {
          sx: {
            width: 640,
            borderRadius: 4,
            p: 3,
            bgcolor: "#FFFFFF",
            boxShadow: "0 18px 50px rgba(20, 17, 28, 0.25)",
            overflow: "visible",
          },
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 14,
          top: 10,
          color: "#A09AAD",
          zIndex: 5,
        }}
      >
        <CloseRoundedIcon />
      </IconButton>

      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "flex-start", pr: 4.8 }}
      >
        <Box>
          <Typography sx={{ fontSize: 24, fontWeight: 700, color: "#1F1A2A", mb: 0.8 }}>
            Scan to get the mobile app
          </Typography>
          <Typography sx={{ fontSize: 14, color: "#8A849A", lineHeight: 1.35 }}>
            Download the weana app to share and edit you digital
            <br />
            business card on the go
          </Typography>
        </Box>

        <Box
          sx={{
            width: 104,
            height: 104,
            borderRadius: 1.2,
            border: "1px solid #E5E1EF",
            p: 0.65,
            bgcolor: "#FFFFFF",
            boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
            position: "relative",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <Image
            src="/images/Frame-531.png"
            alt="QR code"
            fill
            sizes="100px"
            style={{ objectFit: "cover", borderRadius: 6 }}
          />
        </Box>
      </Stack>

      <Box sx={{ borderTop: "1px solid #ECE8F2", my: 2.3 }} />

      <Typography sx={{ fontSize: 24, fontWeight: 700, color: "#1F1A2A", mb: 1.4 }}>
        Copy Profile Link
      </Typography>
      <Stack direction="row" spacing={1.3} sx={{ alignItems: "center" }}>
        <Box
          sx={{
            flex: 1,
            px: 1.6,
            py: 1.25,
            borderRadius: 1.3,
            border: "1px solid #E8E3EF",
            color: "#A39CB1",
            fontSize: 13.5,
            bgcolor: "#FBFAFD",
          }}
        >
          {profileLink}
        </Box>
        <Button
          onClick={handleCopyLink}
          startIcon={<ContentCopyRoundedIcon sx={{ fontSize: 16 }} />}
          sx={{
            textTransform: "none",
            color: "#2995FF",
            fontWeight: 600,
            minWidth: "auto",
            px: 0.5,
          }}
        >
          Copy Link
        </Button>
      </Stack>

      <Box sx={{ borderTop: "1px solid #ECE8F2", my: 2.3 }} />

      <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#1F1A2A", mb: 1.2 }}>
        Share Profile
      </Typography>

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
        {shareItems.map((item) => (
          <Box
            key={item.label}
            sx={{
              border: "1px solid #ECE8F2",
              bgcolor: "#FAF9FC",
              borderRadius: 1.2,
              px: 1.15,
              py: 0.9,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Stack direction="row" spacing={0.8} sx={{ alignItems: "center" }}>
              <Box
                sx={{
                  width: 22,
                  height: 22,
                  borderRadius: 0.6,
                  bgcolor: item.iconBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </Box>
              <Typography sx={{ fontSize: 12.5, color: "#1F1A2A", fontWeight: 500 }}>
                {item.label}
              </Typography>
            </Stack>
            <OpenInNewRoundedIcon sx={{ fontSize: 16, color: "#A7A0B5" }} />
          </Box>
        ))}
      </Box>
    </Dialog>
  );
}

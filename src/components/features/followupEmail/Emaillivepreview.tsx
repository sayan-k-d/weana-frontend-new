"use client";

import { Box, Typography, Stack } from "@mui/material";
import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded";
import type { FollowUpEmailFormData } from "@/components/pages/members/constants/followupEmail";

interface EmailLivePreviewProps {
  form: FollowUpEmailFormData;
  senderName?: string;
  senderAvatarUrl?: string;
}

/**
 * Mini email client preview shown in the right panel of the Follow Up Email section.
 * Matches the screenshot: From / Subject / Message fields rendered as a compact
 * email viewer card, with a teal wave decoration at the top-right.
 */
export function EmailLivePreview({
  form,
  senderName = "Diago",
  senderAvatarUrl,
}: EmailLivePreviewProps) {
  // Resolve the subject for display — strip emoji prefix for the field label area
  const displaySubject =
    form.subject || "👋 {Contact's First Name} <> {Weana User's Name}";

  // Render message with link-styled "digital business card" phrase
  const renderMessage = (msg: string) => {
    const linkPhrase = "digital business card";
    const parts = msg.split(linkPhrase);
    return parts.flatMap((part, i) => {
      const nodes: React.ReactNode[] = [<span key={`p-${i}`}>{part}</span>];
      if (i < parts.length - 1) {
        nodes.push(
          <Box
            key={`link-${i}`}
            component="span"
            sx={{
              color: "#2563EB",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            {linkPhrase}
          </Box>,
        );
      }
      return nodes;
    });
  };

  return (
    <Box
      sx={{
        width: 220,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 2,
      }}
    >
      {/* "View Card" link — mirrors "Add More" on the card preview */}
      <Stack
        direction="row"
        spacing={0.8}
        sx={{
          mb: 1.8,
          alignItems: "center",
          justifyContent: "center",
          width: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 600,
            color: "#5B2D9E",
            cursor: "pointer",
          }}
        >
          View Card
        </Typography>
        <IosShareRoundedIcon sx={{ fontSize: 14, color: "#5B2D9E" }} />
      </Stack>

      {/* Email viewer card */}
      <Box
        sx={{
          width: "100%",
          minHeight: 300,
          borderRadius: "16px",
          border: "1px solid #E8E6F0",
          boxShadow: "0 4px 20px rgba(19,15,30,0.08)",
          bgcolor: "#FFFFFF",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Decorative teal wave / blob — top-right corner */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 90,
            height: 70,
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <svg
            viewBox="0 0 90 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", height: "100%" }}
          >
            <ellipse
              cx="75"
              cy="10"
              rx="55"
              ry="55"
              fill="#B2EBE0"
              fillOpacity="0.55"
            />
            <ellipse
              cx="85"
              cy="30"
              rx="35"
              ry="35"
              fill="#80CBC4"
              fillOpacity="0.35"
            />
          </svg>
        </Box>

        {/* Email fields */}
        <Box sx={{ px: 2, pt: 2, pb: 2, position: "relative", zIndex: 1 }}>
          {/* From */}
          <Box sx={{ mb: 1.2 }}>
            <Typography
              sx={{
                fontSize: 9.5,
                fontWeight: 700,
                color: "#A09EB8",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                mb: 0.2,
              }}
            >
              From
            </Typography>
            <Typography
              sx={{ fontSize: 12, fontWeight: 600, color: "#1E1A28" }}
            >
              {senderName}
            </Typography>
          </Box>

          {/* Thin divider */}
          <Box sx={{ height: "1px", bgcolor: "#F0EEF8", mb: 1.2 }} />

          {/* Subject */}
          <Box sx={{ mb: 1.2 }}>
            <Typography
              sx={{
                fontSize: 9.5,
                fontWeight: 700,
                color: "#A09EB8",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                mb: 0.2,
              }}
            >
              Subject
            </Typography>
            <Typography
              sx={{
                fontSize: 11.5,
                color: "#3D3A4A",
                lineHeight: 1.45,
                wordBreak: "break-word",
              }}
            >
              {displaySubject}
            </Typography>
          </Box>

          {/* Thin divider */}
          <Box sx={{ height: "1px", bgcolor: "#F0EEF8", mb: 1.2 }} />

          {/* Message */}
          <Box>
            <Typography
              sx={{
                fontSize: 9.5,
                fontWeight: 700,
                color: "#A09EB8",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                mb: 0.5,
              }}
            >
              Message
            </Typography>
            <Typography
              sx={{
                fontSize: 11,
                color: "#5C5874",
                lineHeight: 1.8,
                wordBreak: "break-word",
              }}
            >
              {renderMessage(form.message)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

"use client";

import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded";
import type { MemberProfileFormData } from "@/types";

interface CardLivePreviewProps {
  form: MemberProfileFormData;
}

export function CardLivePreview({ form }: CardLivePreviewProps) {
  const bgColor = form.cardTheme !== "none" ? form.cardTheme : "#1E1A28";

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
      {/* Title */}
      <Typography
        sx={{
          fontSize: 13,
          fontWeight: 600,
          color: "#3D3A4A",
          mb: 1.2,
          alignSelf: "flex-start",
          width: 1,
          textAlign: "center",
        }}
      >
        Card live preview
      </Typography>

      {/* Add More link */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          mb: 1.5,
          alignSelf: "flex-start",
          alignItems: "center",
          width: 1,
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 600,
            color: "#5B2D9E",
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          Add More
        </Typography>
        <IosShareRoundedIcon sx={{ fontSize: 15, color: "#5B2D9E" }} />
      </Stack>

      {/* Card preview */}
      <Box
        sx={{
          width: "100%",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid #E8E6F0",
          boxShadow: "0 4px 20px rgba(19,15,30,0.10)",
          bgcolor: "#FFFFFF",
        }}
      >
        {/* Cover / header area */}
        <Box
          sx={{
            height: 200,
            maxHeight: 200,
            bgcolor: bgColor,
            position: "relative",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            overflow: "hidden",
            pb: 0,
          }}
        >
          {form.profilePictureUrl && (
            <Box
              component="img"
              src={form.profilePictureUrl}
              alt={form.name}
              sx={{
                display: "block",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top",
                flexShrink: 0,
              }}
            />
          )}
        </Box>

        {/* Card body */}
        <Box sx={{ px: 2, py: 1.8, textAlign: "center" }}>
          <Typography
            sx={{ fontSize: 15, fontWeight: 700, color: "#1E1A28", mb: 0.3 }}
          >
            {form.name || "Name"}
          </Typography>
          {form.jobTitle && (
            <Typography sx={{ fontSize: 11.5, color: "#6B6880", mb: 0.2 }}>
              {form.jobTitle}
            </Typography>
          )}
          {form.company && (
            <Typography sx={{ fontSize: 11.5, color: "#9896A6" }}>
              {form.company}
            </Typography>
          )}

          <Button
            fullWidth
            disableElevation
            variant="contained"
            sx={{
              mt: 1.8,
              bgcolor: "#6B3FA0",
              color: "#fff",
              borderRadius: "999px",
              py: 0.8,
              fontSize: 13,
              fontWeight: 600,
              textTransform: "none",
              "&:hover": { bgcolor: "#5A3490" },
            }}
          >
            Save Contact
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

"use client";

import {
  Avatar,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded";
import type { MemberProfileFormData } from "@/types";
import type { LeadCaptureFormData } from "../leadcapture";

interface CardLivePreviewProps {
  form: MemberProfileFormData;
  /** When provided, shows the lead-capture form overlay on top of the card. */
  leadCaptureForm?: LeadCaptureFormData;
}

// Default fields always shown in the lead capture form
const DEFAULT_FIELDS = [
  { label: "Email" },
  { label: "Full Name" },
  { label: "Phone Number" },
  { label: "Job Title" },
  { label: "Company Name" },
  { label: "Note" },
];

export function CardLivePreview({
  form,
  leadCaptureForm,
}: CardLivePreviewProps) {
  const bgColor = form.cardTheme !== "none" ? form.cardTheme : "#1E1A28";
  const showLeadCapture = Boolean(leadCaptureForm);

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

      {/* Card preview — fixed height so the overlay is clipped inside */}
      <Box
        sx={{
          width: "100%",
          // Fixed height keeps the overlay from expanding the card
          height: showLeadCapture ? 340 : "auto",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid #E8E6F0",
          boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
          bgcolor: "#FFFFFF",
          position: "relative",
          flexShrink: 0,
        }}
      >
        {/* Cover / header area */}
        <Box
          sx={{
            height: 200,
            bgcolor: bgColor,
            position: "relative",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            overflow: "hidden",
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

        {/* ── Lead Capture Overlay ─────────────────────────────────────────── */}
        {showLeadCapture && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {/* Form sheet — fills remaining height below the photo, scrollable */}
            <Box
              sx={{
                width: "100%",
                // Take up remaining space below the 160px photo
                height: "calc(100% - 100px)",
                bgcolor: "#FFFFFF",
                borderRadius: "14px 14px 0 0",
                boxShadow: "0 -4px 20px rgba(19,15,30,0.12)",
                px: 1.8,
                pt: 1.8,
                pb: 1.5,
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
              }}
            >
              {/* Header text */}
              <Typography
                sx={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  color: "#1E1A28",
                  mb: 1.2,
                  textAlign: "center",
                }}
              >
                {leadCaptureForm?.header || "Share your info back with..."}
              </Typography>

              {/* Default fields */}
              <Stack spacing={0.5} sx={{ mb: 1, flex: 1 }}>
                {DEFAULT_FIELDS.map((field) => (
                  <Box
                    key={field.label}
                    sx={{
                      borderRadius: "5px",
                      display: "flex",
                      alignItems: "center",
                      px: 1,
                    }}
                  >
                    <TextField
                      id={field.label}
                      label={field.label}
                      variant="outlined"
                      size="small"
                      sx={{ fontSize: 9, color: "#9896A6", mb: 1 }}
                    />
                  </Box>
                ))}

                {/* Custom fields from form */}
                {leadCaptureForm?.customFields?.map((cf) => (
                  <Box
                    key={cf.id}
                    sx={{
                      borderRadius: "5px",
                      display: "flex",
                      alignItems: "center",
                      px: 1,
                    }}
                  >
                    <TextField
                      id={cf.label}
                      label={cf.label}
                      variant="outlined"
                      size="small"
                      sx={{ fontSize: 9, color: "#9896A6", mb: 2 }}
                    />
                  </Box>
                ))}
              </Stack>

              {/* Save Contact button */}
              <Button
                fullWidth
                disableElevation
                variant="contained"
                sx={{
                  mt: 0.8,
                  bgcolor: "#6B3FA0",
                  color: "#fff",
                  borderRadius: "999px",
                  py: 0.6,
                  fontSize: 10.5,
                  fontWeight: 700,
                  textTransform: "none",
                  "&:hover": { bgcolor: "#5A3490" },
                }}
              >
                {leadCaptureForm?.connectButtonText || "Save Contact"}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

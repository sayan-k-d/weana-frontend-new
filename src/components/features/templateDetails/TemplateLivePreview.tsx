"use client";

import { Box, Button, Typography } from "@mui/material";
import type { MemberProfileFormData } from "@/types";
import type { LeadCaptureFormData } from "@/components/features/leadcapture";

interface TemplateLivePreviewProps {
  form: MemberProfileFormData;
  leadCaptureForm?: LeadCaptureFormData;
}

const DEFAULT_FIELDS = [
  { label: "Email" },
  { label: "Full Name" },
  { label: "Phone Number" },
  { label: "Job Title" },
  { label: "Company Name" },
  { label: "Note" },
];

export function TemplateLivePreview({
  form,
  leadCaptureForm,
}: TemplateLivePreviewProps) {
  const bgColor = form.cardTheme !== "none" ? form.cardTheme : "#1E1A28";
  const showLeadCapture = Boolean(leadCaptureForm);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 2,
      }}
    >
      {/* Label */}
      <Typography
        sx={{
          fontSize: 13,
          fontWeight: 600,
          color: "#3D3A4A",
          mb: 2,
          textAlign: "center",
          width: 1,
        }}
      >
        Template live preview
      </Typography>

      {/* Card */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 240,
          height: showLeadCapture ? 360 : "auto",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid #E8E6F0",
          boxShadow: "0 4px 20px rgba(19,15,30,0.10)",
          bgcolor: "#FFFFFF",
          position: "relative",
        }}
      >
        {/* Cover */}
        <Box
          sx={{
            height: 200,
            bgcolor: bgColor,
            overflow: "hidden",
            position: "relative",
          }}
        >
          {form.profilePictureUrl && (
            <Box
              component="img"
              src={form.profilePictureUrl}
              alt={form.name}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top",
                display: "block",
              }}
            />
          )}
        </Box>

        {/* Body */}
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

        {/* Lead capture overlay */}
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
            <Box
              sx={{
                width: "100%",
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

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.6,
                  mb: 1,
                  flex: 1,
                }}
              >
                {DEFAULT_FIELDS.map((f) => (
                  <Box
                    key={f.label}
                    sx={{
                      height: 22,
                      border: "1px solid #E2DFF0",
                      borderRadius: "5px",
                      display: "flex",
                      alignItems: "center",
                      px: 1,
                    }}
                  >
                    <Typography sx={{ fontSize: 9.5, color: "#9896A6" }}>
                      {f.label}
                    </Typography>
                  </Box>
                ))}
              </Box>

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

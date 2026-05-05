"use client";

import { useEffect, useRef } from "react";
import { Box, Button, Typography, Stack } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import type { EmailSignatureFormData } from "@/components/pages/businessAdminDashboard/members/constants/emailSignature";

// ── Canvas QR ─────────────────────────────────────────────────────────────────
function SignatureQRCanvas({ size = 64 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cancelled = false;

    const render = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      try {
        const QRCode = (await import("qrcode")).default;
        await QRCode.toCanvas(canvas, "https://weana.app", {
          width: size,
          margin: 1,
          color: { dark: "#000000", light: "#FFFFFF" },
        });
      } catch {
        drawPlaceholder(canvas, size);
      }
    };

    if (!cancelled) render();
    return () => {
      cancelled = true;
    };
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{ display: "block", width: size, height: size }}
    />
  );
}

function drawPlaceholder(canvas: HTMLCanvasElement, size: number) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, size, size);
  const cells = 7;
  const cell = size / cells;
  ctx.fillStyle = "#000000";
  const pattern = [
    1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0,
    1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,
  ];
  pattern.forEach((on, i) => {
    if (!on) return;
    const c = i % cells;
    const r = Math.floor(i / cells);
    ctx.fillRect(c * cell + 0.5, r * cell + 0.5, cell - 1, cell - 1);
  });
}

// ── Preview card ──────────────────────────────────────────────────────────────
interface EmailSignaturePreviewProps {
  form: EmailSignatureFormData;
  onSaveToEmail?: () => void;
  onDownload?: () => void;
}

export function EmailSignaturePreview({
  form,
  onSaveToEmail,
  onDownload,
}: EmailSignaturePreviewProps) {
  const actionBtnSx = {
    fontSize: 12,
    fontWeight: 600,
    textTransform: "none" as const,
    borderRadius: "999px",
    px: 2,
    py: 0.9,
    color: "#3D3A4A",
    borderColor: "#D8D4EC",
    bgcolor: "#FAFAFA",
    width: "100%",
    "&:hover": { borderColor: "#6B3FA0", color: "#6B3FA0", bgcolor: "#F3F0FB" },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 1,
        width: "100%",
        gap: 1.5,
      }}
    >
      {/* ── Signature card ── */}
      <Box
        sx={{
          width: "100%",
          borderRadius: "14px",
          border: "1px solid #E8E6F0",
          boxShadow: "0 4px 20px rgba(19,15,30,0.08)",
          bgcolor: "#FFFFFF",
          overflow: "hidden",
        }}
      >
        {/* Banner */}
        {form.includeBanner && form.bannerUrl && (
          <Box
            component="img"
            src={form.bannerUrl}
            alt="Banner"
            sx={{
              width: "100%",
              height: 60,
              objectFit: "cover",
              display: "block",
            }}
          />
        )}

        <Box sx={{ px: 2, py: 1.8 }}>
          {/* Top row: Logo (left) + "Connect with me" + QR (right) */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              mb: 1.2,
            }}
          >
            {/* Company logo */}
            <Box
              sx={{
                height: 28,
                minWidth: 40,
                display: "flex",
                alignItems: "center",
              }}
            >
              {form.companyLogoUrl ? (
                <Box
                  component="img"
                  src={form.companyLogoUrl}
                  alt="Logo"
                  sx={{ height: 28, maxWidth: 70, objectFit: "contain" }}
                />
              ) : (
                <Typography
                  sx={{
                    fontSize: 11,
                    fontWeight: 900,
                    color: "#1E1A28",
                    letterSpacing: "-0.02em",
                  }}
                >
                  LOGO
                </Typography>
              )}
            </Box>

            {/* Right: Connect me + QR */}
            {form.includeQRCode && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: 0.3,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 9.5,
                    color: "#6B3FA0",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  Connect with me
                </Typography>
                <Box
                  sx={{
                    border: "1px solid #E8E6F0",
                    borderRadius: "4px",
                    overflow: "hidden",
                    lineHeight: 0,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                  }}
                >
                  <SignatureQRCanvas size={64} />
                </Box>
              </Box>
            )}
          </Box>

          {/* Profile pic row (if uploaded) */}
          {form.profilePictureUrl && (
            <Box sx={{ mb: 1 }}>
              <Box
                component="img"
                src={form.profilePictureUrl}
                alt="Profile"
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </Box>
          )}

          {/* Name */}
          {form.name && (
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 800,
                color: "#1E1A28",
                lineHeight: 1.3,
              }}
            >
              {form.name}
              {form.pronouns && (
                <Box
                  component="span"
                  sx={{
                    fontSize: 10,
                    fontWeight: 400,
                    color: "#9896A6",
                    ml: 0.6,
                  }}
                >
                  ({form.pronouns})
                </Box>
              )}
            </Typography>
          )}

          {/* Job title + company */}
          {(form.jobTitle || form.company) && (
            <Typography
              sx={{
                fontSize: 10.5,
                color: "#5C5874",
                lineHeight: 1.4,
                mt: 0.2,
              }}
            >
              {[form.jobTitle, form.company].filter(Boolean).join(" · ")}
            </Typography>
          )}

          {/* Phone */}
          {form.phoneNumber && (
            <Typography
              sx={{
                fontSize: 10.5,
                color: "#5C5874",
                lineHeight: 1.4,
                mt: 0.15,
              }}
            >
              {form.phoneNumber}
            </Typography>
          )}

          {/* Location */}
          {form.location && (
            <Typography
              sx={{
                fontSize: 10.5,
                color: "#9896A6",
                lineHeight: 1.4,
                mt: 0.15,
              }}
            >
              {form.location}
            </Typography>
          )}

          {/* Digital business card link */}
          <Typography
            sx={{
              fontSize: 10,
              color: "#6B3FA0",
              fontWeight: 600,
              mt: 1,
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            My Digital Business Card
          </Typography>

          {/* Disclaimer */}
          {form.disclaimer && (
            <Typography
              sx={{
                fontSize: 9,
                color: "#B0AEC4",
                mt: 1,
                lineHeight: 1.5,
                borderTop: "1px solid #F0EEF8",
                pt: 0.8,
              }}
            >
              {form.disclaimer}
            </Typography>
          )}
        </Box>
      </Box>

      {/* ── Action buttons ── */}
      <Stack spacing={1} sx={{ width: "100%" }}>
        <Button
          variant="outlined"
          startIcon={
            <MailOutlineRoundedIcon sx={{ fontSize: "15px !important" }} />
          }
          onClick={onSaveToEmail}
          sx={actionBtnSx}
        >
          Save to your email
        </Button>
        <Typography
          onClick={onDownload}
          sx={{
            fontSize: 13,
            fontWeight: 600,
            color: "#6B3FA0",
            textAlign: "center",
            cursor: "pointer",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Download
        </Typography>
      </Stack>
    </Box>
  );
}

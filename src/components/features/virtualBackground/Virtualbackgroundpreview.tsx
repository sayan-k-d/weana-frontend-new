"use client";

import { useEffect, useRef } from "react";
import { Box, Button, Typography, Stack } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import {
  LIBRARY_IMAGES,
  type VirtualBackgroundFormData,
} from "@/components/pages/members/constants/qrCode";

interface VirtualBackgroundPreviewProps {
  form: VirtualBackgroundFormData;
  memberName?: string;
  jobTitle?: string;
  company?: string;
  location?: string;
  logoUrl?: string | null;
  onDownload?: () => void;
  onSaveToTeamAssets?: () => void;
}

// ── Canvas QR — same pattern as QRCodePreview ─────────────────────────────────
function QRCanvas({ color, size }: { color: string; size: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cancelled = false;

    const render = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      try {
        const QRCode = (await import("qrcode")).default;
        const dotColor = color === "transparent" ? "#000000" : color;

        await QRCode.toCanvas(canvas, "/weana", {
          width: size,
          margin: 1,
          color: {
            dark: dotColor,
            light: "#FFFFFF",
          },
        });
      } catch {
        drawPlaceholder(
          canvas,
          color === "transparent" ? "#000000" : color,
          size,
        );
      }
    };

    if (!cancelled) render();
    return () => {
      cancelled = true;
    };
  }, [color, size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{ display: "block", width: size, height: size }}
    />
  );
}

/** Fallback placeholder QR grid when the qrcode package isn't available */
function drawPlaceholder(
  canvas: HTMLCanvasElement,
  color: string,
  size: number,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, size, size);

  const cells = 7;
  const cell = size / cells;
  ctx.fillStyle = color;

  const pattern = [
    1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0,
    0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,
  ];

  pattern.forEach((on, i) => {
    if (!on) return;
    const col = i % cells;
    const row = Math.floor(i / cells);
    ctx.fillRect(col * cell + 0.5, row * cell + 0.5, cell - 1, cell - 1);
  });
}

// ── Main component ─────────────────────────────────────────────────────────────
export function VirtualBackgroundPreview({
  form,
  memberName = "Full Name",
  jobTitle = "Job Title",
  company = "Company Name",
  location = "Location",
  logoUrl,
  onDownload,
  onSaveToTeamAssets,
}: VirtualBackgroundPreviewProps) {
  const bgImage =
    form.selectedImageId === "uploaded"
      ? form.uploadedImageUrl
      : (LIBRARY_IMAGES.find((img) => img.id === form.selectedImageId)?.src ??
        LIBRARY_IMAGES[0].src);

  const dotColor = form.color === "transparent" ? "#000000" : form.color;
  const qrSize = form.condensedView ? 32 : 44;

  const actionBtnSx = {
    fontSize: 12,
    fontWeight: 600,
    textTransform: "none" as const,
    borderRadius: "999px",
    px: 2,
    py: 0.8,
    color: "#3D3A4A",
    borderColor: "#D8D4EC",
    bgcolor: "#FAFAFA",
    justifyContent: "flex-start",
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
      <Typography
        sx={{
          fontSize: 13,
          fontWeight: 600,
          color: "#3D3A4A",
          textAlign: "center",
          width: 1,
        }}
      >
        Virtual background preview
      </Typography>

      {/* ── Preview card ── */}
      <Box
        sx={{
          width: "100%",
          borderRadius: "14px",
          overflow: "hidden",
          border: "1px solid #E8E6F0",
          boxShadow: "0 4px 20px rgba(19,15,30,0.08)",
          aspectRatio: "16/9",
          position: "relative",
          bgcolor: "#E8E6F0",
        }}
      >
        {/* Background image */}
        {bgImage && (
          <Box
            component="img"
            src={bgImage}
            alt="Virtual background"
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        )}

        {/* ── TOP overlay: logo + text (left) | QR (right) ── */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            px: "5%",
            pt: "5%",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          {/* Left: Logo + text */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: "4%",
              flex: 1,
              minWidth: 0,
            }}
          >
            {/* LOGO box */}
            <Box
              sx={{
                flexShrink: 0,
                width: form.condensedView ? 28 : 36,
                height: form.condensedView ? 28 : 36,
                border: `2px solid ${dotColor}`,
                borderRadius: "3px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                bgcolor: "#fff",
              }}
            >
              {logoUrl ? (
                <Box
                  component="img"
                  src={logoUrl}
                  alt="Logo"
                  sx={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              ) : (
                <Typography
                  sx={{
                    fontSize: form.condensedView ? 5 : 10,
                    fontWeight: 900,
                    color: dotColor,
                    lineHeight: 1.15,
                    textAlign: "center",
                    letterSpacing: "-0.02em",
                  }}
                >
                  LO
                  <br />
                  GO
                </Typography>
              )}
            </Box>

            {/* Name / title / company / location */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              {(form.showName || form.showJobTitle) && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 0.5,
                    flexWrap: "wrap",
                  }}
                >
                  {form.showName && (
                    <Typography
                      sx={{
                        fontSize: form.condensedView ? 7 : 9,
                        fontWeight: 800,
                        color: "#1E1A28",
                        lineHeight: 1.2,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {memberName}
                    </Typography>
                  )}
                  {form.showJobTitle ? (
                    <Typography
                      sx={{
                        fontSize: form.condensedView ? 6 : 7.5,
                        fontWeight: 400,
                        color: "#3D3A4A",
                        lineHeight: 1.2,
                        whiteSpace: "nowrap",
                      }}
                    >
                      Job Title
                    </Typography>
                  ) : (
                    <Typography
                      sx={{
                        fontSize: form.condensedView ? 6 : 7.5,
                        fontWeight: 400,
                        color: "#3D3A4A",
                        lineHeight: 1.2,
                        whiteSpace: "nowrap",
                      }}
                    >
                      Job Title
                    </Typography>
                  )}
                </Box>
              )}
              {form.showCompany && (
                <Typography
                  sx={{
                    fontSize: form.condensedView ? 6 : 7.5,
                    fontWeight: 600,
                    color: "#1E1A28",
                    lineHeight: 1.3,
                    whiteSpace: "nowrap",
                  }}
                >
                  {"Company Name"}
                </Typography>
              )}
              {form.showLocation && !form.condensedView && (
                <Typography
                  sx={{
                    fontSize: 6.5,
                    fontWeight: 800,
                    color: "#1E1A28",
                    lineHeight: 1.3,
                    whiteSpace: "nowrap",
                  }}
                >
                  {"Location"}
                </Typography>
              )}
            </Box>
          </Box>

          {/* Right: canvas QR */}
          {form.showQRCode && (
            <Box
              sx={{
                flexShrink: 0,
                border: "1.5px solid rgba(0,0,0,0.08)",
                borderRadius: "4px",
                overflow: "hidden",
                boxShadow: "0 1px 6px rgba(0,0,0,0.12)",
                bgcolor: "#fff",
                lineHeight: 0,
              }}
            >
              <QRCanvas color={form.color} size={qrSize} />
            </Box>
          )}
        </Box>
      </Box>

      {/* ── Action buttons ── */}
      <Stack spacing={1} sx={{ width: "100%" }}>
        <Button
          variant="outlined"
          startIcon={
            <FileDownloadOutlinedIcon sx={{ fontSize: "15px !important" }} />
          }
          onClick={onDownload}
          sx={actionBtnSx}
        >
          Download Background
        </Button>
        <Button
          variant="outlined"
          startIcon={<GroupOutlinedIcon sx={{ fontSize: "15px !important" }} />}
          onClick={onSaveToTeamAssets}
          sx={actionBtnSx}
        >
          Save to Tem Assets
        </Button>
      </Stack>
    </Box>
  );
}

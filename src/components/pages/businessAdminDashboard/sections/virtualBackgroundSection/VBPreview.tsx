"use client";

import { useEffect, useRef } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import {
  LIBRARY_IMAGES,
  TEAM_ASSET_IMAGES,
  type VirtualBgFormData,
} from "@/components/pages/businessAdminDashboard/virtualBackground/constants/virtualBgConstants";

// ── Canvas QR (same pattern used across all sections) ─────────────────────────
function QRCanvas({ color, size = 44 }: { color: string; size?: number }) {
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
          color: {
            dark: color === "transparent" ? "#000000" : color,
            light: "#FFFFFF",
          },
        });
      } catch {
        drawFallback(canvas, color === "transparent" ? "#000000" : color, size);
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

function drawFallback(canvas: HTMLCanvasElement, color: string, size: number) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, size, size);
  const cells = 7;
  const cell = size / cells;
  ctx.fillStyle = color;
  const p = [
    1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0,
    1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,
  ];
  p.forEach((on, i) => {
    if (!on) return;
    ctx.fillRect(
      (i % cells) * cell,
      Math.floor(i / cells) * cell,
      cell - 0.5,
      cell - 0.5,
    );
  });
}

// ── Preview component ─────────────────────────────────────────────────────────
interface VBPreviewProps {
  form: VirtualBgFormData;
  memberName?: string;
  jobTitle?: string;
  company?: string;
  location?: string;
  onDownload?: () => void;
  onSaveToTeamAssets?: () => void;
}

export function VBPreview({
  form,
  memberName = "Full Name",
  jobTitle = "Job Title",
  company = "Company Name",
  location = "Location",
  onDownload,
  onSaveToTeamAssets,
}: VBPreviewProps) {
  const dotColor = form.color === "transparent" ? "#000000" : form.color;

  // Resolve background image
  const allImages = [...TEAM_ASSET_IMAGES, ...LIBRARY_IMAGES];
  const bgImage =
    form.selectedImageId === "uploaded"
      ? form.uploadedImageUrl
      : (allImages.find((img) => img.id === form.selectedImageId)?.src ??
        LIBRARY_IMAGES[0].src);

  const actionBtnSx = {
    fontSize: 12.5,
    fontWeight: 600,
    textTransform: "none" as const,
    borderRadius: "999px",
    px: 2,
    py: 0.9,
    color: "#3D3A4A",
    borderColor: "#D8D4EC",
    bgcolor: "#FAFAFA",
    width: "100%",
    justifyContent: "flex-start",
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
      {/* Label */}
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

      {/* Preview card */}
      <Box
        sx={{
          width: "100%",
          aspectRatio: "16/9",
          borderRadius: "14px",
          overflow: "hidden",
          border: "1px solid #E8E6F0",
          boxShadow: "0 4px 20px rgba(19,15,30,0.08)",
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

        {/* Top overlay: Logo + text (left) | QR (right) */}
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
          {/* Left: Logo + info */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: "3%",
              flex: 1,
              minWidth: 0,
            }}
          >
            {/* Logo box */}
            <Box
              sx={{
                flexShrink: 0,
                width: 34,
                height: 34,
                border: `2px solid ${dotColor}`,
                borderRadius: "3px",
                bgcolor: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: 6,
                  fontWeight: 900,
                  color: dotColor,
                  lineHeight: 1.15,
                  textAlign: "center",
                  letterSpacing: "-0.02em",
                  whiteSpace: "pre-line",
                }}
              >
                {"LO\nGO"}
              </Typography>
            </Box>

            {/* Text */}
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
                        fontSize: 9,
                        fontWeight: 800,
                        color: "#1E1A28",
                        lineHeight: 1.2,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {memberName}
                    </Typography>
                  )}
                  {form.showJobTitle && (
                    <Typography
                      sx={{
                        fontSize: 7.5,
                        color: "#3D3A4A",
                        lineHeight: 1.2,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {jobTitle}
                    </Typography>
                  )}
                </Box>
              )}
              {form.showCompany && (
                <Typography
                  sx={{
                    fontSize: 7.5,
                    fontWeight: 600,
                    color: "#1E1A28",
                    lineHeight: 1.3,
                    whiteSpace: "nowrap",
                  }}
                >
                  {company}
                </Typography>
              )}
              {form.showLocation && (
                <Typography
                  sx={{
                    fontSize: 6.5,
                    color: "#7B7892",
                    lineHeight: 1.3,
                    whiteSpace: "nowrap",
                  }}
                >
                  {location}
                </Typography>
              )}
            </Box>
          </Box>

          {/* Right: QR */}
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
              <QRCanvas color={form.color} size={44} />
            </Box>
          )}
        </Box>
      </Box>

      {/* Action buttons */}
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

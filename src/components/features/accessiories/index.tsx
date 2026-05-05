"use client";

import { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";

interface AccessoriesSectionProps {
  memberName?: string;
  activationUrl?: string;
}

// ── Canvas QR — same pattern used across all sections ─────────────────────────
function ActivationQRCanvas({
  value,
  size = 180,
}: {
  value: string;
  size?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cancelled = false;

    const render = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      try {
        const QRCode = (await import("qrcode")).default;
        await QRCode.toCanvas(canvas, value, {
          width: size,
          margin: 2,
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
  }, [value, size]);

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

  const cells = 21;
  const cell = size / cells;
  ctx.fillStyle = "#000000";

  // Minimal recognisable QR-like grid (finder patterns + some data cells)
  const seed = [
    1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
    0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0,
    0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0,
    1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0,
    1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1,
    1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0,
    1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1,
    0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0,
    1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0,
    1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0,
    1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0,
    1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1,
    0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
  ];

  seed.forEach((on, i) => {
    if (!on) return;
    const col = i % cells;
    const row = Math.floor(i / cells);
    ctx.fillRect(col * cell, row * cell, cell - 0.5, cell - 0.5);
  });
}

// ── Main section ──────────────────────────────────────────────────────────────
export function AccessoriesSection({
  memberName = "Diago",
  activationUrl = "https://weana.app/activate",
}: AccessoriesSectionProps) {
  return (
    <Box sx={{ px: 3, pb: 4 }}>
      {/* Title */}
      <Typography
        sx={{
          fontSize: 15,
          fontWeight: 700,
          color: "#1E1A28",
          mb: 2.5,
          letterSpacing: "-0.01em",
        }}
      >
        Activate Accessories
      </Typography>

      {/* Activation card */}
      <Box
        sx={{
          border: "1px solid #EAE8F0",
          borderRadius: "18px",
          bgcolor: "#F7F6FA",
          px: 4,
          py: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        {/* QR Code */}
        <Box
          sx={{
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 2px 12px rgba(19,15,30,0.10)",
            lineHeight: 0,
            bgcolor: "#fff",
          }}
        >
          <ActivationQRCanvas value={activationUrl} size={180} />
        </Box>

        {/* Headline */}
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 700,
            color: "#1E1A28",
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          {`Activate accessories to ${memberName}'s profile`}
        </Typography>

        {/* Sub-copy */}
        <Box sx={{ textAlign: "center" }}>
          <Typography
            sx={{
              fontSize: 13,
              color: "#7B7892",
              lineHeight: 1.65,
              mb: 0.5,
            }}
          >
            Scan the QR Code with your phone to launch the
            <br />
            activation flow
          </Typography>

          <Typography sx={{ fontSize: 13, color: "#7B7892", lineHeight: 1.65 }}>
            Use your app to activate accessories.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

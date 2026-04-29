"use client";

import { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import type { QRCodeFormData } from "@/components/pages/members/constants/qrCode";
import { drawPlaceholder } from "@/lib/utils";

interface QRCodePreviewProps {
  form: QRCodeFormData;
  value?: string; // URL/text to encode, defaults to a placeholder
}

/**
 * Renders a pure-SVG QR code preview using a lightweight path-based QR matrix.
 * Uses the `qrcode` npm package (qrcode/lib/renderer/svg) at runtime —
 * falls back to a static pattern if the library isn't available.
 *
 * NOTE: Add `qrcode` to your dependencies:  npm i qrcode @types/qrcode
 */
export function QRCodePreview({
  form,
  value = "https://weana.app/card/diego",
}: QRCodePreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cancelled = false;

    const render = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      try {
        // Dynamic import so the bundle isn't affected if qrcode isn't installed yet
        const QRCode = (await import("qrcode")).default;
        const dotColor = form.color === "transparent" ? "#000000" : form.color;

        await QRCode.toCanvas(canvas, value, {
          width: 200,
          margin: 2,
          color: {
            dark: dotColor,
            light: "#FFFFFF",
          },
        });

        // Overlay logo if provided
        if (form.logoUrl && !cancelled) {
          const ctx = canvas.getContext("2d");
          if (!ctx) return;
          const img = new Image();
          img.onload = () => {
            if (cancelled) return;
            const logoSize = canvas.width * 0.22;
            const x = (canvas.width - logoSize) / 2;
            const y = (canvas.height - logoSize) / 2;
            // White bg behind logo
            ctx.fillStyle = "#FFFFFF";
            ctx.beginPath();
            ctx.roundRect(x - 4, y - 4, logoSize + 8, logoSize + 8, 6);
            ctx.fill();
            ctx.drawImage(img, x, y, logoSize, logoSize);
          };
          img.src = form.logoUrl;
        }
      } catch {
        // qrcode not installed — draw a placeholder grid
        drawPlaceholder(
          canvas,
          form.color === "transparent" ? "#000000" : form.color,
        );
      }
    };

    render();
    return () => {
      cancelled = true;
    };
  }, [form.color, form.logoUrl, value]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 2,
        width: "100%",
      }}
    >
      <Typography
        sx={{
          fontSize: 13,
          fontWeight: 600,
          color: "#3D3A4A",
          mb: 2,
          textAlign: "center",
        }}
      >
        QR preview
      </Typography>

      {/* Card wrapper */}
      <Box
        sx={{
          width: 220,
          borderRadius: "18px",
          border: "1px solid #E8E6F0",
          boxShadow: "0 4px 20px rgba(19,15,30,0.08)",
          bgcolor: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2.5,
        }}
      >
        <canvas
          ref={canvasRef}
          width={200}
          height={200}
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            borderRadius: "6px",
          }}
        />
      </Box>
    </Box>
  );
}

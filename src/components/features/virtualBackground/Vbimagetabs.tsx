"use client";

import { useRef, ChangeEvent } from "react";
import { Box, Typography } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import {
  LIBRARY_IMAGES,
  type VirtualBackgroundFormData,
} from "@/components/pages/members/constants/qrCode";

// ── Mini QR for thumbnails ────────────────────────────────────────────────────
function ThumbnailQR({ color, size = 16 }: { color: string; size?: number }) {
  const dotColor = color === "transparent" ? "#000" : color;
  const pattern = [
    1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1,
  ];
  const cell = size / 5;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={size} height={size} fill="#fff" />
      {pattern.map((on, i) =>
        on ? (
          <rect
            key={i}
            x={(i % 5) * cell + 0.3}
            y={Math.floor(i / 5) * cell + 0.3}
            width={cell - 0.6}
            height={cell - 0.6}
            fill={dotColor}
          />
        ) : null,
      )}
    </svg>
  );
}

// ── Overlay: top-left logo+text, top-right QR ─────────────────────────────────
function CardOverlay({ color }: { color: string }) {
  const dotColor = color === "transparent" ? "#000" : color;
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        px: 0.8,
        pt: 0.7,
        pointerEvents: "none",
      }}
    >
      {/* Left: logo + text */}
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 0.5 }}>
        <Box
          sx={{
            width: 14,
            height: 14,
            border: `1.5px solid ${dotColor}`,
            borderRadius: "2px",
            bgcolor: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Typography
            sx={{
              fontSize: 4,
              fontWeight: 900,
              color: dotColor,
              lineHeight: 1,
              textAlign: "center",
            }}
          >
            {"LO\nGO"}
          </Typography>
        </Box>

        <Box>
          <Box
            sx={{ display: "flex", alignItems: "baseline", gap: 0.3, mb: 0.3 }}
          >
            <Box
              sx={{
                height: 3,
                width: 18,
                bgcolor: dotColor,
                borderRadius: 1,
                opacity: 0.85,
              }}
            />
            <Box
              sx={{
                height: 2.5,
                width: 11,
                bgcolor: "#6B6880",
                borderRadius: 1,
                opacity: 0.55,
              }}
            />
          </Box>
          <Box
            sx={{
              height: 2.5,
              width: 20,
              bgcolor: dotColor,
              borderRadius: 1,
              opacity: 0.65,
              mb: 0.25,
            }}
          />
          <Box
            sx={{
              height: 2,
              width: 14,
              bgcolor: "#9896A6",
              borderRadius: 1,
              opacity: 0.5,
            }}
          />
        </Box>
      </Box>

      {/* Right: QR */}
      <Box
        sx={{
          border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: "2px",
          overflow: "hidden",
          boxShadow: "0 0 3px rgba(0,0,0,0.12)",
        }}
      >
        <ThumbnailQR color={color} size={16} />
      </Box>
    </Box>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
interface VBImageTabsProps {
  form: VirtualBackgroundFormData;
  onChange: (patch: Partial<VirtualBackgroundFormData>) => void;
}

const TAB_OPTIONS = [
  { id: "team-assets" as const, label: "Team Assets" },
  { id: "library" as const, label: "Choose from library" },
  { id: "upload" as const, label: "Upload image" },
];

export function VBImageTabs({ form, onChange }: VBImageTabsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onChange({
      uploadedImageFile: file,
      uploadedImageUrl: url,
      selectedImageId: "uploaded",
    });
    e.target.value = "";
  };

  const currentImages =
    form.activeTab === "upload"
      ? form.uploadedImageUrl
        ? [
            {
              id: "uploaded",
              src: form.uploadedImageUrl,
              alt: "Uploaded background",
            },
          ]
        : []
      : LIBRARY_IMAGES;

  return (
    <Box sx={{ mb: 3 }}>
      {/* Tab bar */}
      <Box
        sx={{
          display: "flex",
          border: "1.5px solid #E8E6F0",
          borderRadius: "999px",
          overflow: "hidden",
          mb: 2,
          bgcolor: "#F3F2F6",
          width: "fit-content",
        }}
      >
        {TAB_OPTIONS.map((tab) => {
          const active = form.activeTab === tab.id;
          return (
            <Box
              key={tab.id}
              onClick={() => {
                onChange({ activeTab: tab.id });
                if (tab.id === "upload" && !form.uploadedImageUrl) {
                  setTimeout(() => fileInputRef.current?.click(), 50);
                }
              }}
              sx={{
                px: 2.2,
                py: 0.9,
                fontSize: 12.5,
                fontWeight: active ? 700 : 500,
                color: active ? "#1E1A28" : "#7B7892",
                bgcolor: active ? "#FFFFFF" : "transparent",
                cursor: "pointer",
                borderRadius: "999px",
                transition: "all 0.15s",
                userSelect: "none",
                boxShadow: active ? "0 1px 6px rgba(19,15,30,0.10)" : "none",
                "&:hover": !active ? { color: "#3D3A4A" } : {},
              }}
            >
              {tab.label}
            </Box>
          );
        })}
      </Box>

      {/* Image grid */}
      {currentImages.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1.2,
          }}
        >
          {currentImages.map((img) => {
            const isSelected = form.selectedImageId === img.id;
            return (
              <Box
                key={img.id}
                onClick={() => onChange({ selectedImageId: img.id })}
                sx={{
                  position: "relative",
                  borderRadius: "8px",
                  overflow: "hidden",
                  cursor: "pointer",
                  border: isSelected
                    ? "2.5px solid #6B3FA0"
                    : "2px solid transparent",
                  boxShadow: isSelected
                    ? "0 0 0 2px #EDE9F8"
                    : "0 1px 4px rgba(19,15,30,0.08)",
                  transition: "border-color 0.15s, box-shadow 0.15s",
                  aspectRatio: "16/9",
                  "&:hover": {
                    borderColor: isSelected ? "#6B3FA0" : "#C4C0D8",
                  },
                }}
              >
                <Box
                  component="img"
                  src={img.src}
                  alt={img.alt}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <CardOverlay color={form.color} />
                {isSelected && (
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 5,
                      right: 5,
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      bgcolor: "#6B3FA0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                    }}
                  >
                    <CheckRoundedIcon sx={{ fontSize: 10, color: "#fff" }} />
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      ) : form.activeTab === "upload" ? (
        <Box
          onClick={() => fileInputRef.current?.click()}
          sx={{
            border: "1.5px dashed #D8D4EC",
            borderRadius: "12px",
            py: 4,
            textAlign: "center",
            cursor: "pointer",
            bgcolor: "#FAFAFA",
            transition: "all 0.15s",
            "&:hover": { borderColor: "#6B3FA0", bgcolor: "#F8F6FD" },
          }}
        >
          <Typography
            sx={{ fontSize: 13, fontWeight: 600, color: "#3D3A4A", mb: 0.3 }}
          >
            Click to upload
          </Typography>
          <Typography sx={{ fontSize: 12, color: "#A09EB8" }}>
            PNG, JPG, WEBP — any aspect ratio
          </Typography>
        </Box>
      ) : null}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </Box>
  );
}

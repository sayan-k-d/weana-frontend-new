"use client";

import { useRef, ChangeEvent } from "react";
import { Box, Typography } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import {
  VB_TABS,
  LIBRARY_IMAGES,
  TEAM_ASSET_IMAGES,
  type VBImage,
  type VBTab,
  type VirtualBgFormData,
} from "@/components/pages/businessAdminDashboard/virtualBackground/constants/virtualBgConstants";

// ── Mini overlay composited on each thumbnail ─────────────────────────────────
function ThumbnailOverlay({ color }: { color: string }) {
  const dotColor = color === "transparent" ? "#000" : color;
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        px: 0.7,
        pt: 0.6,
        pointerEvents: "none",
      }}
    >
      {/* Left: LOGO + text bars */}
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 0.5 }}>
        <Box
          sx={{
            width: 13,
            height: 13,
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
              fontSize: 3.5,
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
            sx={{ display: "flex", alignItems: "baseline", gap: 0.3, mb: 0.25 }}
          >
            <Box
              sx={{
                height: 2.5,
                width: 16,
                bgcolor: dotColor,
                borderRadius: 1,
                opacity: 0.85,
              }}
            />
            <Box
              sx={{
                height: 2,
                width: 10,
                bgcolor: "#6B6880",
                borderRadius: 1,
                opacity: 0.55,
              }}
            />
          </Box>
          <Box
            sx={{
              height: 2,
              width: 18,
              bgcolor: dotColor,
              borderRadius: 1,
              opacity: 0.65,
              mb: 0.2,
            }}
          />
          <Box
            sx={{
              height: 1.5,
              width: 12,
              bgcolor: "#9896A6",
              borderRadius: 1,
              opacity: 0.5,
            }}
          />
        </Box>
      </Box>
      {/* Right: mini QR */}
      <Box
        sx={{
          width: 14,
          height: 14,
          border: `1.5px solid ${dotColor}`,
          borderRadius: "2px",
          bgcolor: "#fff",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          p: "1.5px",
          gap: "1px",
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <Box
            key={i}
            sx={{ bgcolor: dotColor, borderRadius: "0.5px", opacity: 0.85 }}
          />
        ))}
      </Box>
    </Box>
  );
}

// ── Single image thumbnail ────────────────────────────────────────────────────
function ImageThumbnail({
  image,
  isSelected,
  color,
  onSelect,
}: {
  image: VBImage;
  isSelected: boolean;
  color: string;
  onSelect: () => void;
}) {
  return (
    <Box
      onClick={onSelect}
      sx={{
        position: "relative",
        borderRadius: "8px",
        overflow: "hidden",
        cursor: "pointer",
        aspectRatio: "16/9",
        border: isSelected ? "2.5px solid #6B3FA0" : "2px solid transparent",
        boxShadow: isSelected
          ? "0 0 0 2px #EDE9F8"
          : "0 1px 4px rgba(19,15,30,0.08)",
        transition: "border-color 0.13s, box-shadow 0.13s",
        "&:hover": { borderColor: isSelected ? "#6B3FA0" : "#C4C0D8" },
      }}
    >
      <Box
        component="img"
        src={image.src}
        alt={image.alt}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
      <ThumbnailOverlay color={color} />
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
}

// ── Upload drop zone ──────────────────────────────────────────────────────────
function UploadDropzone({
  onUpload,
}: {
  onUpload: (file: File, url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onUpload(file, URL.createObjectURL(file));
    e.target.value = "";
  };

  return (
    <Box
      onClick={() => inputRef.current?.click()}
      sx={{
        border: "1.5px dashed #D8D4EC",
        borderRadius: "12px",
        py: 4,
        px: 2,
        textAlign: "center",
        cursor: "pointer",
        bgcolor: "#FAFAFA",
        transition: "all 0.15s",
        "&:hover": { borderColor: "#6B3FA0", bgcolor: "#F8F6FD" },
      }}
    >
      <CloudUploadOutlinedIcon sx={{ fontSize: 32, color: "#C4C0D8", mb: 1 }} />
      <Typography
        sx={{ fontSize: 13.5, fontWeight: 600, color: "#3D3A4A", mb: 0.3 }}
      >
        Click to upload
      </Typography>
      <Typography sx={{ fontSize: 12.5, color: "#A09EB8" }}>
        PNG, JPG, WEBP — any aspect ratio
      </Typography>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleChange}
      />
    </Box>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
interface VBImageGridProps {
  form: VirtualBgFormData;
  onChange: (patch: Partial<VirtualBgFormData>) => void;
}

export function VBImageGrid({ form, onChange }: VBImageGridProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTabChange = (tab: VBTab) => {
    onChange({ activeTab: tab });
    // Auto-open file picker on Upload tab if nothing uploaded yet
    if (tab === "upload" && !form.uploadedImageUrl) {
      setTimeout(() => fileInputRef.current?.click(), 60);
    }
  };

  const handleUpload = (file: File, url: string) => {
    onChange({
      uploadedImageFile: file,
      uploadedImageUrl: url,
      selectedImageId: "uploaded",
    });
  };

  // Resolve image list for current tab
  const images: VBImage[] =
    form.activeTab === "team-assets"
      ? TEAM_ASSET_IMAGES
      : form.activeTab === "library"
        ? LIBRARY_IMAGES
        : form.uploadedImageUrl
          ? [
              {
                id: "uploaded",
                src: form.uploadedImageUrl,
                alt: "Uploaded background",
              },
            ]
          : [];

  return (
    <Box>
      {/* ── Tab bar ── */}
      <Box
        sx={{
          display: "flex",
          border: "1.5px solid #EAE8F0",
          borderRadius: "999px",
          overflow: "hidden",
          bgcolor: "#F3F2F6",
          mb: 2,
          width: "fit-content",
        }}
      >
        {VB_TABS.map((tab) => {
          const isActive = form.activeTab === tab.id;
          return (
            <Box
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              sx={{
                px: 2.2,
                py: 0.9,
                fontSize: 13,
                fontWeight: isActive ? 700 : 500,
                color: isActive ? "#1E1A28" : "#7B7892",
                bgcolor: isActive ? "#FFFFFF" : "transparent",
                borderRadius: "999px",
                cursor: "pointer",
                userSelect: "none",
                whiteSpace: "nowrap",
                boxShadow: isActive ? "0 1px 6px rgba(19,15,30,0.10)" : "none",
                transition: "all 0.15s",
                "&:hover": !isActive ? { color: "#3D3A4A" } : {},
              }}
            >
              {tab.label}
            </Box>
          );
        })}
      </Box>

      {/* ── Upload tab — empty state ── */}
      {form.activeTab === "upload" && images.length === 0 && (
        <UploadDropzone onUpload={handleUpload} />
      )}

      {/* ── Image grid ── */}
      {images.length > 0 && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1.2,
          }}
        >
          {images.map((img) => (
            <ImageThumbnail
              key={img.id}
              image={img}
              isSelected={form.selectedImageId === img.id}
              color={form.color}
              onSelect={() => onChange({ selectedImageId: img.id })}
            />
          ))}
          {/* Re-upload option when on upload tab with existing image */}
          {form.activeTab === "upload" && form.uploadedImageUrl && (
            <Box
              onClick={() => fileInputRef.current?.click()}
              sx={{
                aspectRatio: "16/9",
                border: "1.5px dashed #D8D4EC",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                bgcolor: "#FAFAFA",
                "&:hover": { borderColor: "#6B3FA0", bgcolor: "#F8F6FD" },
                transition: "all 0.15s",
              }}
            >
              <CloudUploadOutlinedIcon
                sx={{ fontSize: 20, color: "#C4C0D8" }}
              />
              <Typography sx={{ fontSize: 11, color: "#A09EB8", mt: 0.3 }}>
                Upload more
              </Typography>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUpload(file, URL.createObjectURL(file));
                  e.target.value = "";
                }}
              />
            </Box>
          )}
        </Box>
      )}

      {/* Hidden upload input for tab switch */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file, URL.createObjectURL(file));
          e.target.value = "";
        }}
      />
    </Box>
  );
}

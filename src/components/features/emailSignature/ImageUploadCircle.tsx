"use client";

import { useRef, ChangeEvent } from "react";
import { Box, Typography, Tooltip } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface ImageUploadCircleProps {
  label: string;
  tooltip?: string;
  imageUrl: string | null;
  onUpload: (file: File, url: string) => void;
  shape?: "circle" | "rounded"; // circle for profile, rounded for logos
  size?: number;
}

export function ImageUploadCircle({
  label,
  tooltip,
  imageUrl,
  onUpload,
  shape = "rounded",
  size = 80,
}: ImageUploadCircleProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onUpload(file, url);
    e.target.value = "";
  };

  const borderRadius = shape === "circle" ? "50%" : "50%"; // both circular per screenshot

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0.8,
      }}
    >
      {/* Label row */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
        <Typography sx={{ fontSize: 12, fontWeight: 500, color: "#5C5874" }}>
          {label}
        </Typography>
        {tooltip && (
          <Tooltip title={tooltip} placement="top" arrow>
            <InfoOutlinedIcon
              sx={{ fontSize: 13, color: "#B0AEC4", cursor: "help" }}
            />
          </Tooltip>
        )}
      </Box>

      {/* Upload circle */}
      <Box
        onClick={() => inputRef.current?.click()}
        sx={{
          width: size,
          height: size,
          borderRadius,
          overflow: "hidden",
          cursor: "pointer",
          position: "relative",
          bgcolor: imageUrl ? "transparent" : "#F0EEF8",
          border: imageUrl ? "none" : "1.5px dashed #C4C0D8",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transition: "border-color 0.15s, background 0.15s",
          "&:hover .overlay": { opacity: 1 },
          "&:hover": !imageUrl
            ? { borderColor: "#6B3FA0", bgcolor: "#EDE9F8" }
            : {},
        }}
      >
        {imageUrl ? (
          <>
            <Box
              component="img"
              src={imageUrl}
              alt={label}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            {/* Hover overlay for replacing */}
            <Box
              className="overlay"
              sx={{
                position: "absolute",
                inset: 0,
                bgcolor: "rgba(0,0,0,0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0,
                transition: "opacity 0.15s",
              }}
            >
              <EditOutlinedIcon sx={{ fontSize: 20, color: "#fff" }} />
            </Box>
          </>
        ) : (
          <>
            <EditOutlinedIcon
              sx={{ fontSize: 20, color: "#C4C0D8", mb: 0.4 }}
            />
            <Typography
              sx={{
                fontSize: 9.5,
                color: "#B0AEC4",
                textAlign: "center",
                px: 0.5,
                lineHeight: 1.3,
              }}
            >
              Select file or{"\n"}drag and drop{"\n"}one here
            </Typography>
          </>
        )}
      </Box>

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

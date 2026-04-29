"use client";

import { useRef, ChangeEvent } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

interface CustomLogoUploaderProps {
  logoUrl: string | null;
  onUpload: (file: File, url: string) => void;
  onRemove: () => void;
}

export function CustomLogoUploader({
  logoUrl,
  onUpload,
  onRemove,
}: CustomLogoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onUpload(file, url);
    // Reset input so same file can be re-selected
    e.target.value = "";
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        sx={{ fontSize: 13, fontWeight: 600, color: "#1E1A28", mb: 1.5 }}
      >
        Custom logo
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* Upload square */}
        <Box sx={{ position: "relative", flexShrink: 0 }}>
          <Box
            onClick={() => !logoUrl && inputRef.current?.click()}
            sx={{
              width: 90,
              height: 90,
              borderRadius: "14px",
              bgcolor: "#F3F2F6",
              border: "1.5px solid #E8E6F0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: logoUrl ? "default" : "pointer",
              overflow: "hidden",
              transition: "border-color 0.15s, background 0.15s",
              "&:hover": !logoUrl
                ? { borderColor: "#6B3FA0", bgcolor: "#EDE9F8" }
                : {},
            }}
          >
            {logoUrl ? (
              <Box
                component="img"
                src={logoUrl}
                alt="Custom logo"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  p: 1,
                }}
              />
            ) : (
              <>
                <LocalOfferOutlinedIcon
                  sx={{ fontSize: 26, color: "#C4C0D8", mb: 0.5 }}
                />
                <Typography
                  sx={{ fontSize: 11.5, fontWeight: 600, color: "#9896A6" }}
                >
                  Add
                </Typography>
              </>
            )}
          </Box>

          {/* Remove button when logo is uploaded */}
          {logoUrl && (
            <IconButton
              size="small"
              onClick={onRemove}
              sx={{
                position: "absolute",
                top: -8,
                right: -8,
                width: 20,
                height: 20,
                bgcolor: "#E05858",
                color: "#fff",
                "&:hover": { bgcolor: "#C84040" },
                boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
              }}
            >
              <CloseRoundedIcon sx={{ fontSize: 12 }} />
            </IconButton>
          )}
        </Box>

        {/* Description text */}
        {!logoUrl && (
          <Typography
            sx={{
              fontSize: 13,
              color: "#7B7892",
              lineHeight: 1.65,
              maxWidth: 220,
            }}
          >
            Add custom logo to be displayed in the middle of the QR Code.
          </Typography>
        )}

        {/* Replace / uploaded state */}
        {logoUrl && (
          <Box>
            <Typography
              sx={{ fontSize: 13, fontWeight: 600, color: "#3D3A4A", mb: 0.4 }}
            >
              Logo uploaded
            </Typography>
            <Typography
              onClick={() => inputRef.current?.click()}
              sx={{
                fontSize: 12.5,
                color: "#6B3FA0",
                fontWeight: 600,
                cursor: "pointer",
                "&:hover": { opacity: 0.75 },
              }}
            >
              Replace
            </Typography>
          </Box>
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

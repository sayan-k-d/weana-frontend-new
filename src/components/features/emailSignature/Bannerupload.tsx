"use client";

import { useRef, ChangeEvent, DragEvent, useState } from "react";
import {
  Box,
  Switch,
  Typography,
  OutlinedInput,
  Tooltip,
  Collapse,
} from "@mui/material";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import type { EmailSignatureFormData } from "@/components/pages/businessAdminDashboard/members/constants/emailSignature";

type BannerUploadProps = Pick<
  EmailSignatureFormData,
  "includeBanner" | "bannerUrl" | "bannerLink"
> & {
  onChange: (patch: Partial<EmailSignatureFormData>) => void;
  onBannerUpload: (file: File, url: string) => void;
};

export function BannerUpload({
  includeBanner,
  bannerUrl,
  bannerLink,
  onChange,
  onBannerUpload,
}: BannerUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onBannerUpload(file, url);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    e.target.value = "";
  };

  return (
    <Box
      sx={{
        border: "1px solid #EAE8F0",
        borderRadius: "14px",
        overflow: "hidden",
        mb: 3,
      }}
    >
      {/* Toggle row */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2.5,
          py: 1.8,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
          <Typography
            sx={{ fontSize: 13.5, fontWeight: 500, color: "#3D3A4A" }}
          >
            Include Banner
          </Typography>
          <Tooltip
            title="Add a banner image to appear in your email signature."
            placement="top"
            arrow
          >
            <InfoOutlinedIcon
              sx={{ fontSize: 14, color: "#B0AEC4", cursor: "help" }}
            />
          </Tooltip>
        </Box>
        <Switch
          checked={includeBanner}
          onChange={(e) => onChange({ includeBanner: e.target.checked })}
          size="small"
          sx={{
            "& .MuiSwitch-switchBase.Mui-checked": { color: "#6B3FA0" },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              bgcolor: "#6B3FA0",
            },
          }}
        />
      </Box>

      {/* Collapsible content */}
      <Collapse in={includeBanner} timeout={200}>
        <Box sx={{ px: 2, pb: 2 }}>
          {/* Drop zone */}
          <Box
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            sx={{
              border: `1.5px dashed ${dragging ? "#6B3FA0" : "#D8D4EC"}`,
              borderRadius: "10px",
              bgcolor: dragging ? "#F3F0FB" : "#F7F6FA",
              minHeight: 130,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              overflow: "hidden",
              position: "relative",
              transition: "all 0.15s",
              "&:hover": { borderColor: "#6B3FA0", bgcolor: "#F3F0FB" },
            }}
          >
            {bannerUrl ? (
              <Box
                component="img"
                src={bannerUrl}
                alt="Banner"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  inset: 0,
                  display: "block",
                }}
              />
            ) : (
              <>
                <ImageOutlinedIcon
                  sx={{ fontSize: 28, color: "#C4C0D8", mb: 0.8 }}
                />
                <Typography sx={{ fontSize: 13, color: "#7B7892" }}>
                  <Box
                    component="span"
                    sx={{
                      color: "#6B3FA0",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Select
                  </Box>{" "}
                  file or drag and drop one here
                </Typography>
              </>
            )}
          </Box>

          {/* Link input */}
          <Box sx={{ mt: 2 }}>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.8 }}
            >
              <Typography
                sx={{ fontSize: 12.5, fontWeight: 600, color: "#5C5874" }}
              >
                Include a Link
              </Typography>
              <Tooltip
                title="URL to open when the banner is clicked."
                placement="top"
                arrow
              >
                <InfoOutlinedIcon
                  sx={{ fontSize: 13, color: "#B0AEC4", cursor: "help" }}
                />
              </Tooltip>
            </Box>
            <OutlinedInput
              fullWidth
              placeholder="Insert a URL"
              value={bannerLink}
              onChange={(e) => onChange({ bannerLink: e.target.value })}
              sx={{
                borderRadius: "10px",
                fontSize: 13,
                bgcolor: "#F7F6FA",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#E8E6F0",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#C4C0D8",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#6B3FA0",
                  borderWidth: 1.5,
                },
                "& .MuiOutlinedInput-input": { py: 1.3, px: 1.8 },
              }}
            />
          </Box>
        </Box>
      </Collapse>

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

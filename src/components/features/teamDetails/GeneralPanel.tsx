"use client";

import { useRef, useState, ChangeEvent } from "react";
import { Box, Button, OutlinedInput, Typography } from "@mui/material";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import {
  DEFAULT_TEAM_GENERAL_FORM,
  type TeamGeneralFormData,
} from "@/components/pages/businessAdminDashboard/teams/constants/teamDetail";

// ── Team Logo Uploader ────────────────────────────────────────────────────────
function TeamLogoUploader({
  logoUrl,
  onUpload,
}: {
  logoUrl: string | null;
  onUpload: (file: File, url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onUpload(file, url);
    e.target.value = "";
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2.5, mb: 3 }}>
      {/* Circle upload area */}
      <Box
        onClick={() => inputRef.current?.click()}
        sx={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          bgcolor: "#EFEFEF",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          overflow: "hidden",
          flexShrink: 0,
          position: "relative",
          transition: "background 0.15s",
          "&:hover": { bgcolor: "#E5E3F0" },
          "&:hover .upload-overlay": { opacity: 1 },
        }}
      >
        {logoUrl ? (
          <>
            <Box
              component="img"
              src={logoUrl}
              alt="Team logo"
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <Box
              className="upload-overlay"
              sx={{
                position: "absolute",
                inset: 0,
                bgcolor: "rgba(0,0,0,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0,
                transition: "opacity 0.15s",
              }}
            >
              <ImageOutlinedIcon sx={{ fontSize: 22, color: "#fff" }} />
            </Box>
          </>
        ) : (
          <>
            <ImageOutlinedIcon
              sx={{ fontSize: 22, color: "#9896A6", mb: 0.3 }}
            />
            <Typography
              sx={{
                fontSize: 9.5,
                color: "#6B3FA0",
                textAlign: "center",
                lineHeight: 1.3,
              }}
            >
              Select file or{"\n"}drag and drop
            </Typography>
          </>
        )}
      </Box>

      {/* Right copy */}
      <Box>
        <Typography
          sx={{ fontSize: 13.5, color: "#3D3A4A", lineHeight: 1.6, mb: 0.8 }}
        >
          Help your teammates represent their team
          <br />
          by adding a logo.
        </Typography>
        <Typography
          onClick={() => inputRef.current?.click()}
          sx={{
            fontSize: 13.5,
            fontWeight: 600,
            color: "#2563EB",
            cursor: "pointer",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Upload photo
        </Typography>
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

// ── Shared input style ────────────────────────────────────────────────────────
const inputSx = {
  borderRadius: "10px",
  fontSize: 13.5,
  bgcolor: "#F3F2F6",
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "transparent" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#C4C0D8" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#6B3FA0",
    borderWidth: 1.5,
  },
  "& .MuiOutlinedInput-input": { py: 1.5, px: 2, color: "#3D3A4A" },
};

// ── Main Panel ────────────────────────────────────────────────────────────────
interface GeneralPanelProps {
  initialData?: TeamGeneralFormData;
  onSave?: (data: TeamGeneralFormData) => void;
}

export function GeneralPanel({ initialData, onSave }: GeneralPanelProps) {
  const [form, setForm] = useState<TeamGeneralFormData>(
    initialData ?? { ...DEFAULT_TEAM_GENERAL_FORM },
  );
  const [hasChanges, setHasChanges] = useState(false);

  const patch = (update: Partial<TeamGeneralFormData>) => {
    setForm((prev) => ({ ...prev, ...update }));
    setHasChanges(true);
  };

  const handleCancel = () => {
    setForm(initialData ?? { ...DEFAULT_TEAM_GENERAL_FORM });
    setHasChanges(false);
  };

  const handleUpdate = () => {
    onSave?.(form);
    setHasChanges(false);
  };

  const btnBaseSx = {
    fontSize: 13.5,
    fontWeight: 600,
    textTransform: "none" as const,
    borderRadius: "999px",
    px: 3,
    py: 1,
  };

  return (
    <Box>
      {/* Title */}
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 700,
          color: "#1E1A28",
          mb: 2.5,
          letterSpacing: "-0.01em",
        }}
      >
        General
      </Typography>

      {/* Team Logo */}
      <Box sx={{ mb: 0.5 }}>
        <Typography
          sx={{ fontSize: 13.5, fontWeight: 600, color: "#1E1A28", mb: 1.2 }}
        >
          Team logo
        </Typography>
        <TeamLogoUploader
          logoUrl={form.logoUrl}
          onUpload={(file, url) => patch({ logoFile: file, logoUrl: url })}
        />
      </Box>

      {/* Team Name */}
      <Box sx={{ mb: 2.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3, mb: 0.8 }}>
          <Typography
            sx={{ fontSize: 13.5, fontWeight: 600, color: "#1E1A28" }}
          >
            Team Name
          </Typography>
          <Typography sx={{ fontSize: 13, color: "#E05858" }}>*</Typography>
        </Box>
        <OutlinedInput
          fullWidth
          placeholder="Sales Department"
          value={form.teamName}
          onChange={(e) => patch({ teamName: e.target.value })}
          sx={inputSx}
        />
      </Box>

      {/* Description */}
      <Box sx={{ mb: 3.5 }}>
        <Typography
          sx={{ fontSize: 13.5, fontWeight: 600, color: "#1E1A28", mb: 0.8 }}
        >
          Description
        </Typography>
        <OutlinedInput
          fullWidth
          placeholder="Optional"
          value={form.description}
          onChange={(e) => patch({ description: e.target.value })}
          sx={inputSx}
        />
      </Box>

      {/* Footer buttons */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1.2 }}>
        <Button
          variant="outlined"
          onClick={handleCancel}
          sx={{
            ...btnBaseSx,
            color: "#9896A6",
            borderColor: "#E8E6F0",
            bgcolor: "#F7F6FA",
            "&:hover": { borderColor: "#C4C0D8", bgcolor: "#F0EEF8" },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          disableElevation
          onClick={handleUpdate}
          disabled={!hasChanges || !form.teamName.trim()}
          sx={{
            ...btnBaseSx,
            bgcolor: hasChanges && form.teamName.trim() ? "#6B3FA0" : "#EAE8F0",
            color: hasChanges && form.teamName.trim() ? "#fff" : "#B0AEC4",
            "&:hover": {
              bgcolor:
                hasChanges && form.teamName.trim() ? "#5A3490" : "#EAE8F0",
            },
            "&.Mui-disabled": { bgcolor: "#EAE8F0", color: "#B0AEC4" },
          }}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
}

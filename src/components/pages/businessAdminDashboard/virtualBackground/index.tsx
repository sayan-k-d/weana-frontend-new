"use client";

import { useState } from "react";
import { Box, Divider, OutlinedInput, Typography } from "@mui/material";
import { VBColorPicker } from "../sections/virtualBackgroundSection/VBColorPicker";
import { VBFieldCheckboxes } from "../sections/virtualBackgroundSection/VBFieldCheckboxes";
import { VBImageGrid } from "../sections/virtualBackgroundSection/VBImageGrid";
import { VBPreview } from "../sections/virtualBackgroundSection/VBPreview";
import {
  DEFAULT_VIRTUAL_BG_FORM,
  type VirtualBgFormData,
} from "@/components/pages/businessAdminDashboard/virtualBackground/constants/virtualBgConstants";

// ─── Left pane: all controls ─────────────────────────────────────────────────
function VBControls({
  form,
  onChange,
}: {
  form: VirtualBgFormData;
  onChange: (patch: Partial<VirtualBgFormData>) => void;
}) {
  return (
    <Box
      sx={{
        flex: 1,
        bgcolor: "#FFFFFF",
        borderRadius: "16px",
        border: "1px solid #EAE8F0",
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
      }}
    >
      {/* ── Background Name ── */}
      <Box>
        <Typography
          sx={{ fontSize: 13, fontWeight: 600, color: "#1E1A28", mb: 0.8 }}
        >
          Background Name
        </Typography>
        <OutlinedInput
          fullWidth
          placeholder="Background Name"
          value={form.backgroundName}
          onChange={(e) => onChange({ backgroundName: e.target.value })}
          sx={{
            borderRadius: "10px",
            fontSize: 13.5,
            bgcolor: "#F7F6FA",
            height: 46,
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#EAE8F0" },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#C4C0D8",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#6B3FA0",
              borderWidth: 1.5,
            },
          }}
        />
      </Box>

      {/* ── Color + checkboxes in a card ── */}
      <Box
        sx={{
          border: "1px solid #EAE8F0",
          borderRadius: "12px",
          p: 2.5,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <VBColorPicker
          value={form.color}
          onChange={(c) => onChange({ color: c })}
        />
        <VBFieldCheckboxes form={form} onChange={onChange} />
      </Box>

      {/* ── Image tabs + grid ── */}
      <VBImageGrid form={form} onChange={onChange} />
    </Box>
  );
}

// ─── Right pane: preview ──────────────────────────────────────────────────────
function VBRightPane({
  form,
  memberName,
  jobTitle,
  company,
  location,
}: {
  form: VirtualBgFormData;
  memberName?: string;
  jobTitle?: string;
  company?: string;
  location?: string;
}) {
  return (
    <Box
      sx={{
        width: 340,
        flexShrink: 0,
        bgcolor: "#FFFFFF",
        borderRadius: "16px",
        border: "1px solid #EAE8F0",
        p: 2.5,
      }}
    >
      <VBPreview
        form={form}
        memberName={memberName}
        jobTitle={jobTitle}
        company={company}
        location={location}
        onDownload={() => console.log("Download background")}
        onSaveToTeamAssets={() => console.log("Save to team assets")}
      />
    </Box>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
interface VirtualBackgroundsPageProps {
  /** Optionally pre-populate from a member's profile */
  memberName?: string;
  jobTitle?: string;
  company?: string;
  location?: string;
  initialForm?: Partial<VirtualBgFormData>;
}

export default function VirtualBackgroundsPage({
  memberName = "Full Name",
  jobTitle = "Job Title",
  company = "Company Name",
  location = "Location",
  initialForm,
}: VirtualBackgroundsPageProps) {
  const [form, setForm] = useState<VirtualBgFormData>({
    ...DEFAULT_VIRTUAL_BG_FORM,
    ...initialForm,
  });

  const patch = (update: Partial<VirtualBgFormData>) =>
    setForm((prev) => ({ ...prev, ...update }));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F3F2F6",
        fontFamily: 'Inter, "Segoe UI", sans-serif',
        p: 2.5,
      }}
    >
      {/* ── Page title ── */}
      <Typography
        sx={{
          fontSize: 18,
          fontWeight: 700,
          color: "#6B3FA0",
          mb: 2.5,
          letterSpacing: "-0.02em",
        }}
      >
        Virtual Backgrounds
      </Typography>

      {/* ── Two-column layout ── */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "flex-start",
        }}
      >
        {/* Left: controls */}
        <VBControls form={form} onChange={patch} />

        {/* Right: preview */}
        <VBRightPane
          form={form}
          memberName={memberName}
          jobTitle={jobTitle}
          company={company}
          location={location}
        />
      </Box>
    </Box>
  );
}

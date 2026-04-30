"use client";

import {
  Box,
  Button,
  Chip,
  Divider,
  MenuItem,
  Select,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { FormField } from "@/components/ui/common/FormField";
import { StyledInput } from "@/components/ui/common/StyledInput";
import { PhotoUploader } from "@/components/ui/common/PhotoUploader";
import { ColorRow } from "@/components/ui/common/Colorrow";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AddIcon from "@mui/icons-material/Add";
import {
  CARD_LAYOUTS,
  FONT_OPTIONS,
} from "@/components/pages/members/constants/memberProfile";
import type { CardLayout, MemberProfileFormData } from "@/types";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

interface AboutFormSectionProps {
  form: MemberProfileFormData;
  onChange: (patch: Partial<MemberProfileFormData>) => void;
}

export function AboutFormSection({ form, onChange }: AboutFormSectionProps) {
  return (
    <Box>
      {/* ── Section title ── */}
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 700,
          color: "#1E1A28",
          mb: 2.5,
          letterSpacing: "-0.02em",
        }}
      >
        About
      </Typography>

      {/* ── Card Name + Layout row ── */}
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2.5,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <FormField label="Card Name:">
          <StyledInput
            value={form.cardName}
            onChange={(e) => onChange({ cardName: e.target.value })}
            placeholder="Card Name"
            sx={{ width: 180 }}
          />
        </FormField>

        <FormField label="Card Layout:">
          <Select
            value={form.cardLayout}
            onChange={(e) =>
              onChange({ cardLayout: e.target.value as CardLayout })
            }
            size="small"
            IconComponent={KeyboardArrowDownRoundedIcon}
            sx={{
              bgcolor: "#FFFFFF",
              border: "1px solid #E0DDE8",
              borderRadius: "8px",
              fontSize: 13.5,
              height: 36,
              minWidth: 140,
              "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              "& .MuiSelect-icon": { fontSize: 18, color: "#9896A6" },
            }}
          >
            {CARD_LAYOUTS.map((l) => (
              <MenuItem key={l} value={l} sx={{ fontSize: 13.5 }}>
                {l}
              </MenuItem>
            ))}
          </Select>
        </FormField>
      </Stack>

      {/* ── Photo uploaders ── */}
      <Stack
        direction="row"
        spacing={2}
        sx={{
          width: "100%",
          flexWrap: "nowrap", // Forces single line
          mb: 3,
          alignItems: "flex-end", // Aligns the dropzones at the bottom if labels differ
        }}
      >
        <PhotoUploader
          label="Profile Picture"
          info={<InfoOutlinedIcon sx={{ width: 15, height: 15 }} />}
          shape="circle"
          value={form.profilePictureUrl}
          onChange={(file, url) =>
            onChange({ profilePicture: file, profilePictureUrl: url })
          }
        />

        <PhotoUploader
          label="Cover Photo"
          info={<InfoOutlinedIcon sx={{ width: 15, height: 15 }} />}
          shape="rect"
          width={1}
          disabled={form.cardLayout === "Portrait"}
          disabledMessage="Unavailable in Portrait"
          justContent="center"
          // value={form.coverPhotoUrl}
        />

        <PhotoUploader
          label="Company Logo"
          info={<InfoOutlinedIcon sx={{ width: 15, height: 15 }} />}
          shape="circle"
          // value={form.logoUrl}
        />
      </Stack>

      {/* ── Name + Pronouns + Location row ── */}
      <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap", mb: 2 }}>
        <Box sx={{ flex: 1, minWidth: 160 }}>
          <FormField label="Name" direction={"column"} alignItem="flex-start">
            <Stack
              direction="row"
              spacing={0.5}
              sx={{
                alignItems: "center",
                bgcolor: "#F2F1F5", // Background of the whole field
                borderRadius: "12px", // Outer rounded corners
                px: 0.8, // Padding so the button doesn't touch the edge
                height: 50, // Slightly taller to match the image scale
                border: "1px solid transparent",
                transition: "all 0.2s",
                "&:focus-within": {
                  bgcolor: "#FFFFFF",
                  borderColor: "#6B3FA0",
                  boxShadow: "0 0 0 1px #6B3FA0",
                },
              }}
            >
              <StyledInput
                value={form.name}
                onChange={(e) => onChange({ name: e.target.value })}
                placeholder="Name"
                sx={{
                  bgcolor: "transparent", // Remove internal background
                  border: "none", // Remove internal border
                  height: "100%",
                  "&.Mui-focused": { bgcolor: "transparent", border: "none" }, // Disable focus styles
                  "& input": { px: 1 },
                }}
              />
              <Button
                size="small"
                disableElevation
                startIcon={<AddIcon sx={{ fontSize: "18px !important" }} />}
                sx={{
                  borderRadius: "20px", // Pill shape
                  bgcolor: "#FFFFFF", // White background for the chip
                  color: "#1E1A28",
                  fontSize: 13,
                  fontWeight: 600,
                  textTransform: "none",
                  px: 2,
                  py: 0.5,
                  height: 32, // Smaller than the container height
                  boxShadow: "0px 2px 4px rgba(0,0,0,0.05)", // Soft shadow like image
                  flexShrink: 0,
                  "& .MuiButton-startIcon": { mr: 0.5 },
                  "&:hover": { bgcolor: "#FDFBFF" },
                }}
              >
                Pronouns
              </Button>
            </Stack>
          </FormField>
        </Box>

        <Box sx={{ flex: 1, minWidth: 160 }}>
          <FormField
            label="Location"
            direction={"column"}
            alignItem="flex-start"
          >
            <StyledInput
              value={form.location}
              onChange={(e) => onChange({ location: e.target.value })}
              placeholder="Location"
            />
          </FormField>
        </Box>
      </Stack>

      {/* ── Job Title + Company row ── */}
      <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap", mb: 2 }}>
        <Box sx={{ flex: 1, minWidth: 160 }}>
          <FormField
            label="Job Title"
            alignItem="flex-start"
            direction={"column"}
          >
            <StyledInput
              value={form.jobTitle}
              onChange={(e) => onChange({ jobTitle: e.target.value })}
              placeholder="Job Title"
            />
          </FormField>
        </Box>

        <Box sx={{ flex: 1, minWidth: 160 }}>
          <FormField
            label="Company"
            alignItem="flex-start"
            direction={"column"}
          >
            <StyledInput
              value={form.company}
              onChange={(e) => onChange({ company: e.target.value })}
              placeholder="Company"
            />
          </FormField>
        </Box>
      </Stack>

      {/* ── Bio ── */}
      <Box sx={{ mb: 3 }}>
        <FormField label="Bio" alignItem="flex-start" direction={"column"}>
          <StyledInput
            value={form.bio}
            onChange={(e) => onChange({ bio: e.target.value })}
            placeholder="Bio"
            multiline
            rows={3}
          />
        </FormField>
      </Box>

      {/* ── Choose theme ── */}
      <Typography
        sx={{ fontSize: 13, fontWeight: 600, color: "#1E1A28", mb: 1 }}
      >
        Choose theme
      </Typography>

      <Box
        sx={{
          border: "1px solid #E8E6F0",
          borderRadius: "12px",
          px: 2,
          py: 0.5,
          mb: 2.5,
        }}
      >
        <ColorRow
          label="Card Theme"
          selected={form.cardTheme}
          onSelect={(v) => onChange({ cardTheme: v })}
        />
        <Divider sx={{ borderColor: "#F0EEF8" }} />
        <ColorRow
          label="Link Color"
          selected={form.linkColor}
          onSelect={(v) => onChange({ linkColor: v })}
        />
        <Divider sx={{ borderColor: "#F0EEF8" }} />

        {/* Match link icons toggle */}
        <Stack
          direction="row"
          sx={{ alignItems: "center", justifyContent: "space-between", py: 1 }}
        >
          <Typography
            sx={{ fontSize: 12.5, color: "#3D3A4A", fontWeight: 500 }}
          >
            Match Link Icons to Card Theme
          </Typography>
          <Switch
            checked={form.matchLinkIcons}
            onChange={(e) => onChange({ matchLinkIcons: e.target.checked })}
            size="small"
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": { color: "#6B3FA0" },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                bgcolor: "#6B3FA0",
              },
            }}
          />
        </Stack>
      </Box>

      {/* ── Choose font ── */}
      <Typography
        sx={{ fontSize: 13, fontWeight: 600, color: "#1E1A28", mb: 1 }}
      >
        Choose Font
      </Typography>

      <Box
        sx={{
          border: "1px solid #E8E6F0",
          borderRadius: "12px",
          px: 2,
          py: 1.5,
          mb: 3,
        }}
      >
        <Select
          value={form.font}
          onChange={(e) => onChange({ font: e.target.value })}
          fullWidth
          size="small"
          IconComponent={KeyboardArrowDownRoundedIcon}
          renderValue={(val) => (
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Chip
                label={
                  FONT_OPTIONS.find((f) => f.value === val)?.label ?? "DEFAULT"
                }
                size="small"
                sx={{
                  bgcolor: "#5B2D9E",
                  color: "#fff",
                  fontSize: 11,
                  fontWeight: 700,
                  height: 22,
                  borderRadius: "4px",
                }}
              />
            </Stack>
          )}
          sx={{
            bgcolor: "#FFFFFF",
            border: "none",
            fontSize: 13.5,
            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
            "& .MuiSelect-icon": { fontSize: 18, color: "#9896A6" },
          }}
        >
          {FONT_OPTIONS.map((f) => (
            <MenuItem key={f.value} value={f.value} sx={{ fontSize: 13.5 }}>
              {f.label}
            </MenuItem>
          ))}
        </Select>

        <Typography
          sx={{ fontSize: 10.5, color: "#A09EB8", mt: 1, lineHeight: 1.5 }}
        >
          Custom Fonts Will Be Applied When Sharing Your Card. They Are Not Yet
          Available In The Mobile App.
        </Typography>
      </Box>
    </Box>
  );
}

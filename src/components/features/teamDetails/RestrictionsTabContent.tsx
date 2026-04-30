"use client";

import { Box, Typography } from "@mui/material";
import { RestrictionToggleRow } from "./RestrictionToggleRow";
import type {
  TeamRestrictionsFormData,
  RestrictionsTab,
  AboutRestrictions,
  ContentRestrictions,
  QRCodeRestrictions,
  SettingsRestrictions,
} from "@/components/pages/businessAdminDashboard/teams/constants/teamDetail";

interface RestrictionsTabContentProps {
  activeTab: RestrictionsTab;
  form: TeamRestrictionsFormData;
  onChange: (patch: Partial<TeamRestrictionsFormData>) => void;
}

export function RestrictionsTabContent({
  activeTab,
  form,
  onChange,
}: RestrictionsTabContentProps) {
  const locked = form.lockAll;

  // ── About tab ──
  if (activeTab === "about") {
    const rows: { key: keyof AboutRestrictions; label: string }[] = [
      { key: "profilePicture", label: "Profile Picture" },
      { key: "name", label: "Name" },
      { key: "jobTitle", label: "Job Title" },
      { key: "bio", label: "Bio" },
      { key: "location", label: "Location" },
      { key: "companyLogo", label: "Company Logo" },
      { key: "cardColor", label: "Card Color" },
      { key: "pronouns", label: "Pronouns" },
    ];

    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {/* Description banner */}
        <Box
          sx={{
            bgcolor: "#F3F2F6",
            borderRadius: "10px",
            px: 2,
            py: 1.5,
            mb: 0.5,
          }}
        >
          <Typography
            sx={{ fontSize: 13, color: "#7B7892", textAlign: "center" }}
          >
            Restrict the ability for members to change fields in the about
            section of their card
          </Typography>
        </Box>

        {rows.map(({ key, label }) => (
          <RestrictionToggleRow
            key={key}
            label={label}
            checked={locked || form.about[key]}
            disabled={locked}
            onChange={(val) =>
              onChange({ about: { ...form.about, [key]: val } })
            }
          />
        ))}
      </Box>
    );
  }

  // ── Content tab ──
  if (activeTab === "content") {
    const rows: { key: keyof ContentRestrictions; label: string }[] = [
      { key: "links", label: "Links" },
      { key: "socialLinks", label: "Social Links" },
      { key: "files", label: "Files" },
    ];

    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Box
          sx={{
            bgcolor: "#F3F2F6",
            borderRadius: "10px",
            px: 2,
            py: 1.5,
            mb: 0.5,
          }}
        >
          <Typography
            sx={{ fontSize: 13, color: "#7B7892", textAlign: "center" }}
          >
            Restrict the ability for members to change content links and files
          </Typography>
        </Box>
        {rows.map(({ key, label }) => (
          <RestrictionToggleRow
            key={key}
            label={label}
            checked={locked || form.content[key]}
            disabled={locked}
            onChange={(val) =>
              onChange({ content: { ...form.content, [key]: val } })
            }
          />
        ))}
      </Box>
    );
  }

  // ── QR Code tab ──
  if (activeTab === "qr-code") {
    const rows: { key: keyof QRCodeRestrictions; label: string }[] = [
      { key: "qrColor", label: "QR Color" },
      { key: "qrLogo", label: "QR Logo" },
    ];

    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Box
          sx={{
            bgcolor: "#F3F2F6",
            borderRadius: "10px",
            px: 2,
            py: 1.5,
            mb: 0.5,
          }}
        >
          <Typography
            sx={{ fontSize: 13, color: "#7B7892", textAlign: "center" }}
          >
            Restrict the ability for members to change their QR Code settings
          </Typography>
        </Box>
        {rows.map(({ key, label }) => (
          <RestrictionToggleRow
            key={key}
            label={label}
            checked={locked || form.qrCode[key]}
            disabled={locked}
            onChange={(val) =>
              onChange({ qrCode: { ...form.qrCode, [key]: val } })
            }
          />
        ))}
      </Box>
    );
  }

  // ── Settings tab ──
  if (activeTab === "settings") {
    const rows: { key: keyof SettingsRestrictions; label: string }[] = [
      { key: "leadCapture", label: "Lead Capture" },
      { key: "followUpEmail", label: "Follow Up Email" },
      { key: "virtualBackground", label: "Virtual Background" },
    ];

    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Box
          sx={{
            bgcolor: "#F3F2F6",
            borderRadius: "10px",
            px: 2,
            py: 1.5,
            mb: 0.5,
          }}
        >
          <Typography
            sx={{ fontSize: 13, color: "#7B7892", textAlign: "center" }}
          >
            Restrict access to feature settings for team members
          </Typography>
        </Box>
        {rows.map(({ key, label }) => (
          <RestrictionToggleRow
            key={key}
            label={label}
            checked={locked || form.settings[key]}
            disabled={locked}
            onChange={(val) =>
              onChange({ settings: { ...form.settings, [key]: val } })
            }
          />
        ))}
      </Box>
    );
  }

  return null;
}

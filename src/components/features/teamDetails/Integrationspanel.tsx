"use client";

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import {
  PanelTitle,
  PillButton,
  IntegrationTile,
  IntegrationIconBox,
  TD_COLORS,
  TD_RADII,
} from "@/components/pages/businessAdminDashboard/teams/constants/Teamdetailprimitives";
import {
  INTEGRATION_TABS,
  INTEGRATION_SECTIONS,
  type IntegrationTab,
  type Integration,
} from "@/components/pages/businessAdminDashboard/teams/constants/Integrationsconstants";

// ─── Pill tab bar ─────────────────────────────────────────────────────────────
function IntegrationTabBar({
  active,
  onChange,
}: {
  active: IntegrationTab;
  onChange: (tab: IntegrationTab) => void;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        border: `1.5px solid ${TD_COLORS.cardBorder}`,
        borderRadius: TD_RADII.full,
        overflow: "hidden",
        bgcolor: "#F3F2F6",
        mb: 3,
        width: "fit-content",
      }}
    >
      {INTEGRATION_TABS.map((tab) => {
        const isActive = active === tab.id;
        return (
          <Box
            key={tab.id}
            onClick={() => onChange(tab.id)}
            sx={{
              px: 2.5,
              py: 0.9,
              fontSize: 13,
              fontWeight: isActive ? 700 : 500,
              color: isActive ? "#FFFFFF" : TD_COLORS.textSecondary,
              bgcolor: isActive ? TD_COLORS.brand : "transparent",
              borderRadius: TD_RADII.full,
              cursor: "pointer",
              userSelect: "none",
              transition: "all 0.15s",
              whiteSpace: "nowrap",
              "&:hover": !isActive
                ? { color: TD_COLORS.textPrimary, bgcolor: "#ECEAF5" }
                : {},
            }}
          >
            {tab.label}
          </Box>
        );
      })}
    </Box>
  );
}

// ─── Single integration tile ──────────────────────────────────────────────────
function IntegrationCard({ item }: { item: Integration }) {
  // "Don't see your integration?" special card
  if (item.isRequestCard) {
    return (
      <IntegrationTile
        onClick={() => console.log("Request integration")}
        sx={{
          flexDirection: "row",
          alignItems: "center",
          gap: "12px",
          py: 2,
        }}
      >
        <IntegrationIconBox>
          <OpenInNewRoundedIcon
            sx={{ fontSize: 18, color: TD_COLORS.textMuted }}
          />
        </IntegrationIconBox>
        <Box sx={{ mt: 0.5 }}>
          <Typography
            sx={{
              fontSize: 12.5,
              fontWeight: 700,
              color: TD_COLORS.textPrimary,
              lineHeight: 1.3,
            }}
          >
           {`Don't see your integration?`}
          </Typography>
          <Typography
            sx={{ fontSize: 12, color: TD_COLORS.brand, fontWeight: 600 }}
          >
            Request one here
          </Typography>
        </Box>
      </IntegrationTile>
    );
  }

  return (
    <IntegrationTile onClick={() => console.log("Open integration:", item.id)}>
      <IntegrationIconBox>
        <HelpOutlineRoundedIcon
          sx={{ fontSize: 20, color: TD_COLORS.textMuted }}
        />
      </IntegrationIconBox>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: 13.5,
            fontWeight: 600,
            color: TD_COLORS.textPrimary,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item.name}
        </Typography>
        {item.locked && (
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 0.4, mt: 0.25 }}
          >
            <LockOutlinedIcon
              sx={{ fontSize: 11, color: TD_COLORS.textMuted }}
            />
            <Typography sx={{ fontSize: 11.5, color: TD_COLORS.textMuted }}>
              Upgrade to unlock
            </Typography>
          </Box>
        )}
      </Box>
    </IntegrationTile>
  );
}

// ─── Section block (title + description + 3-col grid) ────────────────────────
function IntegrationSectionBlock({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: Integration[];
}) {
  return (
    <Box sx={{ mb: 3.5 }}>
      <Typography
        sx={{
          fontSize: 15,
          fontWeight: 700,
          color: TD_COLORS.textPrimary,
          letterSpacing: "-0.01em",
          mb: 0.4,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: 12.5,
          color: TD_COLORS.textMuted,
          mb: 2,
          lineHeight: 1.5,
        }}
      >
        {description}
      </Typography>

      {/* 3-column grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1.2,
        }}
      >
        {items.map((item) => (
          <IntegrationCard key={item.id} item={item} />
        ))}
      </Box>
    </Box>
  );
}

// ─── Main panel ───────────────────────────────────────────────────────────────
interface IntegrationsPanelProps {
  onRequestIntegration?: () => void;
}

export function IntegrationsPanel({
  onRequestIntegration,
}: IntegrationsPanelProps) {
  const [activeTab, setActiveTab] = useState<IntegrationTab>("contact-sync");

  return (
    <Box>
      {/* Header row */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2.5,
          flexWrap: "wrap",
          gap: 1.5,
        }}
      >
        <PanelTitle sx={{ mb: 0 }}>Integrations</PanelTitle>

        <PillButton
          variant="ghost"
          startIcon={<AddRoundedIcon sx={{ fontSize: "15px !important" }} />}
          onClick={
            onRequestIntegration ?? (() => console.log("Request integration"))
          }
        >
          Request a Integration
        </PillButton>
      </Box>

      {/* Tab bar */}
      <IntegrationTabBar active={activeTab} onChange={setActiveTab} />

      {/* All sections — scroll through them all; tab just anchors into view */}
      {INTEGRATION_SECTIONS.map((section) => (
        <IntegrationSectionBlock
          key={section.tab}
          title={section.title}
          description={section.description}
          items={section.items}
        />
      ))}
    </Box>
  );
}

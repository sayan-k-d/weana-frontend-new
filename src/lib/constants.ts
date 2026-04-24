import React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import ControlPointDuplicateOutlinedIcon from "@mui/icons-material/ControlPointDuplicateOutlined";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";

import type {
  NavSection,
  Lead,
  FeatureCard,
  TeamMetric,
  OnboardingStep,
  Member,
} from "@/types";

// ─── Sidebar Navigation ───────────────────────────────────────────────────────

export const NAV_SECTIONS: NavSection[] = [
  {
    title: "Home",
    icon: React.createElement(HomeOutlinedIcon, { sx: { fontSize: 18 } }),
    path: "/home",
    active: true,
  },
  {
    title: "Company",
    icon: React.createElement(CorporateFareOutlinedIcon, {
      sx: { fontSize: 18 },
    }),
    items: [
      { label: "Members", path: "/members" },
      { label: "Teams", path: "/teams" },
      { label: "Templates", path: "/templates" },
    ],
  },
  {
    title: "Brand Assets",
    icon: React.createElement(InsightsOutlinedIcon, { sx: { fontSize: 18 } }),
    items: [
      { label: "Email Signatures", path: "/email-signatures" },
      { label: "Virtual Background", path: "/virtual-backgrounds" },
    ],
  },
  {
    title: "Network",
    icon: React.createElement(PeopleAltOutlinedIcon, { sx: { fontSize: 18 } }),
    items: [
      { label: "Contacts", path: "/contacts" },
      { label: "Events", path: "/events" },
    ],
  },
  {
    title: "Insights",
    icon: React.createElement(InsightsOutlinedIcon, { sx: { fontSize: 18 } }),
    items: [{ label: "Analytics", path: "/analytics" }],
  },
  {
    title: "Accessories",
    icon: React.createElement(AccessibilityNewIcon, { sx: { fontSize: 18 } }),
  },
  {
    title: "Team Notifications",
    icon: React.createElement(NotificationsNoneRoundedIcon, {
      sx: { fontSize: 18 },
    }),
  },
  {
    title: "Integrations",
    icon: React.createElement(IntegrationInstructionsIcon, {
      sx: { fontSize: 18 },
    }),
  },
];

// ─── Recent Leads ─────────────────────────────────────────────────────────────

export const LEADS: Lead[] = Array.from({ length: 9 }, (_, index) => ({
  id: index + 1,
  name: "William Anderson",
  date: "Mar 29, 2026",
}));

// ─── Feature Cards ────────────────────────────────────────────────────────────

export const FEATURE_CARDS: FeatureCard[] = [
  {
    title: "Email Signature",
    body: "Empower your team's communication and ensure branding consistency across all email interactions.",
  },
  {
    title: "Virtual Backgrounds",
    body: "Enable your team to attend virtual meetings with a professional and branded appearance.",
  },
  {
    title: "Virtual Backgrounds",
    body: "Enable your team to attend virtual meetings with a professional and branded appearance.",
  },
];

// ─── Team Performance Metrics ─────────────────────────────────────────────────

export const TEAM_METRICS: TeamMetric[] = [
  { value: "13", label: "Leads Captured" },
  { value: "31%", label: "Leads Synced or Exported", accent: true },
  { value: "$390", label: "Pipeline Generated" },
  { value: "4", label: "Views" },
];

// ─── Onboarding Steps ─────────────────────────────────────────────────────────

export const ONBOARDING_STEPS: OnboardingStep[] = [
  { step: 1, task: "Create your team" },
  { step: 2, task: "Set company info" },
  { step: 3, task: "Add members to your team" },
];
export const MEMBER_STEPS: OnboardingStep[] = [
  { step: 1, task: "Create your team" },
  { step: 2, task: "Set company info" },
  { step: 3, task: "Add members to your team" },
  { step: 4, task: "Go Live" },
];

// ─── Welcome Dialog — Goal Options ────────────────────────────────────────────

export const GOAL_OPTIONS = [
  {
    icon: React.createElement(TrendingUpRoundedIcon, { sx: { fontSize: 20 } }),
    label: "Increase Sales",
  },
  {
    icon: React.createElement(CampaignOutlinedIcon, { sx: { fontSize: 19 } }),
    label: "Build brand awareness",
  },
  {
    icon: React.createElement(PersonAddAlt1OutlinedIcon, {
      sx: { fontSize: 19 },
    }),
    label: "Generate leads",
  },
  {
    icon: React.createElement(ChatBubbleOutlineRoundedIcon, {
      sx: { fontSize: 19 },
    }),
    label: "Improve customer engagement",
  },
];

export const OTHER_GOAL_ICON = React.createElement(
  ControlPointDuplicateOutlinedIcon,
  { sx: { fontSize: 19, color: "#4E2A84" } },
);

// ─── Style helpers ────────────────────────────────────────────────────────────

export const WHITE_CARD_STYLES = {
  border: "1px solid #E7E6EE",
  borderRadius: "16px",
  boxShadow: "0 1px 2px rgba(23, 19, 33, 0.04)",
  bgcolor: "#FFFFFF",
} as const;

// ─── Member Constants ────────────────────────────────────────────────────────────

export const STEPS: string[] = [
  "Create your team",
  "Set company info",
  "Add members to your team",
  "Go Live",
];

export const initialMembers: Member[] = [
  {
    id: 1,
    name: "Diego",
    email: "diogel@gmail.com",
    template: "Designers G...",
    avatarUrl: "/images/mem1.jpg",
    teamColors: ["#6B3FA0", "#9B6DD0"],
    toggleOn: true,
  },
  {
    id: 2,
    name: "Oleg",
    email: "oleg@gmail.com",
    template: "Haitham",
    avatarUrl: "/images/mem2.jpg",
    teamColors: ["#6B3FA0", "#9B6DD0"],
    toggleOn: true,
  },
  {
    id: 3,
    name: "Aiony",
    email: "aiony@gmail.com",
    template: "Haitham",
    avatarUrl: "/images/mem3.jpg",
    teamColors: ["#6B3FA0"],
    toggleOn: false,
  },
  {
    id: 4,
    name: "Vicky",
    email: "vicky@gmail.com",
    template: "Haitham",
    avatarUrl: "/images/mem4.jpg",
    teamColors: [],
    toggleOn: false,
  },
];

// Member Columns

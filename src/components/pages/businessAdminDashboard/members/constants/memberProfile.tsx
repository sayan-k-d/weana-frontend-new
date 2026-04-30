import React from "react";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import QrCodeRoundedIcon from "@mui/icons-material/QrCodeRounded";
import WallpaperRoundedIcon from "@mui/icons-material/WallpaperRounded";
import DrawOutlinedIcon from "@mui/icons-material/DrawOutlined";
import ExtensionOutlinedIcon from "@mui/icons-material/ExtensionOutlined";

import type { SideMenuItem, ThemeColor, CardLayout } from "@/types";

// ─── Side menu ────────────────────────────────────────────────────────────────

export const SIDE_MENU_ITEMS: SideMenuItem[] = [
  {
    id: "about",
    label: "About",
    section: "CONTENT",
    icon: React.createElement(PersonOutlineRoundedIcon, {
      sx: { fontSize: 15 },
    }),
  },
  {
    id: "links",
    label: "Links",
    section: "CONTENT",
    icon: React.createElement(LinkRoundedIcon, { sx: { fontSize: 15 } }),
  },
  {
    id: "lead-capture-form",
    label: "Lead Capture Form",
    section: "LEAD CAPTURE",
    icon: React.createElement(AssignmentOutlinedIcon, { sx: { fontSize: 15 } }),
  },
  {
    id: "follow-up-email",
    label: "Follow Up Email",
    section: "LEAD CAPTURE",
    icon: React.createElement(MailOutlineRoundedIcon, { sx: { fontSize: 15 } }),
  },
  {
    id: "qr-code",
    label: "QR Code",
    section: "SHARING",
    icon: React.createElement(QrCodeRoundedIcon, { sx: { fontSize: 15 } }),
  },
  {
    id: "virtual-background",
    label: "Virtual Background",
    section: "SHARING",
    icon: React.createElement(WallpaperRoundedIcon, { sx: { fontSize: 15 } }),
  },
  {
    id: "email-signature",
    label: "Email Signature",
    section: "SHARING",
    icon: React.createElement(DrawOutlinedIcon, { sx: { fontSize: 15 } }),
  },
  {
    id: "accessories",
    label: "Accessories",
    section: "SHARING",
    icon: React.createElement(ExtensionOutlinedIcon, { sx: { fontSize: 15 } }),
  },
];

export const MENU_SECTIONS: SideMenuItem["section"][] = [
  "CONTENT",
  "LEAD CAPTURE",
  "SHARING",
];

// ─── Theme & link colors ──────────────────────────────────────────────────────

export const THEME_COLORS: ThemeColor[] = [
  { value: "none", label: "None" },
  { value: "#111111", label: "Black" },
  { value: "#E05252", label: "Red" },
  { value: "#F5943A", label: "Orange" },
  { value: "#F5C842", label: "Yellow" },
  { value: "#3CB96B", label: "Green" },
  { value: "#3A8FF5", label: "Blue" },
  { value: "#9B51E0", label: "Purple" },
];

// ─── Card layouts ─────────────────────────────────────────────────────────────

export const CARD_LAYOUTS: CardLayout[] = ["Portrait", "Landscape", "Square"];

// ─── Font options ─────────────────────────────────────────────────────────────

export const FONT_OPTIONS = [
  { value: "default", label: "DEFAULT" },
  { value: "serif", label: "Serif" },
  { value: "mono", label: "Mono" },
];

// ─── Default form state ───────────────────────────────────────────────────────

export const DEFAULT_FORM: import("@/types").MemberProfileFormData = {
  cardName: "Diego",
  cardLayout: "Portrait",
  profilePicture: null,
  profilePictureUrl: "https://i.pravatar.cc/150?img=11",
  name: "Diego",
  email: "abc@gmail.com",
  pronouns: "",
  location: "",
  jobTitle: "",
  company: "",
  bio: "",
  cardTheme: "none",
  linkColor: "none",
  matchLinkIcons: false,
  font: "default",
};

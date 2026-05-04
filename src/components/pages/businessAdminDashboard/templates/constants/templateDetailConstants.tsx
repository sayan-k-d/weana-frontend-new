import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import QrCode2RoundedIcon from "@mui/icons-material/QrCode2Rounded";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

// ─── Section IDs ──────────────────────────────────────────────────────────────
export type TemplateSectionId =
  | "about"
  | "links"
  | "qr-code"
  | "contact-capture-form"
  | "follow-up-email"
  | "settings";

// ─── Sidebar item definition ──────────────────────────────────────────────────
export interface TemplateSideMenuItem {
  id: TemplateSectionId;
  label: string;
  icon: React.ReactNode;
}

export const TEMPLATE_SIDE_MENU_ITEMS: TemplateSideMenuItem[] = [
  {
    id: "about",
    label: "About",
    icon: <PersonOutlineRoundedIcon sx={{ fontSize: 17 }} />,
  },
  {
    id: "links",
    label: "Links",
    icon: <LinkRoundedIcon sx={{ fontSize: 17 }} />,
  },
  {
    id: "qr-code",
    label: "QR Code",
    icon: <QrCode2RoundedIcon sx={{ fontSize: 17 }} />,
  },
  {
    id: "contact-capture-form",
    label: "Contact Capture Form",
    icon: <FilterAltOutlinedIcon sx={{ fontSize: 17 }} />,
  },
  {
    id: "follow-up-email",
    label: "Follow Up Email",
    icon: <MailOutlineRoundedIcon sx={{ fontSize: 17 }} />,
  },
  {
    id: "settings",
    label: "Settings",
    icon: <SettingsOutlinedIcon sx={{ fontSize: 17 }} />,
  },
];

// ─── Template Settings form data ──────────────────────────────────────────────
export interface TemplateSettingsFormData {
  allowNonAdminAssign: boolean;
}

export const DEFAULT_TEMPLATE_SETTINGS: TemplateSettingsFormData = {
  allowNonAdminAssign: false,
};

// ─── Sections that own their own footer ───────────────────────────────────────
export const TEMPLATE_SELF_MANAGED_FOOTER: TemplateSectionId[] = [
  "follow-up-email",
  "qr-code",
];

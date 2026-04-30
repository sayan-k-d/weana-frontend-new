export type TeamDetailSectionId =
  | "edit-members"
  | "general"
  | "restrictions"
  | "template-auto-assign"
  | "integrations"
  | "view-members";

export interface TeamMember {
  id: number;
  email: string;
  name?: string;
  avatarUrl?: string;
  role?: "FULL TEAM ADMIN" | "MEMBER";
  partOfTeam: boolean;
}

export interface TeamDetailData {
  id: number;
  name: string; // e.g. "Sales Department"
  color: string;
  members: TeamMember[];
}

// ── General ───────────────────────────────────────────────────────────────────
export interface TeamGeneralFormData {
  logoUrl: string | null;
  logoFile: File | null;
  teamName: string;
  description: string;
}

export const DEFAULT_TEAM_GENERAL_FORM: TeamGeneralFormData = {
  logoUrl: null,
  logoFile: null,
  teamName: "Sales Department",
  description: "",
};

// ── Restrictions ──────────────────────────────────────────────────────────────
export type RestrictionsTab = "about" | "content" | "qr-code" | "settings";

export interface AboutRestrictions {
  profilePicture: boolean;
  name: boolean;
  jobTitle: boolean;
  bio: boolean;
  location: boolean;
  companyLogo: boolean;
  cardColor: boolean;
  pronouns: boolean;
}

export interface ContentRestrictions {
  links: boolean;
  socialLinks: boolean;
  files: boolean;
}

export interface QRCodeRestrictions {
  qrColor: boolean;
  qrLogo: boolean;
}

export interface SettingsRestrictions {
  leadCapture: boolean;
  followUpEmail: boolean;
  virtualBackground: boolean;
}

export interface TeamRestrictionsFormData {
  allowChangeRequests: boolean;
  lockAll: boolean;
  activeTab: RestrictionsTab;
  about: AboutRestrictions;
  content: ContentRestrictions;
  qrCode: QRCodeRestrictions;
  settings: SettingsRestrictions;
}

export const DEFAULT_TEAM_RESTRICTIONS_FORM: TeamRestrictionsFormData = {
  allowChangeRequests: true,
  lockAll: false,
  activeTab: "about",
  about: {
    profilePicture: false,
    name: false,
    jobTitle: false,
    bio: false,
    location: false,
    companyLogo: false,
    cardColor: false,
    pronouns: false,
  },
  content: {
    links: false,
    socialLinks: false,
    files: false,
  },
  qrCode: {
    qrColor: false,
    qrLogo: false,
  },
  settings: {
    leadCapture: false,
    followUpEmail: false,
    virtualBackground: false,
  },
};

// ─── Navigation ───────────────────────────────────────────────────────────────

export type NavItem = {
  label: string;
  path: string;
};

export type NavSection = {
  title: string;
  icon?: React.ReactNode;
  items?: NavItem[];
  active?: boolean;
  path?: string; // For sections without dropdowns
};

// ─── Dashboard ────────────────────────────────────────────────────────────────

export type Lead = {
  id: number;
  name: string;
  date: string;
};

export type FeatureCard = {
  title: string;
  body: string;
};

export type TeamMetric = {
  value: string;
  label: string;
  accent?: boolean;
};

// ─── Onboarding ───────────────────────────────────────────────────────────────

export type GoalOption = {
  icon: React.ReactNode;
  label: string;
  fullWidth?: boolean;
};

export type OnboardingStep = {
  step: number;
  task: string;
};

// ─── User & Auth ─────────────────────────────────────────────────────
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  workspaceId: string;
  createdAt: string;
}

export type UserRole = "owner" | "admin" | "member";

// ─── Members Screen Types ─────────────────────────────────────────────────────

export interface Member {
  id: number;
  name: string;
  email: string;
  status: string;
  template: string;
  avatarUrl: string;
  teamColors: string[];
  toggleOn: boolean;
}

export type ViewMode = "list" | "grid";

export interface TeamBadgeProps {
  colors: string[];
  showSettings?: boolean;
  onToggle?: () => void;
}

export interface OnboardingBannerProps {
  onDismiss: () => void;
}

// export interface AddMethod {
//   id: string;
//   label: string;
//   icon: React.ReactNode;
// }

export interface PanelContent {
  title: string;
  description: string;
  inputPlaceholder: string;
  buttonLabel: string;
  showEmailCheckbox: boolean;
}

// ─── Add Members — Shared Types ───────────────────────────────────────────────

export type MethodId =
  | "email"
  | "csv"
  | "company"
  | "activedirectory"
  | "eventbrite";

export interface AddMethod {
  id: MethodId;
  label: string;
  icon?: React.ReactNode;
}

// ─── Member Profile — Shared Types ───────────────────────────────────────────

export type CardLayout = "Portrait" | "Landscape" | "Square";

export type SideMenuSection = "CONTENT" | "LEAD CAPTURE" | "SHARING";

export type SideMenuItemId =
  | "about"
  | "links"
  | "lead-capture-form"
  | "follow-up-email"
  | "qr-code"
  | "virtual-background"
  | "email-signature"
  | "accessories";

export interface SideMenuItem {
  id: SideMenuItemId;
  label: string;
  section: SideMenuSection;
  icon: React.ReactNode;
}

export interface ThemeColor {
  value: string;
  label: string;
}

export interface MemberProfileFormData {
  cardName: string;
  cardLayout: CardLayout;
  profilePicture: File | null;
  profilePictureUrl: string | null;
  name: string;
  email: string;
  pronouns: string;
  location: string;
  jobTitle: string;
  company: string;
  bio: string;
  cardTheme: string;
  linkColor: string;
  matchLinkIcons: boolean;
  font: string;
}

// ─── Directory Screen Types ─────────────────────────────────────────────────────

export interface Directory {
  id: number;
  name: string;
  email: string;
  status: string;
  role: string;
  avatarUrl?: string;
  number_of_cards: number;
}

// ─── Teams Screen Types ─────────────────────────────────────────────────────

export interface Team {
  id: number;
  avatarUrl?: string;
  department: Department;
  membersCount?: number;
  teamColors: string[];
}

export interface Department {
  id: number;
  name: string;
  color?: string;
}

export interface AddTeamDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: AddTeamFormData) => void;
}

export interface AddTeamFormData {
  logo: File | null;
  teamName: string;
  description: string;
}

// ─── Email Signature Screen Types ─────────────────────────────────────────────────────

export type ToggleKey =
  | "name"
  | "pronouns"
  | "jobTitle"
  | "companyName"
  | "jobTitle2"
  | "companyName2"
  | "profilePic";


  export type FormState = {
    type: string,
    email: string;
    password: string;
  };
  export type FormErrors = Partial<FormState>;
  
  export type RegisterPayload = {
    type: string;
    email: string;
    password: string;
  
    name?: string;
    job_title?: string;
    company?: string;
    additional_email?: string;
    mobile?: string;
  
    recommended_links?: {
      title: string;
      value: string;
      type: string;
    }[];
  };
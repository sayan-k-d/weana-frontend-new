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

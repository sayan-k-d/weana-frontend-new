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

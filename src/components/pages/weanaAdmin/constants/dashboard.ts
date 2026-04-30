// ─── Admin Dashboard Types ────────────────────────────────────────────────────

export type AdminSidebarItemId =
  | "admin-dashboard"
  | "admin-users"
  | "roles-permissions"
  | "cms"
  | "email-signature"
  | "shop-items"
  | "insights"
  | "accessories"
  | "integrations";

export interface AdminSidebarItem {
  id: AdminSidebarItemId;
  label: string;
  /** MUI icon component name — resolved at usage site */
  iconKey: string;
  href?: string;
}

export interface StatCardData {
  id: string;
  label: string;
  value: string;
  change: number; // positive = up, negative = down
  changeLabel: string; // e.g. "this month"
}

export interface AccessoryRow {
  id: number;
  logoLabel: string;
  logoBg: string;
  name: string;
  status: "Activated" | "Pending" | "Deactivated";
  activatedDate: string;
}

export interface RecentContact {
  id: number;
  name: string;
  subtitle: string;
  avatarInitials: string;
  avatarColor: string;
  date: string;
}

export interface UserGrowthBar {
  label: string;
  value: number;
}

export interface TeamActivityPoint {
  day: string;
  value: number;
}

// ─── Mock constants ───────────────────────────────────────────────────────────

export const ADMIN_STAT_CARDS: StatCardData[] = [
  {
    id: "individual-users",
    label: "Total Individual Users",
    value: "10,345",
    change: 8.2,
    changeLabel: "this month",
  },
  {
    id: "business-users",
    label: "Total Business Users",
    value: "2,136",
    change: 4.6,
    changeLabel: "this month",
  },
  {
    id: "templates",
    label: "Templates Created",
    value: "1,284",
    change: 5.1,
    changeLabel: "new today",
  },
  {
    id: "active-teams",
    label: "Active Teams",
    value: "342",
    change: 6,
    changeLabel: "this week",
  },
  {
    id: "contacts",
    label: "Total Contacts",
    value: "58,210",
    change: 1240,
    changeLabel: "added",
  },
  {
    id: "accessories",
    label: "Accessories Assigned",
    value: "4,876",
    change: -2.3,
    changeLabel: "this week",
  },
];

export const USER_GROWTH_DATA: UserGrowthBar[] = [
  { label: "Test", value: 36 },
  { label: "Test", value: 11 },
  { label: "Test", value: 57 },
  { label: "Test", value: 10 },
  { label: "Test", value: 30 },
  { label: "Test", value: 91 },
  { label: "Test", value: 15 },
  { label: "Test", value: 93 },
  { label: "Test", value: 45 },
  { label: "Test", value: 79 },
];

export const TEAM_ACTIVITY_DATA: TeamActivityPoint[] = [
  { day: "MON", value: 800 },
  { day: "TUE", value: 1800 },
  { day: "WED", value: 4200 },
  { day: "THU", value: 2200 },
  { day: "FRI", value: 3800 },
  { day: "SAT", value: 3000 },
  { day: "SUN", value: 2900 },
];

export const RECENT_CONTACTS: RecentContact[] = Array.from(
  { length: 9 },
  (_, i) => ({
    id: i + 1,
    name: "William Anderson",
    subtitle: "Connect with null",
    avatarInitials: "WA",
    avatarColor: "#E84040",
    date: "Mar 29, 2026",
  }),
);

export const ACCESSORIES_DATA: AccessoryRow[] = [
  {
    id: 1,
    logoLabel: "LOGO",
    logoBg: "#2C2B3A",
    name: "Test Card",
    status: "Activated",
    activatedDate: "May 23, 2023",
  },
  {
    id: 2,
    logoLabel: "LOGO",
    logoBg: "#3D3C4E",
    name: "Test Card 2",
    status: "Pending",
    activatedDate: "April 12, 2023",
  },
  {
    id: 3,
    logoLabel: "LOGO",
    logoBg: "#4A4860",
    name: "Test Card 3",
    status: "Deactivated",
    activatedDate: "April 12, 2023",
  },
];

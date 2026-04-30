import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import WebOutlinedIcon from "@mui/icons-material/WebOutlined";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import ExtensionOutlinedIcon from "@mui/icons-material/ExtensionOutlined";
import PowerInputRoundedIcon from "@mui/icons-material/PowerInputRounded";

export interface AdminNavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  /** Renders a divider BELOW this item */
  dividerAfter?: boolean;
}

/**
 * Single flat list of admin nav items.
 * Paths must match your Next.js app router structure exactly —
 * e.g. /admin/dashboard maps to app/admin/dashboard/page.tsx
 */
export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  {
    label: "Admin Dashboard",
    path: "/weana-admin-dashboard",
    icon: <DashboardOutlinedIcon sx={{ fontSize: 18 }} />,
  },
  {
    label: "Admin Users",
    path: "/admin/users",
    icon: <PeopleOutlineRoundedIcon sx={{ fontSize: 18 }} />,
  },
  {
    label: "Roles & Permissions",
    path: "/admin/roles",
    icon: <AdminPanelSettingsOutlinedIcon sx={{ fontSize: 18 }} />,
  },
  {
    label: "CMS",
    path: "/admin/cms",
    icon: <WebOutlinedIcon sx={{ fontSize: 18 }} />,
  },
  {
    label: "Email Signature",
    path: "/admin/email-signature",
    icon: <MailOutlineRoundedIcon sx={{ fontSize: 18 }} />,
  },
  {
    label: "Shop Items",
    path: "/admin/shop",
    icon: <ShoppingBagOutlinedIcon sx={{ fontSize: 18 }} />,
  },
  {
    label: "Insights",
    path: "/admin/insights",
    icon: <BarChartRoundedIcon sx={{ fontSize: 18 }} />,
  },
  {
    label: "Accessories",
    path: "/admin/accessories",
    icon: <ExtensionOutlinedIcon sx={{ fontSize: 18 }} />,
    dividerAfter: true, // separator before Integrations
  },
  {
    label: "Integrations",
    path: "/admin/integrations",
    icon: <PowerInputRoundedIcon sx={{ fontSize: 18 }} />,
  },
];

export const ADMIN_UTILITY_ITEMS = [
  {
    label: "Help Center",
    path: "/admin/help",
  },
  {
    label: "Settings",
    path: "/admin/settings",
  },
] as const;

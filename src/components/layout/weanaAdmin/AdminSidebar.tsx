"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { cmsAdminLogin } from "@/services/cmsService";
import { Box, Divider, Stack, Tooltip, Typography } from "@mui/material";
import KeyboardDoubleArrowLeftRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import {
  ADMIN_COLORS,
  ADMIN_FONT,
  ADMIN_RADII,
} from "@/components/pages/weanaAdmin/constants/tokens";
import {
  ADMIN_NAV_ITEMS,
  ADMIN_UTILITY_ITEMS,
} from "@/components/pages/weanaAdmin/constants/Adminnavconstants";
import { AdminAvatar } from "@/components/pages/weanaAdmin/sections/dashboard/Primitives";

// ─── Constants ─────────────────────────────────────────────────────────────────
const SIDEBAR_EXPANDED_WIDTH = 220;
const SIDEBAR_COLLAPSED_WIDTH = 64;

// ─── Collapse toggle button ────────────────────────────────────────────────────
function CollapseToggle({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  return (
    <Tooltip
      title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      placement="right"
    >
      <Box
        onClick={onToggle}
        sx={{
          width: 28,
          height: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: ADMIN_RADII.sm,
          cursor: "pointer",
          color: ADMIN_COLORS.textMuted,
          flexShrink: 0,
          "&:hover": {
            bgcolor: ADMIN_COLORS.brandLight,
            color: ADMIN_COLORS.brand,
          },
          transition: "all 0.15s",
        }}
      >
        {collapsed ? (
          <KeyboardDoubleArrowRightRoundedIcon sx={{ fontSize: 16 }} />
        ) : (
          <KeyboardDoubleArrowLeftRoundedIcon sx={{ fontSize: 16 }} />
        )}
      </Box>
    </Tooltip>
  );
}

// ─── Single nav row ────────────────────────────────────────────────────────────
function NavRow({
  icon,
  label,
  isActive,
  collapsed,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  collapsed: boolean;
  onClick: () => void;
}) {
  const row = (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.3,
        px: 1.2,
        py: 0.95,
        borderRadius: ADMIN_RADII.sm,
        cursor: "pointer",
        justifyContent: collapsed ? "center" : "flex-start",
        bgcolor: isActive ? ADMIN_COLORS.sidebarActiveBg : "transparent",
        transition: "background 0.13s",
        "&:hover": {
          bgcolor: isActive
            ? ADMIN_COLORS.sidebarActiveBg
            : ADMIN_COLORS.sidebarHoverBg,
        },
      }}
    >
      {/* Icon */}
      <Box
        sx={{
          color: isActive ? "#6B3FA0" : "#512B7A",
          display: "flex",
          alignItems: "center",
          flexShrink: 0,
          transition: "color 0.13s",
        }}
      >
        {icon}
      </Box>

      {/* Label — hidden when collapsed */}
      {!collapsed && (
        <Typography
          sx={{
            fontSize: ADMIN_FONT.sizes.base,
            fontWeight: isActive
              ? ADMIN_FONT.weights.semibold
              : ADMIN_FONT.weights.medium,
            color: isActive ? "#6B3FA0" : "#512B7A",
            letterSpacing: "-0.01em",
            lineHeight: 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            transition: "color 0.13s",
          }}
        >
          {label}
        </Typography>
      )}
    </Box>
  );

  // When collapsed, wrap in tooltip so the label is still accessible
  if (collapsed) {
    return (
      <Tooltip title={label} placement="right">
        {row}
      </Tooltip>
    );
  }

  return row;
}

// ─── Exported sidebar ─────────────────────────────────────────────────────────
/**
 * Self-contained sidebar for layout.tsx.
 * Uses usePathname for active state — no props required.
 * Drop this into your layout and it just works.
 */
export function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [loadingPath, setLoadingPath] = useState<string | null>(null);

  const isActive = (path: string) =>
    pathname === path || (path.length > 1 && pathname.startsWith(`${path}/`));

  const handleNavClick = async (path: string) => {
    if (path === "/admin/cms" || path === "/admin/shop") {
      if (loadingPath) return;
      setLoadingPath(path);
      try {
        const { success, redirect } = await cmsAdminLogin();
        if (success) {
          const url =
            path === "/admin/shop"
              ? `${redirect}edit.php?post_type=product`
              : redirect;
          window.open(url, "_blank");
        }
      } finally {
        setLoadingPath(null);
      }
      return;
    }
    router.push(path);
  };

  return (
    <Box
      sx={{
        width: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_EXPANDED_WIDTH,
        minHeight: "100vh",
        height: "100%",
        bgcolor: ADMIN_COLORS.sidebarBg,
        borderRight: `1px solid ${ADMIN_COLORS.cardBorder}`,
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        transition: "width 0.22s ease",
        overflowX: "hidden",
        // Sticky so sidebar stays while content scrolls
        position: "sticky",
        top: 0,
      }}
    >
      {/* ── Logo + collapse toggle ── */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          px: collapsed ? 1 : 2,
          pt: 2.5,
          pb: 2,
          flexShrink: 0,
        }}
      >
        {!collapsed && (
          // Replace with <Image> once you have the asset
          // <Image src="/images/weanalogo.png" alt="Weana" width={79} height={42} priority />
          <Image
            src="/images/weanalogo.png"
            alt="Weana"
            width={79}
            height={58}
            priority
            style={{ objectFit: "contain", flexShrink: 0 }}
          />
        )}

        <CollapseToggle
          collapsed={collapsed}
          onToggle={() => setCollapsed((p) => !p)}
        />
      </Box>

      {/* ── Nav items ── */}
      <Divider sx={{ borderColor: ADMIN_COLORS.cardBorder, mb: 2 }} />
      <Box
        sx={{
          flex: 1,
          px: 1,
          pb: 2,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 0.2,
          // Hide scrollbar
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
        }}
      >
        {ADMIN_NAV_ITEMS.map((item) => (
          <Box key={item.path}>
            <NavRow
              icon={item.icon}
              label={item.label}
              isActive={isActive(item.path)}
              collapsed={collapsed}
              onClick={() => handleNavClick(item.path)}
            />
            {item.dividerAfter && (
              <Divider sx={{ my: 1, borderColor: ADMIN_COLORS.cardBorder }} />
            )}
          </Box>
        ))}
      </Box>


      {/* ── Utility links (Help Center + Settings) ── */}
      <Box sx={{ flexShrink: 0 }}>
        <Divider sx={{ borderColor: ADMIN_COLORS.cardBorder }} />
        <Box
          sx={{
            px: 1,
            py: 1.2,
            display: "flex",
            flexDirection: "column",
            gap: 0.2,
          }}
        >
          {[
            {
              label: ADMIN_UTILITY_ITEMS[0].label,
              path: ADMIN_UTILITY_ITEMS[0].path,
              icon: <HelpOutlineRoundedIcon sx={{ fontSize: 18 }} />,
            },
            {
              label: ADMIN_UTILITY_ITEMS[1].label,
              path: ADMIN_UTILITY_ITEMS[1].path,
              icon: <SettingsOutlinedIcon sx={{ fontSize: 18 }} />,
            },
          ].map((item) => (
            <NavRow
              key={item.path}
              icon={item.icon}
              label={item.label}
              isActive={isActive(item.path)}
              collapsed={collapsed}
              onClick={() => router.push(item.path)}
            />
          ))}
        </Box>
      </Box>

      {/* ── User footer ── */}
      <Box sx={{ flexShrink: 0 }}>
        <Divider sx={{ borderColor: ADMIN_COLORS.cardBorder }} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: collapsed ? 1 : 1.5,
            py: 1.4,
            justifyContent: collapsed ? "center" : "flex-start",
          }}
        >
          <AdminAvatar
            initials="JS"
            color={ADMIN_COLORS.brand}
            size={32}
            sx={{ flexShrink: 0 }}
          />

          {!collapsed && (
            <>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  sx={{
                    fontSize: ADMIN_FONT.sizes.sm,
                    fontWeight: ADMIN_FONT.weights.semibold,
                    color: ADMIN_COLORS.textPrimary,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    lineHeight: 1.3,
                  }}
                >
                  John Smith
                </Typography>
                <Typography
                  sx={{
                    fontSize: ADMIN_FONT.sizes.xs,
                    color: ADMIN_COLORS.textMuted,
                    lineHeight: 1.2,
                  }}
                >
                  Admin
                </Typography>
              </Box>

              <Tooltip title="Options" placement="top">
                <Box
                  sx={{
                    width: 26,
                    height: 26,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: ADMIN_RADII.xs,
                    cursor: "pointer",
                    color: ADMIN_COLORS.textMuted,
                    flexShrink: 0,
                    "&:hover": {
                      bgcolor: ADMIN_COLORS.sidebarHoverBg,
                      color: ADMIN_COLORS.brand,
                    },
                    transition: "all 0.13s",
                  }}
                >
                  <MoreHorizRoundedIcon sx={{ fontSize: 16 }} />
                </Box>
              </Tooltip>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

"use client";

import Image from "next/image";
import {
  Avatar,
  Box,
  Collapse,
  Divider,
  ListItemButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import KeyboardDoubleArrowLeftRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { usePathname, useRouter } from "next/navigation";
import { useSidebar } from "@/hooks/useSidebar";
import { NAV_SECTIONS } from "@/lib/constants";
import { NavSection } from "@/types";
import { useState } from "react";

// ── Icon-only toggle button ──────────────────────────────────────────────────
const IconBtn = ({
  icon,
  tooltip,
  onClick,
}: {
  icon: React.ReactNode;
  tooltip: string;
  onClick?: () => void;
}) => (
  <Tooltip title={tooltip} placement="right">
    <Box
      onClick={onClick}
      sx={{
        width: 30,
        height: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
        cursor: "pointer",
        color: "#9E99B8",
        flexShrink: 0,
        "&:hover": { bgcolor: "#EDE8F6", color: "#6B3FA0" },
        transition: "all 0.15s",
      }}
    >
      {icon}
    </Box>
  </Tooltip>
);

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);

  // All sections with children are expanded by default — matching the screenshot
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    () =>
      NAV_SECTIONS.reduce<Record<string, boolean>>((acc, s) => {
        if (s.items) acc[s.title] = true;
        return acc;
      }, {}),
  );

  const toggleSection = (title: string) =>
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));

  const isItemActive = (path: string) => pathname === path;

  return (
    <Box
      sx={{
        bgcolor: "#FAF8FD",
        borderRight: "1px solid #EAE6F2",
        display: "flex",
        flexDirection: "column",
        width: collapsed ? 64 : 220,
        minHeight: "100vh",
        transition: "width 0.22s ease",
        flexShrink: 0,
        overflowX: "hidden",
      }}
    >
      {/* ── Logo + header icons ────────────────────────────────────────────── */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          px: collapsed ? 1 : 2.4,
          pt: 2.8,
          pb: 2.2,
        }}
      >
        {!collapsed && (
          <Image
            src="/images/weanalogo.png"
            alt="Weana"
            width={79}
            height={58}
            priority
            style={{ objectFit: "contain", flexShrink: 0 }}
          />
        )}

        <Stack sx={{ alignContent: "center" }} direction="row" spacing={0.3}>
          <IconBtn
            icon={
              collapsed ? (
                <KeyboardDoubleArrowRightRoundedIcon sx={{ fontSize: 17 }} />
              ) : (
                <KeyboardDoubleArrowLeftRoundedIcon sx={{ fontSize: 17 }} />
              )
            }
            tooltip={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={() => setCollapsed((p) => !p)}
          />
        </Stack>
      </Box>

      {/* ── Navigation ────────────────────────────────────────────────────── */}
      <Box sx={{ flex: 1, px: 1.4, pb: 2, overflowY: "auto" }}>
        {NAV_SECTIONS.map((section) => {
          const isOpen = openSections[section.title] ?? false;
          const isLeafActive = !!(section.path && isItemActive(section.path));

          return (
            <Box key={section.title} sx={{ mb: 0.5 }}>
              {/* Section header */}
              <Box
                onClick={() =>
                  section.items
                    ? toggleSection(section.title)
                    : section.path && router.push(section.path)
                }
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 1.2,
                  py: 1,
                  borderRadius: "10px",
                  cursor: "pointer",
                  bgcolor: isLeafActive ? "#EDE8F8" : "transparent",
                  "&:hover": { bgcolor: isLeafActive ? "#EDE8F8" : "#F0EBF9" },
                  transition: "background 0.15s",
                }}
              >
                <Stack
                  direction="row"
                  spacing={1.3}
                  sx={{ alignItems: "center" }}
                >
                  <Box
                    sx={{
                      color: isLeafActive ? "#6B3FA0" : "#512B7A",
                      display: "flex",
                      alignItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    {section.icon}
                  </Box>

                  {!collapsed && (
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: isLeafActive ? 700 : 600,
                        color: isLeafActive ? "#6B3FA0" : "#512B7A",
                        letterSpacing: "-0.01em",
                        lineHeight: 1,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {section.title}
                    </Typography>
                  )}
                </Stack>

                {!collapsed && section.items && (
                  <KeyboardArrowUpRoundedIcon
                    sx={{
                      fontSize: 18,
                      color: "#ADAABE",
                      transform: isOpen ? "rotate(0deg)" : "rotate(180deg)",
                      transition: "transform 0.2s ease",
                      flexShrink: 0,
                    }}
                  />
                )}
              </Box>

              {/* Sub-items — left border accent line */}
              {section.items && !collapsed && (
                <Collapse in={isOpen} timeout={180}>
                  <Box
                    sx={{
                      ml: 3.2, // aligns border with icon center
                      mt: 0.2,
                      mb: 0.4,
                      borderLeft: "1.5px solid #DDD8F0",
                    }}
                  >
                    {section.items.map((item) => {
                      const active = isItemActive(item.path);
                      return (
                        <Box
                          key={item.label}
                          onClick={() => router.push(item.path)}
                          sx={{
                            mx: 0.6,
                            my: 0.25,
                            px: 1.6,
                            py: 0.9,
                            borderRadius: "10px",
                            cursor: "pointer",
                            // Active pill: light purple background
                            bgcolor: active ? "#EDE8F8" : "transparent",
                            "&:hover": {
                              bgcolor: active ? "#EDE8F8" : "#F0EBF9",
                            },
                            transition: "background 0.15s",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: 13.5,
                              fontWeight: active ? 700 : 500,
                              color: active ? "#6B3FA0" : "#4A4662",
                              letterSpacing: "-0.01em",
                              lineHeight: 1,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {item.label}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>
                </Collapse>
              )}
            </Box>
          );
        })}
      </Box>

      {/* ── Footer: Help Center + Settings ───────────────────────────────── */}
      <Box>
        <Divider sx={{ borderColor: "#EAE6F2" }} />
        <Box sx={{ px: 1.4, py: 1.2 }}>
          {[
            {
              label: "Help Center",
              icon: <HelpOutlineRoundedIcon sx={{ fontSize: 18 }} />,
              path: "/help",
            },
            {
              label: "Settings",
              icon: <SettingsOutlinedIcon sx={{ fontSize: 18 }} />,
              path: "/settings",
            },
          ].map((item) => (
            <Box
              key={item.label}
              onClick={() => router.push(item.path)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.3,
                px: 1.2,
                py: 1,
                borderRadius: "10px",
                cursor: "pointer",
                "&:hover": { bgcolor: "#F0EBF9" },
                transition: "background 0.15s",
                justifyContent: collapsed ? "center" : "flex-start",
              }}
            >
              <Box
                sx={{
                  color: "#6B3FA0",
                  display: "flex",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </Box>
              {!collapsed && (
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#512B7A",
                    letterSpacing: "-0.01em",
                    lineHeight: 1,
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      </Box>
      {/* <Box>
        <Divider sx={{ borderColor: "#EAE6F2" }} />
        <Stack
          direction="row"
          spacing={1}
          sx={{
            px: collapsed ? 0 : 2,
            py: 1.6,
            justifyContent: collapsed ? "center" : "flex-start",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              width: 28,
              height: 28,
              fontSize: 12,
              bgcolor: "#6B3FA0",
              flexShrink: 0,
            }}
          >
            J
          </Avatar>
          {!collapsed && (
            <Box>
              <Typography
                sx={{
                  fontSize: 11.5,
                  color: "#1E1A28",
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                John Smith
              </Typography>
              <Typography
                sx={{ fontSize: 10, color: "#9D9AAC", lineHeight: 1.2 }}
              >
                Admin
              </Typography>
            </Box>
          )}
        </Stack>
      </Box> */}
    </Box>
  );
}

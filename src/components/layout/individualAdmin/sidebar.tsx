"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import SupportOutlinedIcon from "@mui/icons-material/SupportOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import IntegrationInstructionsOutlinedIcon from "@mui/icons-material/IntegrationInstructionsOutlined";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

type Item = {
  label: string;
  path: string;
  icon: React.ReactNode;
};

const navItems: Item[] = [
  {
    label: "My Profiles",
    path: "/individual-admin/dashboard",
    icon: <PersonOutlineRoundedIcon sx={{ fontSize: 16 }} />,
  },
  {
    label: "Contacts",
    path: "/individual-admin/contacts",
    icon: <ContactsOutlinedIcon sx={{ fontSize: 16 }} />,
  },
  {
    label: "Tags",
    path: "/individual-admin/tags",
    icon: <SellOutlinedIcon sx={{ fontSize: 16 }} />,
  },
  {
    label: "Insights",
    path: "/individual-admin/insights",
    icon: <InsightsOutlinedIcon sx={{ fontSize: 16 }} />,
  },
  {
    label: "Accessories",
    path: "/individual-admin/accessories",
    icon: <StarBorderRoundedIcon sx={{ fontSize: 16 }} />,
  },
  {
    label: "Integrations",
    path: "/individual-admin/integrations",
    icon: <IntegrationInstructionsOutlinedIcon sx={{ fontSize: 16 }} />,
  },
];

export default function IndividualSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Box
      sx={{
        width: 216,
        minHeight: "100vh",
        bgcolor: "#FEFAFF",
        borderRight: "1px solid #DFDBE8",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ px: 2.2, pt: 1.6, pb: 1.1 }}>
        <Image
          src="/images/weanalogo.png"
          alt="Weana"
          width={84}
          height={52}
          priority
        />
      </Box>

      <Box sx={{ px: 1.5, py: 0.5 }}>
        {navItems.map((item) => {
          const isMyProfilesRoute =
            pathname === "/individual-admin/dashboard" ||
            pathname.startsWith("/individual-admin/member-profile");
          const isActive =
            item.label === "My Profiles"
              ? isMyProfilesRoute
              : pathname === item.path;

          return (
            <Box
              key={item.label}
              onClick={() => router.push(item.path)}
              sx={{
                mb: 0.55,
                px: 1.2,
                py: 0.95,
                borderRadius: 1.3,
                display: "flex",
                alignItems: "center",
                gap: 1.1,
                cursor: "pointer",
                bgcolor: isActive ? "#EBE2FF" : "transparent",
                border: isActive ? "1px solid #D8C9FF" : "1px solid transparent",
                color: isActive ? "#5D30A0" : "#6A6478",
                "&:hover": {
                  bgcolor: isActive ? "#EBE2FF" : "#ECE8F3",
                },
              }}
            >
              {item.icon}
              <Typography sx={{ fontSize: 13, fontWeight: isActive ? 600 : 500 }}>
                {item.label}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <Box sx={{ mt: "auto", px: 1.5, pb: 1.1 }}>
        <Divider sx={{ mb: 1.1, borderColor: "#E3DEEB" }} />

        <Stack spacing={0.5}>
          <Box
            onClick={() => router.push("/support")}
            sx={{
              px: 1.2,
              py: 0.9,
              borderRadius: 1.2,
              display: "flex",
              alignItems: "center",
              gap: 1.1,
              color: "#6A6478",
              cursor: "pointer",
              "&:hover": { bgcolor: "#ECE8F3" },
            }}
          >
            <SupportOutlinedIcon sx={{ fontSize: 16 }} />
            <Typography sx={{ fontSize: 13, fontWeight: 500 }}>Support</Typography>
          </Box>

          <Box
            onClick={() => router.push("/settings")}
            sx={{
              px: 1.2,
              py: 0.9,
              borderRadius: 1.2,
              display: "flex",
              alignItems: "center",
              gap: 1.1,
              color: "#6A6478",
              cursor: "pointer",
              "&:hover": { bgcolor: "#ECE8F3" },
            }}
          >
            <SettingsOutlinedIcon sx={{ fontSize: 16 }} />
            <Typography sx={{ fontSize: 13, fontWeight: 500 }}>Settings</Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 1.1, borderColor: "#E3DEEB" }} />

        <Box
          sx={{
            px: 1,
            py: 0.9,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: 1.2,
            "&:hover": { bgcolor: "#ECE8F3" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                bgcolor: "#DCD5EA",
                color: "#5F5570",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              J
            </Box>
            <Box>
              <Typography sx={{ fontSize: 12.5, color: "#292336", fontWeight: 600 }}>
                John Smith
              </Typography>
              <Typography sx={{ fontSize: 10.5, color: "#8A849A", fontWeight: 500 }}>
                Admin
              </Typography>
            </Box>
          </Box>

          <Stack direction="row" spacing={0.2}>
            <IconButton size="small" sx={{ color: "#7E778D" }}>
              <OpenInNewRoundedIcon sx={{ fontSize: 15 }} />
            </IconButton>
            <IconButton size="small" sx={{ color: "#7E778D" }}>
              <MoreVertRoundedIcon sx={{ fontSize: 15 }} />
            </IconButton>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

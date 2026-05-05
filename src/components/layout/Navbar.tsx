"use client";
import Link from "next/link";
import { Box, Typography, Button, Stack, Container } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  bg: "#F0EEF8", // page background lavender
  bgLight: "#FAFAFA",
  coral: "#7B49B1",
  purple: "#7B5EA7",
  navy: "#1A1A3E",
  muted: "#888",
  border: "rgba(180,178,210,0.3)",
  cardBg: "#F5F5F7",
};

export default function Navbar({ isHome = false }: { isHome?: boolean }) {
  const links = ["features", "products", "resources", "pricing"];
  const { login } = useAuth();
  return (
    <Box
      component="nav"
      sx={{
        position: "sticky",
        top: isHome ? "20px" : "0px",
        zIndex: 100,
        background: isHome
          ? "transparent"
          : "linear-gradient(360deg, #CEB7E7 0%, #F5ECFF 100%)",
        backdropFilter: isHome ? "none" : "blur(12px)",
        animation: "navSlideDown 1.1s cubic-bezier(0.22, 1, 0.36, 1) both",
        "@keyframes navSlideDown": {
          "0%": { opacity: 0, transform: "translateY(-16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        // borderBottom: `1px solid ${C.border}`,
      }}
    >
      <Container maxWidth="lg">
        {/* <Stack direction="row" alignItems="center" justifyContent="space-between" py={1.5}> */}
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            py: 1.5,
          }}
        >
          {/* Logo */}
          <Box
            component={Link}
            href="/"
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            {isHome ? (
              <Image
                src="/images/logo_white.png"
                alt="logo"
                width={100}
                height={20}
                priority
              />
            ) : (
              <Image
                src="/images/logo.png"
                alt="logo"
                width={100}
                height={20}
                priority
              />
            )}
          </Box>

          {/* Nav links */}
          <Stack
            direction={"row"}
            spacing={3.5}
            sx={{
              alignItems: "center",
            }}
          >
            {links.map((l) => (
              <Box
                key={l}
                component={Link}
                href={`/${l.toLowerCase()}`}
                sx={{
                  position: "relative",
                  fontSize: 13.5,
                  color: isHome ? "#e0e0e0" : "#1E1E1E",
                  fontWeight: "bold",
                  textDecoration: "none",
                  textTransform: "capitalize",
                  letterSpacing: "0.01em",
                  pb: "3px",
                  transition: "color 280ms ease",

                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "1.5px",
                    borderRadius: "2px",
                    backgroundColor: isHome ? "#A89FFF" : C.purple,
                    transform: "scaleX(0)",
                    transformOrigin: "left center",
                    transition: "transform 320ms cubic-bezier(0.4, 0, 0.2, 1)",
                  },

                  "&:hover": {
                    color: isHome ? "#A89FFF" : C.purple,
                    "&::after": {
                      transform: "scaleX(1)",
                    },
                  },
                }}
              >
                {l}
              </Box>
            ))}
          </Stack>
          {/* Actions */}
          <Stack
            direction="row"
            spacing={1.5}
            sx={{
              alignItems: "center",
            }}
          >
            <Typography
              onClick={() => {
                login("keycloak");
              }}
              sx={{
                cursor: "pointer",
                position: "relative",
                fontSize: 13.5,
                color: isHome ? "#e0e0e0" : "#1E1E1E",
                fontWeight: 500,
                textDecoration: "none",
                textTransform: "capitalize",
                letterSpacing: "0.01em",
                pb: "3px",
                transition: "color 280ms ease",

                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "1.5px",
                  borderRadius: "2px",
                  backgroundColor: isHome ? "#A89FFF" : C.purple,
                  transform: "scaleX(0)",
                  transformOrigin: "left center",
                  transition: "transform 320ms cubic-bezier(0.4, 0, 0.2, 1)",
                },

                "&:hover": {
                  color: isHome ? "#A89FFF" : C.purple,
                  "&::after": {
                    transform: "scaleX(1)",
                  },
                },
              }}
            >
              Login
            </Typography>
            <Button
              component={Link}
              href="/signup"
              sx={{
                background: C.coral,
                color: "#fff",
                borderRadius: 999,
                px: 3,
                py: 1.3,
                fontSize: 14,
                fontWeight: 600,
                textTransform: "none",
                transition: "transform 320ms ease, box-shadow 320ms ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 22px rgba(123,73,177,0.35)",
                },
              }}
            >
              Get Started for Free
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

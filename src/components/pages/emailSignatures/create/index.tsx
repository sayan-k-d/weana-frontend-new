"use client";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

import AddContentDialog from "./sections/AddContentDialog";
import { ToggleKey } from "@/types";
import { initialToggles, purple } from "../constants/addContent";
import InfoToggleRow from "./sections/InfoToggleRow";
import Image from "next/image";

export default function CreateEmailSignaturePage() {
  const router = useRouter();
  const [signatureName, setSignatureName] = useState("");
  const [disclaimer, setDisclaimer] = useState("");
  const [isAddContentOpen, setAddContentOpen] = useState(false);
  const [toggles, setToggles] = useState(initialToggles);

  const setToggle = (key: ToggleKey) => (v: boolean) =>
    setToggles((prev) => ({ ...prev, [key]: v }));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F3F2F6",
        fontFamily: 'Inter, "Segoe UI", sans-serif',
      }}
    >
      <Box sx={{ flex: 1, p: 2.2, overflow: "auto" }}>
        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: "center", mb: 2.2, pl: 0.4 }}
        >
          <IconButton
            onClick={() => router.push("/email-signatures")}
            aria-label="Back to email signatures"
            sx={{ color: "#512B7A" }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <Box
            sx={{ width: "1px", height: 22, bgcolor: "#D1D0DA", flexShrink: 0 }}
          />
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 700,
              color: "#512B7A",
              letterSpacing: "-0.01em",
            }}
          >
            Create Email Signature
          </Typography>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
            gap: 2.5,
            alignItems: "flex-start",
          }}
        >
          <Paper
            elevation={0}
            sx={{
              border: "1px solid #E7E5EC",
              borderRadius: 3,
              p: 3,
              bgcolor: "#FFFFFF",
            }}
          >
            <Typography
              component="label"
              sx={{ fontSize: 14, fontWeight: 600, color: "#2E253C" }}
            >
              Signature Name{" "}
              <Box component="span" sx={{ color: "#D32F2F" }}>
                *
              </Box>
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Signature Name"
              value={signatureName}
              onChange={(e) => setSignatureName(e.target.value)}
              sx={{
                mt: 1,
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#F3F2F5",
                  "& fieldset": { borderColor: "#D8D4DF" },
                },
                "& input::placeholder": { color: "#9C98A7", opacity: 1 },
              }}
            />

            <Typography
              sx={{ fontSize: 14, fontWeight: 600, color: "#2E253C", mb: 1 }}
            >
              Information
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 2,
                mb: 2,
              }}
            >
              <InfoToggleRow
                label="Name"
                checked={toggles.name}
                onChange={setToggle("name")}
              />
              <InfoToggleRow
                label="Pronouns"
                checked={toggles.pronouns}
                onChange={setToggle("pronouns")}
              />
              <InfoToggleRow
                label="Job Title"
                checked={toggles.jobTitle}
                onChange={setToggle("jobTitle")}
              />
              <InfoToggleRow
                label="Company Name"
                checked={toggles.companyName}
                onChange={setToggle("companyName")}
              />
              <InfoToggleRow
                label="Job Title"
                checked={toggles.jobTitle2}
                onChange={setToggle("jobTitle2")}
              />
              <InfoToggleRow
                label="Company Name"
                checked={toggles.companyName2}
                onChange={setToggle("companyName2")}
              />
            </Box>

            <Typography
              sx={{ fontSize: 14, fontWeight: 600, color: "#2E253C", mb: 1 }}
            >
              Image
            </Typography>
            <TextField
              fullWidth
              multiline
              minRows={5}
              placeholder="Disclaimer"
              value={disclaimer}
              onChange={(e) => setDisclaimer(e.target.value)}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#F3F2F5",
                  "& fieldset": { borderColor: "#D8D4DF" },
                },
                "& textarea::placeholder": { color: "#9C98A7", opacity: 1 },
              }}
            />

            <Stack
              direction="row"
              sx={{
                alignItems: "flex-start",
                justifyContent: "space-between",
                border: "1px solid #DEDBE5",
                borderRadius: 1.6,
                px: 2,
                py: 1.7,
                bgcolor: "#FFFFFF",
              }}
            >
              <Box>
                <Typography
                  sx={{ fontSize: 14, fontWeight: 500, color: "#2E253C" }}
                >
                  Profile Pic
                </Typography>
                <Typography
                  sx={{
                    fontSize: 12.5,
                    color: "#7B748B",
                    mt: 0.5,
                    maxWidth: 320,
                  }}
                >
                  Members profile photo will be displayed in their signature
                </Typography>
              </Box>
              <Switch
                checked={toggles.profilePic}
                onChange={(_, v) => setToggle("profilePic")(v)}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": { color: purple },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    bgcolor: `${purple} !important`,
                  },
                }}
              />
            </Stack>
          </Paper>

          <Box
            sx={{
              borderRadius: 3,
              bgcolor: "#EBE8F0",
              p: 3,
              minHeight: 420,
              height: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                fontSize: 14,
                fontWeight: 600,
                color: "#5B5570",
                mb: 2,
              }}
            >
              Signature Preview
            </Typography>

            <Image
              alt="Email Signature Card"
              src="/images/emailSig.png"
              width={494}
              height={304}
            />
            {/* <Paper
              elevation={0}
              sx={{
                borderRadius: 2.5,
                p: 2.5,
                bgcolor: "#FFFFFF",
                boxShadow: "0 8px 28px rgba(30, 22, 48, 0.08)",
                border: "1px solid #ECE8F2",
              }}
            >
              <Stack
                direction="row"
                spacing={2.5}
                sx={{ justifyContent: "space-between" }}
              >
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box
                    sx={{
                      width: 72,
                      height: 48,
                      borderRadius: 1,
                      border: "1px solid #E5E7EB",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      fontWeight: 700,
                      color: "#6B7280",
                      mb: 1.2,
                    }}
                  >
                    LOGO
                  </Box>
                  <Typography
                    sx={{ fontSize: 16, fontWeight: 700, color: "#1E1A28" }}
                  >
                    Test
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: "#4A4662", mt: 0.3 }}>
                    xyz International Trading Co
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: "#4A4662", mt: 0.8 }}>
                    +97234567890
                  </Typography>
                </Box>

                <Box sx={{ textAlign: "center", flexShrink: 0 }}>
                  <Typography
                    onClick={() => setAddContentOpen(true)}
                    sx={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: purple,
                      mb: 0.5,
                      cursor: "pointer",
                      "&:hover": { opacity: 0.86 },
                    }}
                  >
                    Connect with me
                  </Typography>
                  <Box
                    sx={{
                      width: 96,
                      height: 96,
                      mx: "auto",
                      bgcolor: "#F3F2F6",
                      border: "1px dashed #D4CFE0",
                      borderRadius: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      color: "#8E889D",
                      fontWeight: 600,
                    }}
                  >
                    QR
                  </Box>
                  <Typography
                    sx={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: purple,
                      mt: 0.8,
                    }}
                  >
                    My Digital Business Card
                  </Typography>
                </Box>
              </Stack>
            </Paper> */}

            <Typography
              sx={{
                textAlign: "center",
                fontSize: 13,
                color: "#6B6578",
                mt: 2.5,
              }}
            >
              Preview based on{" "}
              <Box component="span" sx={{ fontWeight: 700, color: "#2E253C" }}>
                John
              </Box>
            </Typography>
          </Box>
        </Box>
      </Box>

      <AddContentDialog
        open={isAddContentOpen}
        onClose={() => setAddContentOpen(false)}
      />
    </Box>
  );
}

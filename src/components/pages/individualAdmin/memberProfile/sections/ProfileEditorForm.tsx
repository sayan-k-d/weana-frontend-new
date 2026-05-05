"use client";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import Image from "next/image";

const themeColors = ["#000000", "#E65C5C", "#E7A048", "#E5C14D", "#2E9D56", "#4384E6", "#874EE1"];

export default function ProfileEditorForm() {
  return (
    <Box sx={{ flex: 1, px: 2.4, py: 1.7, bgcolor: "#FFFFFF" }}>
      <Typography sx={{ fontSize: 24, fontWeight: 700, color: "#221C30", mb: 1.3 }}>
        About
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 1.4 }}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontSize: 12, mb: 0.45, color: "#3E384C" }}>Card Name:</Typography>
          <Box
            sx={{
              height: 30,
              borderRadius: 1,
              bgcolor: "#DFDFE2",
              px: 1.2,
              display: "flex",
              alignItems: "center",
              fontSize: 12.5,
            }}
          >
            Diego
          </Box>
        </Box>
        <Box sx={{ width: 150 }}>
          <Typography sx={{ fontSize: 12, mb: 0.45, color: "#3E384C" }}>Card Layout:</Typography>
          <Box
            sx={{
              height: 30,
              borderRadius: 1,
              bgcolor: "#DFDFE2",
              px: 1.2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 12.5,
            }}
          >
            Portrait
            <KeyboardArrowDownRoundedIcon sx={{ fontSize: 18 }} />
          </Box>
        </Box>
      </Stack>

      <Stack direction="row" spacing={1.2} sx={{ mb: 1.5, alignItems: "flex-start" }}>
        <Box sx={{ width: 112 }}>
          <Stack direction="row" spacing={0.35} sx={{ alignItems: "center", mb: 0.55 }}>
            <Typography sx={{ fontSize: 12, color: "#443D53", fontWeight: 500 }}>Profile Picture</Typography>
            <InfoOutlinedIcon sx={{ fontSize: 12, color: "#9A94A9" }} />
          </Stack>
          <Box
            sx={{
              width: 90,
              height: 90,
              borderRadius: "50%",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Image
              src="/images/Ellipse-19.png"
              alt="profile"
              fill
              sizes="90px"
              style={{ objectFit: "cover" }}
            />
          </Box>
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack direction="row" spacing={0.35} sx={{ alignItems: "center", mb: 0.55 }}>
            <Typography sx={{ fontSize: 12, color: "#443D53", fontWeight: 500 }}>Cover Photo</Typography>
            <InfoOutlinedIcon sx={{ fontSize: 12, color: "#9A94A9" }} />
          </Stack>
          <Box
            sx={{
              height: 90,
              borderRadius: 1.2,
              bgcolor: "#D9D8DE",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#7A7487",
              fontSize: 12,
              textAlign: "center",
              px: 1,
              lineHeight: 1.25,
            }}
          >
            Cover photo unavailable in portrait card layout.
          </Box>
        </Box>

        <Box sx={{ width: 120 }}>
          <Stack direction="row" spacing={0.35} sx={{ alignItems: "center", mb: 0.55 }}>
            <Typography sx={{ fontSize: 12, color: "#443D53", fontWeight: 500 }}>Company Logo</Typography>
            <InfoOutlinedIcon sx={{ fontSize: 12, color: "#9A94A9" }} />
          </Stack>
          <Box
            sx={{
              width: 90,
              height: 90,
              borderRadius: "50%",
              bgcolor: "#D9D8DE",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#8B8598",
              textAlign: "center",
              mx: "auto",
              px: 1,
            }}
          >
            <EditOutlinedIcon sx={{ fontSize: 14, mb: 0.4 }} />
            <Typography sx={{ fontSize: 9.5, lineHeight: 1.15 }}>
              Select file or
              <br />
              drag and drop
              <br />
              one here
            </Typography>
          </Box>
        </Box>
      </Stack>

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.3 }}>
        {["Name", "Location", "Job Title", "Company"].map((field) => (
          <Box key={field}>
            <Typography sx={{ fontSize: 12, mb: 0.4, color: "#3E384C" }}>{field}</Typography>
            <Box
              sx={{
                height: 36,
                borderRadius: 1,
                bgcolor: "#DFDFE2",
                px: 1.2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: 13,
                color: "#6F6A78",
              }}
            >
              <Typography sx={{ fontSize: 13, color: "#6F6A78" }}>
                {field === "Name" ? "Diego" : field}
              </Typography>
              {field === "Name" && (
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    minWidth: 92,
                    height: 24,
                    borderRadius: "999px",
                    textTransform: "none",
                    bgcolor: "#F2F1F6",
                    color: "#2D2739",
                    boxShadow: "none",
                    fontSize: 12,
                    fontWeight: 600,
                    "&:hover": { bgcolor: "#ECEAF2", boxShadow: "none" },
                  }}
                >
                  + Pronouns
                </Button>
              )}
            </Box>
          </Box>
        ))}
      </Box>

      <Box sx={{ mt: 1.2 }}>
        <Typography sx={{ fontSize: 12, mb: 0.4, color: "#3E384C" }}>Bio</Typography>
        <Box
          sx={{
            height: 62,
            borderRadius: 1,
            bgcolor: "#DFDFE2",
            px: 1.2,
            pt: 1.1,
            fontSize: 13,
            color: "#6F6A78",
          }}
        >
          Bio
        </Box>
      </Box>

      <Box sx={{ mt: 1.2 }}>
        <Typography sx={{ fontSize: 12.5, mb: 0.55, color: "#5A536A" }}>Choose theme</Typography>
        <Box sx={{ border: "1px solid #DDD9E6", borderRadius: 1.4, p: 1.1, bgcolor: "#F2F1F6" }}>
          {["Card Theme", "Link Color"].map((label) => (
            <Stack key={label} direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 0.8 }}>
              <Typography sx={{ fontSize: 12.5 }}>{label}</Typography>
              <Stack direction="row" spacing={1}>
                {themeColors.map((color) => (
                  <Box key={`${label}-${color}`} sx={{ width: 16, height: 16, borderRadius: "50%", bgcolor: color }} />
                ))}
              </Stack>
            </Stack>
          ))}
          <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
            <Typography sx={{ fontSize: 12.5 }}>Match Link Icons to Card Theme</Typography>
            <Switch size="small" />
          </Stack>
        </Box>
      </Box>

      <Box sx={{ mt: 1.2 }}>
        <Typography sx={{ fontSize: 12.5, mb: 0.55, color: "#5A536A" }}>Choose Font</Typography>
        <Box sx={{ border: "1px solid #DDD9E6", borderRadius: 1.4, p: 1.1, bgcolor: "#F2F1F6" }}>
          <Box sx={{ height: 38, borderRadius: 1, bgcolor: "#E6E6E9", px: 1.2, display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12.5 }}>
            DEFAULT
            <KeyboardArrowDownRoundedIcon sx={{ fontSize: 18 }} />
          </Box>
          <Typography sx={{ fontSize: 8.5, color: "#8C869A", mt: 0.8 }}>
            Custom Fonts Will Be Applied When Sharing Your Card. They Are Not Yet Available In
            The Mobile App.
          </Typography>
        </Box>
      </Box>

      <Stack direction="row" spacing={1.4} sx={{ justifyContent: "flex-end", mt: 2 }}>
        <Button variant="contained" disabled sx={{ minWidth: 110, borderRadius: "999px", textTransform: "none" }}>
          Cancel
        </Button>
        <Button variant="contained" disabled sx={{ minWidth: 110, borderRadius: "999px", textTransform: "none" }}>
          Update
        </Button>
      </Stack>
    </Box>
  );
}

"use client";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { Avatar, Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CONTACT_ROWS } from "../constants";

export default function IndividualAdminContactProfilePage({
  contactId,
}: {
  contactId: number;
}) {
  const router = useRouter();
  const contact =
    CONTACT_ROWS.find((item) => item.id === contactId) ?? CONTACT_ROWS[0];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F7F7F7",
        px: 3,
        py: 2.2,
      }}
    >
      <Stack
        direction="row"
        sx={{ alignItems: "center", justifyContent: "space-between", mb: 2 }}
      >
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <IconButton size="small" onClick={() => router.push("/individual-admin/contacts")}>
            <ArrowBackIosNewRoundedIcon sx={{ fontSize: 14, color: "#8C869A" }} />
          </IconButton>
          <Avatar
            sx={{
              width: 30,
              height: 30,
              bgcolor: contact.avatarColor,
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            {contact.initials}
          </Avatar>
          <Typography sx={{ fontSize: 16, fontWeight: 600, color: "#2D2739" }}>
            {contact.name}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
          <Button
            variant="contained"
            endIcon={<KeyboardArrowDownRoundedIcon sx={{ fontSize: 17 }} />}
            sx={{
              borderRadius: "999px",
              textTransform: "none",
              bgcolor: "#6B39AE",
              px: 1.7,
              py: 0.58,
              fontSize: 12.5,
              fontWeight: 600,
              boxShadow: "none",
              "&:hover": { bgcolor: "#5A2E94", boxShadow: "none" },
            }}
          >
            Sync to CRM
          </Button>
          <IconButton size="small" sx={{ color: "#8E889C" }}>
            <MoreVertRoundedIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Stack>
      </Stack>

      <Box
        sx={{
          bgcolor: "#FFFFFF",
          border: "1px solid #EEEAF4",
          borderRadius: 3,
          display: "grid",
          gridTemplateColumns: "1fr 290px",
          minHeight: "calc(100vh - 120px)",
          overflow: "hidden",
        }}
      >
        <Box sx={{ p: 2.2, borderRight: "1px solid #ECE7F4" }}>
          <Stack direction="row" spacing={1.8} sx={{ mb: 2.6 }}>
            {["Edit", "Save as contact", "Email Lead", "Add Tag", "Reassign"].map(
              (label) => (
                <Button
                  key={label}
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    borderRadius: "999px",
                    borderColor: "#E2DCEC",
                    color: "#4A435A",
                    px: 1.35,
                    py: 0.45,
                    fontSize: 12,
                    fontWeight: 600,
                    minWidth: "auto",
                  }}
                >
                  {label}
                </Button>
              ),
            )}
          </Stack>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "320px minmax(220px, 1fr)",
              columnGap: 2.8,
              rowGap: 4.2,
            }}
          >
            <Stack spacing={1.5}>
              <FieldBlock label="Full Name" value={contact.name} />
              <FieldBlock label="Job Title" value="Business Analyst" />
              <FieldBlock label="Date Captured" value="Mar 29, 2026 19:03 PM" />
              <FieldBlock label="Notes" value="Note..." />
            </Stack>

            <Stack spacing={1.5}>
              <FieldBlock label="Email" value={contact.email} isLink />
              <FieldBlock label="Company Name" value="XYZ" />
              <FieldBlock label="Capture Method" value="APP_TO_APP" />
            </Stack>

            <Box>
              <Typography
                sx={{ fontSize: 12.5, color: "#7A748A", fontWeight: 500, mb: 0.9 }}
              >
                Related Leads (6)
              </Typography>

              <Box
                sx={{
                  border: "1px solid #E9E4F0",
                  borderRadius: 1.3,
                  maxHeight: 156,
                  overflow: "auto",
                  "&::-webkit-scrollbar": { width: 7, height: 7 },
                  "&::-webkit-scrollbar-track": {
                    bgcolor: "#ECE8F3",
                    borderRadius: 6,
                  },
                  "&::-webkit-scrollbar-thumb": {
                    bgcolor: "#8D869B",
                    borderRadius: 6,
                  },
                  "&::-webkit-scrollbar-corner": {
                    bgcolor: "#ECE8F3",
                  },
                }}
              >
                <Box sx={{ minWidth: 290 }}>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Stack
                      key={`${contact.id}-lead-${index}`}
                      direction="row"
                      sx={{
                        alignItems: "center",
                        px: 1,
                        py: 0.8,
                        borderBottom: "1px solid #F1EDF6",
                        "&:last-of-type": { borderBottom: "none" },
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 28,
                          height: 28,
                          bgcolor: "#7B6BC9",
                          fontSize: 10.5,
                          mr: 1,
                        }}
                      >
                        ML
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          sx={{ fontSize: 13, color: "#2D2739", fontWeight: 600 }}
                        >
                          Morgan Lee
                        </Typography>
                        <Typography sx={{ fontSize: 10.5, color: "#9D95AE" }}>
                          alex.parker.work@gmail.com
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          border: "1px solid #E5DFF0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          src="/images/user-line.png"
                          alt="lead profile"
                          width={12}
                          height={12}
                        />
                      </Box>
                    </Stack>
                  ))}
                </Box>
              </Box>
            </Box>

            <Box>
              <Typography
                sx={{ fontSize: 12.5, color: "#7A748A", fontWeight: 500, mb: 0.7 }}
              >
                Exported to
              </Typography>
              <Image
                src="/images/frame-205.png"
                alt="Export source"
                width={30}
                height={30}
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{ p: 2.6 }}>
          <Typography sx={{ fontSize: 14, color: "#7A748A", mb: 2 }}>
            {contact.name}&apos;s event badge
          </Typography>
          <Box
            sx={{
              height: 146,
              borderRadius: 1.5,
              border: "1px solid #D7D0E4",
              bgcolor: "#DBDADF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                color: "#A8A6AD",
                fontSize: 44,
                fontWeight: 500,
                letterSpacing: 1.2,
              }}
            >
              IMG
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function FieldBlock({
  label,
  value,
  isLink,
}: {
  label: string;
  value: string;
  isLink?: boolean;
}) {
  return (
    <Box>
      <Stack direction="row" spacing={0.45} sx={{ alignItems: "center", mb: 0.25 }}>
        <Typography sx={{ fontSize: 12.5, color: "#7A748A", fontWeight: 500 }}>
          {label}
        </Typography>
        <ContentCopyRoundedIcon sx={{ fontSize: 14, color: "#A8A1B7" }} />
      </Stack>
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 600,
          color: isLink ? "#6557A7" : "#2D2739",
          textDecoration: isLink ? "underline" : "none",
          textUnderlineOffset: isLink ? "2px" : undefined,
          textDecorationThickness: isLink ? "1px" : undefined,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

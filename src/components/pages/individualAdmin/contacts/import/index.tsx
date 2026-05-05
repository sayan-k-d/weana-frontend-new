"use client";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function IndividualAdminImportContactsPage() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F7F7F7",
        px: 3,
        py: 2.2,
        fontFamily: 'Inter, "Segoe UI", sans-serif',
      }}
    >
      <Stack direction="row" spacing={0.4} sx={{ alignItems: "center", mb: 3.2 }}>
        <IconButton
          size="small"
          onClick={() => router.push("/individual-admin/contacts")}
          sx={{ color: "#A198AF" }}
        >
          <ArrowBackIosNewRoundedIcon sx={{ fontSize: 14 }} />
        </IconButton>
        <Typography sx={{ fontSize: 21, fontWeight: 700, color: "#5E4E80" }}>
          Import Contacts
        </Typography>
      </Stack>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          gap: 4.4,
          mt: 3.6,
        }}
      >
        <ImportOptionCard
          icon={
            <Image
              src="/images/frame-204.png"
              alt="Import and enrich"
              width={60}
              height={60}
            />
          }
          title="Import & Enrich Contacts"
          description="Providing dozens of enriched data points, Weana List Enrichment allows your team to collect the context you need on your contacts."
          actionLabel="Upgrade Now"
          actionVariant="contained"
          badge={
            <Stack
              direction="row"
              spacing={0.4}
              sx={{ alignItems: "center", color: "#A286D6" }}
            >
              <Image src="/images/lock.png" alt="Upgrade lock" width={11} height={11} />
              <Typography sx={{ fontSize: 10.5, fontWeight: 600 }}>Upgrade</Typography>
            </Stack>
          }
        />

        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            bgcolor: "#EFECEF",
            color: "#7D758D",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12.5,
            fontWeight: 700,
            alignSelf: "center",
          }}
        >
          OR
        </Box>

        <ImportOptionCard
          icon={
            <Image
              src="/images/frame-206.png"
              alt="Import contacts"
              width={60}
              height={60}
            />
          }
          title="Import Contacts (No Enrichment)"
          description="Skip the messy, direct CRM import. Import contacts here and let your Weana integration sync them seamlessly."
          actionLabel="Import Contacts"
          actionVariant="outlined"
        />
      </Box>
    </Box>
  );
}

function ImportOptionCard({
  icon,
  title,
  description,
  actionLabel,
  actionVariant,
  badge,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel: string;
  actionVariant: "contained" | "outlined";
  badge?: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        width: 420,
        minHeight: 315,
        borderRadius: 2.2,
        border: "1px solid #E8E3EF",
        bgcolor: "#FFFFFF",
        boxShadow: "0 2px 8px rgba(18, 14, 30, 0.06)",
        p: 2.35,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ position: "relative", mb: 2.75 }}>
        <Box sx={{ display: "flex", justifyContent: "center", minHeight: 24 }}>{icon}</Box>
        {badge ? (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              px: 0.8,
              py: 0.35,
              borderRadius: 0.9,
              bgcolor: "#F4F0FB",
            }}
          >
            {badge}
          </Box>
        ) : null}
      </Box>

      <Typography
        sx={{
          fontSize: 17,
          fontWeight: 700,
          color: "#2E283A",
          mb: 1.25,
          textAlign: "center",
          lineHeight: 1.25,
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          fontSize: 12.8,
          color: "#8D869C",
          lineHeight: 1.55,
          maxWidth: 320,
          mb: 2.35,
          textAlign: "center",
          mx: "auto",
        }}
      >
        {description}
      </Typography>

      <Button
        variant={actionVariant}
        sx={{
          textTransform: "none",
          borderRadius: "999px",
          px: 2.2,
          py: 0.62,
          fontSize: 14,
          fontWeight: 600,
          minWidth: "auto",
          mx: "auto",
          ...(actionVariant === "contained"
            ? {
                bgcolor: "#6A3CB0",
                color: "#FFFFFF",
                boxShadow: "none",
                "&:hover": { bgcolor: "#5A2E94", boxShadow: "none" },
              }
            : {
                borderColor: "#DDD7E8",
                color: "#40384F",
                "&:hover": { borderColor: "#CDC4DE", bgcolor: "#FAF9FC" },
              }),
        }}
      >
        {actionLabel}
      </Button>
    </Box>
  );
}

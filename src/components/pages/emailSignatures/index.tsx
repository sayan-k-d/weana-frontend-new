"use client";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Link from "next/link";
import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import Sidebar from "@/components/layout/Sidebar";
import AssignMembersDialog from "./sections/AssignMembersDialog";
import PowerOutlinedIcon from "@mui/icons-material/PowerOutlined";
import Image from "next/image";

type SignatureTemplate = {
  id: number;
  name: string;
  lastModified: string;
  dateCreated: string;
  assignedMembers: number;
  actionLabel: string;
  actionVariant: "contained" | "outlined";
};

const signatureTemplates: SignatureTemplate[] = [
  {
    id: 1,
    name: "Test",
    lastModified: "Last modified: August 24, 2025",
    dateCreated: "April 13, 2026",
    assignedMembers: 0,
    actionLabel: "Add Members +",
    actionVariant: "contained",
  },
  {
    id: 2,
    name: "Test",
    lastModified: "Last modified: August 24, 2025",
    dateCreated: "April 13, 2026",
    assignedMembers: 1,
    actionLabel: "Manage members",
    actionVariant: "outlined",
  },
  {
    id: 3,
    name: "Test",
    lastModified: "Last modified: August 24, 2025",
    dateCreated: "April 13, 2026",
    assignedMembers: 1,
    actionLabel: "Manage members",
    actionVariant: "outlined",
  },
];

export default function EmailSignaturesPage() {
  const [isAssignDialogOpen, setAssignDialogOpen] = useState<boolean>(false);

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
          sx={{
            mb: 2.2,
            pl: 0.6,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              color: "#512B7A",
              fontWeight: 700,
              letterSpacing: "-0.01em",
            }}
          >
            Email Signature Templates (3)
          </Typography>

          <Stack direction="row" spacing={1.2}>
            <Button
              variant="outlined"
              endIcon={<PowerOutlinedIcon />}
              sx={{
                textTransform: "none",
                borderRadius: 100,
                borderColor: "#D8D5DF",
                color: "#2E153F",
                px: 2.2,
                py: 0.7,
                fontSize: 13,
                fontWeight: 600,
                "&:hover": { borderColor: "#BDB8CA", bgcolor: "#F9F9FC" },
              }}
            >
              Set Up Email Integrations
            </Button>

            <Button
              component={Link}
              href="/email-signatures/create"
              variant="contained"
              sx={{
                textTransform: "none",
                borderRadius: 100,
                bgcolor: "#6F35A5",
                px: 2.2,
                py: 0.7,
                fontSize: 13,
                fontWeight: 600,
                boxShadow: "none",
                "&:hover": { bgcolor: "#5A268A", boxShadow: "none" },
              }}
            >
              Create Campaign +
            </Button>
          </Stack>
        </Stack>

        <Paper
          elevation={0}
          sx={{
            border: "1px solid #E7E5EC",
            borderRadius: 3,
            overflow: "hidden",
            bgcolor: "#FFFFFF",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1.9fr 1fr 1fr 1fr 52px",
              px: 3,
              py: 2,
              borderBottom: "1px solid #EEEAF4",
              color: "#5B5570",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            <Typography variant="inherit">Signature Name</Typography>
            <Typography variant="inherit">Data Created</Typography>
            <Typography variant="inherit">Assigned members</Typography>
            <Typography variant="inherit">Assign members</Typography>
            <Box />
          </Box>

          {signatureTemplates.map((template) => (
            <Box
              key={template.id}
              sx={{
                display: "grid",
                gridTemplateColumns: "1.9fr 1fr 1fr 1fr 52px",
                alignItems: "center",
                px: 3,
                py: 2.1,
                borderBottom:
                  template.id === signatureTemplates.length
                    ? "none"
                    : "1px solid #EEEAF4",
              }}
            >
              <Stack
                direction="row"
                spacing={1.8}
                sx={{ alignItems: "center" }}
              >
                <Image
                  alt="email Signature logo"
                  src="/images/emailsiglogo.png"
                  width={136}
                  height={84}
                  unoptimized
                />
                {/*                 
                <Avatar
                  variant="rounded"
                  sx={{
                    width: 62,
                    height: 50,
                    bgcolor: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    color: "#4B5563",
                    fontSize: 10,
                    fontWeight: 700,
                  }}
                >
                  LOGO
                </Avatar> */}
                <Box>
                  <Typography
                    sx={{ fontSize: 16, fontWeight: 600, color: "#17131F" }}
                  >
                    {template.name}
                  </Typography>
                  <Typography sx={{ fontSize: 12.5, color: "#9A94A8" }}>
                    {template.lastModified}
                  </Typography>
                </Box>
              </Stack>

              <Typography
                sx={{ fontSize: 14, color: "#312A3F", fontWeight: 500 }}
              >
                {template.dateCreated}
              </Typography>

              <Typography
                sx={{ fontSize: 14, color: "#312A3F", fontWeight: 500 }}
              >
                {template.assignedMembers} members
              </Typography>

              <Button
                variant={template.actionVariant}
                onClick={() => {
                  if (template.actionVariant === "contained") {
                    setAssignDialogOpen(true);
                  }
                }}
                startIcon={
                  template.actionVariant === "outlined" ? (
                    <PersonOutlineOutlinedIcon sx={{ fontSize: 17 }} />
                  ) : undefined
                }
                sx={{
                  justifySelf: "start",
                  textTransform: "none",
                  borderRadius: 100,
                  px: 2.1,
                  py: 0.65,
                  fontSize: 13,
                  fontWeight: 600,
                  boxShadow: "none",
                  ...(template.actionVariant === "contained"
                    ? {
                        bgcolor: "#6F35A5",
                        "&:hover": { bgcolor: "#5A268A", boxShadow: "none" },
                      }
                    : {
                        color: "#241B33",
                        borderColor: "#DDD8E8",
                        bgcolor: "#FFFFFF",
                        "&:hover": {
                          borderColor: "#BDB8CA",
                          bgcolor: "#F9F9FC",
                        },
                      }),
                }}
              >
                {template.actionLabel}
              </Button>

              <IconButton sx={{ color: "#4D425C", justifySelf: "end" }}>
                <MoreVertIcon />
              </IconButton>
            </Box>
          ))}
        </Paper>
      </Box>

      <AssignMembersDialog
        open={isAssignDialogOpen}
        onClose={() => setAssignDialogOpen(false)}
      />
    </Box>
  );
}

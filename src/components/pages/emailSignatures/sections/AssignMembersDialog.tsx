"use client";

import CloseIcon from "@mui/icons-material/Close";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Exo_2 } from "next/font/google";

type MemberItem = {
  id: number;
  name: string;
  email: string;
};

interface AssignMembersDialogProps {
  open: boolean;
  onClose: () => void;
}

const assignedMembers: MemberItem[] = [
  { id: 1, name: "abc", email: "abc@gmail.com" },
];

const unassignedMembers: MemberItem[] = [
  { id: 2, name: "Alia", email: "alia@gmail.com" },
];

function MemberRow({ member }: { member: MemberItem }) {
  return (
    <Stack direction="row" spacing={1.2} sx={{ alignItems: "center", py: 1.2 }}>
      <Checkbox
        size="small"
        sx={{
          p: 0,
          color: "#B7B1C4",
          "&.Mui-checked": { color: "#6C3EB2" },
        }}
      />

      <Box
        sx={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          border: "1px solid #E4E0EA",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#7E7990",
        }}
      >
        <PersonOutlineOutlinedIcon sx={{ fontSize: 17 }} />
      </Box>

      <Box>
        <Typography sx={{ fontSize: 13.2, color: "#1D1928", fontWeight: 500 }}>
          {member.name}
        </Typography>
        <Typography sx={{ fontSize: 12, color: "#7B748B" }}>
          {member.email}
        </Typography>
      </Box>
    </Stack>
  );
}

export default function AssignMembersDialog({
  open,
  onClose,
}: AssignMembersDialogProps) {
  return (
    <Dialog
      open={open}
      maxWidth={false}
      onClose={(_, reason) => {
        if (reason === "backdropClick") return;
        onClose();
      }}
      slotProps={{
        paper: {
          sx: {
            width: "min(860px, calc(100vw - 50px))",
            borderRadius: "28px",
            m: 2,
            p: 0,
            overflow: "hidden",
            boxShadow: "0 18px 56px rgba(19, 15, 30, 0.22)",
          },
        },
      }}
    >
      <Box sx={{ px: 3.4, pt: 2.4, pb: 1.2, bgcolor: "#FFFFFF" }}>
        <Stack
          direction="row"
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Typography
            sx={{
              fontSize: 26,
              fontWeight: 700,
              color: "#241B33",
              lineHeight: 1.1,
            }}
          >
            Assign Members to Test
          </Typography>
          <IconButton onClick={onClose} sx={{ color: "#9E98AC" }}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 1.7, mb: 1.8, alignItems: "center" }}
        >
          {/* INPUT */}
          <TextField
            size="small"
            placeholder="Search"
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 16, color: "#8E889D" }} />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              flex: 1, // 👈 important
              "& .MuiOutlinedInput-root": {
                borderRadius: 8,
                height: 42,
                bgcolor: "#F5F4F8",
                fontSize: 14,
                "& fieldset": { borderColor: "transparent" },
              },
            }}
          />

          {/* BUTTON */}
          <Button
            variant="outlined"
            endIcon={<FilterListOutlinedIcon sx={{ fontSize: 16 }} />}
            sx={{
              flexShrink: 0, // 👈 prevents shrinking
              whiteSpace: "nowrap", // 👈 fix wrap
              textTransform: "none",
              borderRadius: 100,
              borderColor: "#D8D5DF",
              color: "#2E153F",
              px: 2,
              py: 0.7,
              fontSize: 13,
              fontWeight: 600,
              "&:hover": { borderColor: "#BDB8CA", bgcolor: "#F9F9FC" },
            }}
          >
            Filter by Subteam
          </Button>
        </Stack>

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
          <Box>
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                mb: 0.8,
              }}
            >
              <Typography
                sx={{ fontSize: 14, color: "#2A2337", fontWeight: 600 }}
              >
                Assigned ({assignedMembers.length})
              </Typography>
              <Stack
                direction="row"
                spacing={0.6}
                sx={{ alignItems: "center" }}
              >
                <Checkbox size="small" sx={{ p: 0 }} />
                <Typography
                  sx={{ fontSize: 12.5, color: "#2F273D", fontWeight: 500 }}
                >
                  Select All
                </Typography>
              </Stack>
            </Stack>
            <Divider sx={{ borderColor: "#ECE8F2" }} />
            {assignedMembers.map((member) => (
              <MemberRow key={member.id} member={member} />
            ))}
          </Box>

          <Box>
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                mb: 0.8,
              }}
            >
              <Typography
                sx={{ fontSize: 14, color: "#2A2337", fontWeight: 600 }}
              >
                Unassigned ({unassignedMembers.length})
              </Typography>
              <Stack
                direction="row"
                spacing={0.6}
                sx={{ alignItems: "center" }}
              >
                <Checkbox size="small" sx={{ p: 0 }} />
                <Typography
                  sx={{ fontSize: 12.5, color: "#2F273D", fontWeight: 500 }}
                >
                  Select All
                </Typography>
              </Stack>
            </Stack>
            <Divider sx={{ borderColor: "#ECE8F2" }} />
            {unassignedMembers.map((member) => (
              <MemberRow key={member.id} member={member} />
            ))}
          </Box>
        </Box>

        <Box sx={{ height: 180 }} />

        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            pb: 2.1,
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: "center", gap: 1.5 }}
          >
            <Checkbox
              size="small"
              defaultChecked
              sx={{
                p: 0,
                mt: 0.1,
                color: "#B7B1C4",
                "&.Mui-checked": { color: "#6C3EB2" },
              }}
            />
            <Box>
              <Typography
                sx={{ fontSize: 14, color: "#1E1A28", fontWeight: 600 }}
              >
                Create team cohesion
              </Typography>
              <Typography sx={{ fontSize: 13, color: "#7E7890" }}>
                Set as default email signature for those assigned
              </Typography>
            </Box>
          </Stack>

          <Button
            disabled
            variant="contained"
            sx={{
              textTransform: "none",
              borderRadius: 100,
              px: 2.2,
              py: 0.7,
              fontSize: 14,
              bgcolor: "#CFCBD6",
              color: "#FFFFFF",
            }}
          >
            Waiting for action...
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
}

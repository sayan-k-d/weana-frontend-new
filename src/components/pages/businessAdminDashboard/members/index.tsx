"use client";

import { ChangeEvent, useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

import AddIcon from "@mui/icons-material/Add";

import Sidebar from "@/components/layout/Sidebar";
import { Member, ViewMode } from "@/types";
import PageActions from "@/components/ui/common/PageActions";
import { initialMembers } from "@/lib/constants";
import SearchBox from "@/components/ui/common/Searchbox";
import OnboardingBanner from "../sections/memberSection/OnBoardingBanner";
import MembersTable from "../sections/memberSection/MembersTable";
import MemberCard from "../sections/memberSection/MembersCard";
import AddMembersPage from "../sections/memberSection/AddMembers";

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [selected, setSelected] = useState<number[]>([]);
  const [search, setSearch] = useState<string>("");
  const [view, setView] = useState<ViewMode>("list");
  const [showBanner, setShowBanner] = useState<boolean>(true);

  const router = useRouter();

  // ── Derived state ──────────────────────────────────────────────────────────

  const filtered: Member[] = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.template.toLowerCase().includes(search.toLowerCase()),
  );

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleViewChange = (
    _: React.MouseEvent<HTMLElement>,
    newView: ViewMode | null,
  ): void => {
    if (newView) setView(newView);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F3F2F6",
        fontFamily: 'Inter, "Segoe UI", sans-serif',
        p: 2.2,
      }}
    >
      {/* Breadcrumb + action */}
      <Stack
        direction="row"
        sx={{
          mb: 1.6,
          pl: 0.6,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack
          direction="row"
          spacing={0.7}
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Typography
            sx={{
              fontSize: 16,
              color: "#512B7A",
              fontWeight: 700,
              letterSpacing: "-0.01em",
            }}
          >
            Members {`(${members.length})`}
          </Typography>
        </Stack>
        {/* ── Page Actions ── */}
        <PageActions
          view={view}
          onViewChange={handleViewChange}
          routePath="/members/add-member"
          buttonText="Add Members"
        />
      </Stack>
      {/* ── Search ── */}
      <SearchBox
        search={search}
        setSearch={setSearch}
        placeholderText="Search by name, job, title or email"
      />

      {/* ── Onboarding Banner ── */}
      {showBanner && (
        <OnboardingBanner onDismiss={() => setShowBanner(false)} />
      )}

      {/* ── Members Table ── */}
      <Paper
        elevation={0}
        sx={{
          border: "1px solid #E5E7EB",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        {view === "list" ? (
          <MembersTable
            data={filtered}
            selected={selected}
            setSelected={setSelected}
          />
        ) : (
          <Grid container spacing={2} sx={{ p: 3 }}>
            {filtered.map((member) => (
              <Grid sx={{ xs: 12, md: 4 }} key={member.id}>
                <MemberCard member={member} />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Add Members Footer */}
        <Box
          sx={{
            py: 2,
            textAlign: "center",
            borderTop: "1px solid #F3F4F6",
          }}
        >
          <Button
            variant="text"
            startIcon={<AddIcon sx={{ fontSize: 16 }} />}
            onClick={() => router.push("/members/add-member")}
            sx={{
              color: "#6B7280",
              fontSize: 13.5,
              fontWeight: 500,
              "&:hover": { color: "#6B3FA0", background: "#F5F3FF" },
              textTransform: "none",
              borderRadius: 50,
              px: 3.8,
              py: 0.75,
              boxShadow: "none",
              ml: 0.5,
            }}
          >
            Add Members
          </Button>
        </Box>
      </Paper>

      {/* ── Selection Bar ── */}
      {selected.length > 0 && (
        <Box
          sx={{
            mt: 2,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            p: 1.5,
            background: "#F5F3FF",
            borderRadius: 2,
            border: "1px solid #DDD6FE",
          }}
        >
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#6B3FA0" }}>
            {selected.length} member{selected.length > 1 ? "s" : ""} selected
          </Typography>
          <Button
            size="small"
            variant="outlined"
            onClick={() => setSelected([])}
            sx={{
              fontSize: 12,
              borderColor: "#6B3FA0",
              color: "#6B3FA0",
              py: 0.3,
              "&:hover": { background: "#EDE9FE" },
            }}
          >
            Clear selection
          </Button>
        </Box>
      )}
    </Box>
  );
}

"use client";

import PageActions from "@/components/ui/common/PageActions";
import SearchBox from "@/components/ui/common/Searchbox";
import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import OnboardingBanner from "../businessAdminDashboard/sections/OnboardingBanner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Team, ViewMode } from "@/types";
import { initialTeams } from "@/lib/constants";
import TeamsTable from "./sections/TeamsTable";
import TeamsCard from "./sections/TeamsCard";
import { AddTeamDialog } from "./sections/AddTeamDialog";

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [selected, setSelected] = useState<number[]>([]);
  const [search, setSearch] = useState<string>("");
  const [view, setView] = useState<ViewMode>("list");
  const [open, setOpen] = useState(false);

  const router = useRouter();

  // ── Derived state ──────────────────────────────────────────────────────────

  const filtered: Team[] = teams.filter((t) =>
    t.department.name.toLowerCase().includes(search.toLowerCase()),
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
            Teams {`(${teams.length})`}
          </Typography>
        </Stack>
        {/* ── Page Actions ── */}
        <PageActions
          view={view}
          onViewChange={handleViewChange}
          setOpen={setOpen}
          buttonText="Add Team"
        />
      </Stack>
      {/* ── Add Team Dialog ── */}
      <AddTeamDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={(data) => console.log(data)}
      />
      {/* ── Search ── */}
      <SearchBox
        search={search}
        setSearch={setSearch}
        placeholderText="Search by name, job, title or email"
      />

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
          <TeamsTable
            data={filtered}
            selected={selected}
            setSelected={setSelected}
          />
        ) : (
          <Grid container spacing={2} sx={{ p: 3 }}>
            {filtered.map((team) => (
              <Grid sx={{ xs: 12, md: 4 }} key={team.id}>
                <TeamsCard team={team} />
              </Grid>
            ))}
          </Grid>
        )}
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
            {selected.length} team{selected.length > 1 ? "s" : ""} selected
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

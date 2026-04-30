"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { TeamDetailTopBar } from "@/components/features/teamDetails/Teamdetailtopbar";
import { TeamDetailSidebar } from "@/components/features/teamDetails/Teamdetailsidebar";
import { TeamDetailMainContent } from "@/components/features/teamDetails/Teamdetailmaincontent";
import type {
  TeamDetailData,
  TeamDetailSectionId,
  TeamMember,
} from "@/components/pages/businessAdminDashboard/teams/constants/teamDetail";

// ── Mock seed data — replace with real API / props ────────────────────────────
const MOCK_TEAM: TeamDetailData = {
  id: 1,
  name: "Sales Department",
  color: "#6B3FA0",
  members: [
    {
      id: 1,
      email: "abc@gmail.com",
      role: "FULL TEAM ADMIN",
      partOfTeam: true,
    },
    {
      id: 2,
      email: "diego@gmail.com",
      name: "Diego",
      partOfTeam: true,
    },
    {
      id: 3,
      email: "alia@gmail.com",
      name: "Alia",
      partOfTeam: false,
    },
  ],
};

interface TeamDetailPageProps {
  /** Passed from Next.js dynamic route: /teams/[id] */
  teamId: string;
  /** Optionally inject team data (e.g. from server component); falls back to mock */
  initialData?: TeamDetailData;
}

export default function TeamDetailPage({
  teamId,
  initialData,
}: TeamDetailPageProps) {
  const router = useRouter();

  const [team, setTeam] = useState<TeamDetailData>(
    initialData ?? { ...MOCK_TEAM, id: Number(teamId) },
  );
  const [activeSection, setActiveSection] =
    useState<TeamDetailSectionId>("edit-members");

  const handleMembersUpdate = (updated: TeamMember[]) => {
    setTeam((prev) => ({ ...prev, members: updated }));
  };

  const handleViewTeamMembers = () => {
    // Navigate to the members view or open the View Members panel
    setActiveSection("view-members");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F3F2F6",
        fontFamily: 'Inter, "Segoe UI", sans-serif',
        display: "flex",
        flexDirection: "column",
        p: 2.2,
      }}
    >
      {/* ── Outer card ── */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          bgcolor: "#FFFFFF",
          borderRadius: "20px",
          overflow: "hidden",
          border: "1px solid #EAE8F0",
          boxShadow: "0 2px 16px rgba(19,15,30,0.06)",
          minHeight: "calc(100vh - 36px)",
        }}
      >
        {/* ── Top bar ── */}
        <TeamDetailTopBar
          teamName={team.name}
          onBack={() => router.push("/teams")}
          onViewTeamMembers={handleViewTeamMembers}
          onRenameTeam={() => console.log("Rename team")}
          onDeleteTeam={() => console.log("Delete team")}
        />

        {/* ── Body: sidebar + main content ── */}
        <Box sx={{ flex: 1, display: "flex", overflow: "hidden" }}>
          <TeamDetailSidebar
            activeId={activeSection}
            onChange={setActiveSection}
          />
          <TeamDetailMainContent
            activeSection={activeSection}
            members={team.members}
            onMembersUpdate={handleMembersUpdate}
          />
        </Box>
      </Box>
    </Box>
  );
}

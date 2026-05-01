"use client";

import { useRef, useState, ChangeEvent } from "react";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  InputAdornment,
  OutlinedInput,
  Typography,
  Avatar,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import type { TeamMember } from "@/components/pages/businessAdminDashboard/teams/constants/teamDetail";

interface EditMembersPanelProps {
  members: TeamMember[];
  onUpdate: (members: TeamMember[]) => void;
}

export function EditMembersPanel({ members, onUpdate }: EditMembersPanelProps) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const csvInputRef = useRef<HTMLInputElement>(null);

  const inTeam = members.filter((m) => m.partOfTeam);
  const notInTeam = members.filter((m) => !m.partOfTeam);

  // Filter both lists by search
  const filtered = (list: TeamMember[]) =>
    list.filter(
      (m) =>
        m.email.toLowerCase().includes(search.toLowerCase()) ||
        (m.name ?? "").toLowerCase().includes(search.toLowerCase()),
    );

  const filteredIn = filtered(inTeam);
  const filteredOut = filtered(notInTeam);

  // Select all across BOTH visible lists
  const allVisible = [...filteredIn, ...filteredOut];
  const allSelected =
    allVisible.length > 0 && allVisible.every((m) => selected.includes(m.id));

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelected([]);
    } else {
      setSelected(allVisible.map((m) => m.id));
    }
  };

  const toggleOne = (id: number) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  // Move selected "not in team" members into the team on Update
  const handleUpdate = () => {
    const updated = members.map((m) => ({
      ...m,
      partOfTeam: selected.includes(m.id) ? true : m.partOfTeam,
    }));
    onUpdate(updated);
    setSelected([]);
  };

  const handleCSV = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) console.log("CSV upload:", file.name);
    e.target.value = "";
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* ── Title ── */}
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 700,
          color: "#1E1A28",
          mb: 2.5,
          letterSpacing: "-0.01em",
        }}
      >
        Edit Members
      </Typography>

      {/* ── Search + CSV ── */}
      <Box sx={{ display: "flex", gap: 1.5, mb: 2.5 }}>
        <OutlinedInput
          fullWidth
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <SearchRoundedIcon sx={{ fontSize: 18, color: "#B0AEC4" }} />
            </InputAdornment>
          }
          sx={{
            borderRadius: "999px",
            fontSize: 13,
            bgcolor: "#F7F6FA",
            height: 42,
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E8E6F0" },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#C4C0D8",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#6B3FA0",
              borderWidth: 1.5,
            },
          }}
        />

        <Button
          variant="outlined"
          startIcon={
            <GroupAddOutlinedIcon sx={{ fontSize: "16px !important" }} />
          }
          onClick={() => csvInputRef.current?.click()}
          sx={{
            fontSize: 12.5,
            fontWeight: 700,
            textTransform: "none",
            borderRadius: "999px",
            px: 2,
            py: 0.8,
            whiteSpace: "nowrap",
            color: "#3D3A4A",
            borderColor: "#D8D4EC",
            bgcolor: "#FAFAFA",
            flexShrink: 0,
            "&:hover": {
              borderColor: "#6B3FA0",
              color: "#6B3FA0",
              bgcolor: "#F3F0FB",
            },
          }}
        >
          Add Members via CSV
        </Button>
        <input
          ref={csvInputRef}
          type="file"
          accept=".csv"
          style={{ display: "none" }}
          onChange={handleCSV}
        />
      </Box>

      {/* ── Two-column header ── */}
      <Box
        sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mb: 1 }}
      >
        {/* Left header */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#1E1A28" }}>
            Part of Team ({filteredIn.length})
          </Typography>
          {/* Select All */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.6,
              cursor: "pointer",
            }}
            onClick={toggleSelectAll}
          >
            <Checkbox
              size="small"
              checked={allSelected}
              indeterminate={selected.length > 0 && !allSelected}
              onChange={toggleSelectAll}
              sx={{
                p: 0,
                color: "#C4C0D8",
                "&.Mui-checked, &.MuiCheckbox-indeterminate": {
                  color: "#6B3FA0",
                },
              }}
            />
            <Typography
              sx={{ fontSize: 12.5, color: "#7B7892", userSelect: "none" }}
            >
              Select All
            </Typography>
          </Box>
        </Box>

        {/* Right header */}
        <Box>
          <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#1E1A28" }}>
            Not part of Team ({filteredOut.length})
          </Typography>
          <Divider sx={{ mt: 0.8, borderColor: "#EAE8F0" }} />
        </Box>
      </Box>

      {/* ── Member rows ── */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 2,
          alignContent: "start",
        }}
      >
        {/* LEFT: in team */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          {filteredIn.length === 0 && (
            <Typography
              sx={{
                fontSize: 12.5,
                color: "#B0AEC4",
                py: 2,
                textAlign: "center",
              }}
            >
              No members
            </Typography>
          )}
          {filteredIn.map((m) => (
            <MemberRow
              key={m.id}
              member={m}
              checked={selected.includes(m.id)}
              onToggle={() => toggleOne(m.id)}
            />
          ))}
        </Box>

        {/* RIGHT: not in team */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          {filteredOut.length === 0 && (
            <Typography
              sx={{
                fontSize: 12.5,
                color: "#B0AEC4",
                py: 2,
                textAlign: "center",
              }}
            >
              All members assigned
            </Typography>
          )}
          {filteredOut.map((m) => (
            <MemberRow
              key={m.id}
              member={m}
              checked={selected.includes(m.id)}
              onToggle={() => toggleOne(m.id)}
            />
          ))}
        </Box>
      </Box>

      {/* ── Footer ── */}
      <Box
        sx={{
          pt: 2,
          mt: 1,
          borderTop: "1px solid #EAE8F0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Box>
          <Typography sx={{ fontSize: 13, color: "#7B7892" }}>
            {`Don't see a member in the list?`}
          </Typography>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 600,
              color: "#6B3FA0",
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Add them here
          </Typography>
        </Box>

        <Button
          variant="contained"
          disableElevation
          disabled={selected.length === 0}
          onClick={handleUpdate}
          sx={{
            fontSize: 13,
            fontWeight: 700,
            textTransform: "none",
            borderRadius: "10px",
            px: 2.5,
            py: 0.9,
            bgcolor: selected.length > 0 ? "#6B3FA0" : "#EAE8F0",
            color: selected.length > 0 ? "#fff" : "#B0AEC4",
            "&:hover": { bgcolor: selected.length > 0 ? "#5A3490" : "#EAE8F0" },
            "&.Mui-disabled": { bgcolor: "#EAE8F0", color: "#B0AEC4" },
          }}
        >
          Update Members
        </Button>
      </Box>
    </Box>
  );
}

// ── Single member row ─────────────────────────────────────────────────────────
function MemberRow({
  member,
  checked,
  onToggle,
}: {
  member: TeamMember;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        py: 0.8,
        px: 0.5,
        borderRadius: "8px",
        cursor: "pointer",
        "&:hover": { bgcolor: "#F7F6FA" },
        transition: "background 0.12s",
      }}
      onClick={onToggle}
    >
      <Checkbox
        size="small"
        checked={checked}
        onChange={onToggle}
        onClick={(e) => e.stopPropagation()}
        sx={{
          p: 0,
          flexShrink: 0,
          color: "#C4C0D8",
          "&.Mui-checked": { color: "#6B3FA0" },
        }}
      />

      {/* Avatar */}
      {member.avatarUrl ? (
        <Avatar
          src={member.avatarUrl}
          sx={{ width: 28, height: 28, flexShrink: 0 }}
        />
      ) : (
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            bgcolor: "#EDE9F8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <PersonOutlineRoundedIcon sx={{ fontSize: 16, color: "#6B3FA0" }} />
        </Box>
      )}

      {/* Name / email */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        {member.name && (
          <Typography
            sx={{
              fontSize: 12.5,
              fontWeight: 600,
              color: "#1E1A28",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {member.name}
          </Typography>
        )}
        <Typography
          sx={{
            fontSize: 12,
            color: "#7B7892",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {member.email}
        </Typography>
      </Box>

      {/* Role badge */}
      {member.role && (
        <Chip
          label={member.role}
          size="small"
          sx={{
            fontSize: 9.5,
            fontWeight: 700,
            height: 20,
            bgcolor: "#F0EEF8",
            color: "#6B3FA0",
            border: "none",
            flexShrink: 0,
            letterSpacing: "0.02em",
          }}
        />
      )}
    </Box>
  );
}

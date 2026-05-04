"use client";

import { useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { TemplatesTable } from "../sections/templateSection/Templatestable";
import {
  T_COLORS,
  PAGE_TITLE_SX,
  HEADER_ROW_SX,
  SEARCH_INPUT_SX,
  ADD_TEMPLATES_BTN_SX,
} from "@/components/pages/businessAdminDashboard/templates/constants/Templatesstyles";
import {
  INITIAL_TEMPLATES,
  type Template,
} from "@/components/pages/businessAdminDashboard/templates/constants/templatesConstants";

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>(INITIAL_TEMPLATES);
  const [search, setSearch] = useState("");

  // ── Derived ──────────────────────────────────────────────────────────────────
  const filtered = templates.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()),
  );

  // ── Handlers ─────────────────────────────────────────────────────────────────
  const handleEditTemplate = (id: number) => {
    console.log("Edit template:", id);
    // router.push(`/templates/${id}/edit`)
  };

  const handleAssignMembers = (id: number) => {
    console.log("Assign members to template:", id);
    // open assign members dialog
  };

  const handleDuplicate = (id: number) => {
    const source = templates.find((t) => t.id === id);
    if (!source) return;
    const newTemplate: Template = {
      ...source,
      id: Date.now(),
      name: `${source.name} (copy)`,
      memberCount: 0,
    };
    setTemplates((prev) => [...prev, newTemplate]);
  };

  const handleDelete = (id: number) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAddTemplate = () => {
    console.log("Add template");
    // router.push("/templates/new") or open dialog
  };

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: T_COLORS.pageBg,
        fontFamily: 'Inter, "Segoe UI", sans-serif',
        p: 2.5,
      }}
    >
      {/* ── Header: Title + Add button ── */}
      <Box sx={HEADER_ROW_SX as object}>
        <Typography sx={PAGE_TITLE_SX as object}>
          Templates&nbsp;
          <Box
            component="span"
            sx={{ fontWeight: 400, color: T_COLORS.textMuted, fontSize: 16 }}
          >
            ({filtered.length})
          </Box>
        </Typography>

        <Button
          variant="contained"
          disableElevation
          startIcon={<AddRoundedIcon sx={{ fontSize: "16px !important" }} />}
          onClick={handleAddTemplate}
          sx={ADD_TEMPLATES_BTN_SX as object}
        >
          Add Templates +
        </Button>
      </Box>

      {/* ── Search bar ── */}
      <OutlinedInput
        fullWidth
        placeholder="Search by name, job, title or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        startAdornment={
          <InputAdornment position="start">
            <SearchRoundedIcon
              sx={{ fontSize: 18, color: T_COLORS.textMuted }}
            />
          </InputAdornment>
        }
        sx={SEARCH_INPUT_SX as object}
      />

      {/* ── Table ── */}
      <Box sx={{ mt: 2.5 }}>
        <TemplatesTable
          templates={filtered}
          onEditTemplate={handleEditTemplate}
          onAssignMembers={handleAssignMembers}
          onDuplicate={handleDuplicate}
          onDelete={handleDelete}
        />
      </Box>
    </Box>
  );
}

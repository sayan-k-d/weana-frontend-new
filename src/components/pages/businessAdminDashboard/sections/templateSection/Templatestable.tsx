"use client";

import { Box, Typography } from "@mui/material";
import { TemplateAvatar } from "./TemplateAvatar";
import { TemplateRowActions } from "./TemplateRowActions";
import {
  TABLE_CARD_SX,
  TABLE_HEADER_SX,
  TABLE_ROW_SX,
  COLUMN_LABEL_SX,
  MEMBER_NAME_SX,
  T_COLORS,
} from "@/components/pages/businessAdminDashboard/templates/constants/Templatesstyles";
import type { Template } from "@/components/pages/businessAdminDashboard/templates/constants/templatesConstants";
import Link from "next/link";

interface TemplatesTableProps {
  templates: Template[];
  onEditTemplate: (id: number) => void;
  onAssignMembers: (id: number) => void;
  onDuplicate: (id: number) => void;
  onDelete: (id: number) => void;
}

// ── Column header row ─────────────────────────────────────────────────────────
function TableHeader() {
  return (
    <Box sx={TABLE_HEADER_SX as object}>
      <Typography sx={COLUMN_LABEL_SX as object}>Template Info</Typography>
      <Typography sx={{ ...COLUMN_LABEL_SX, textAlign: "center" } as object}>
        Template
      </Typography>
      <Typography sx={{ ...COLUMN_LABEL_SX, textAlign: "center" } as object}>
        Members
      </Typography>
      {/* Spacer for kebab column */}
      <Box />
    </Box>
  );
}

// ── Single template row ───────────────────────────────────────────────────────
function TemplateRow({
  template,
  onEditTemplate,
  onAssignMembers,
  onDuplicate,
  onDelete,
}: {
  template: Template;
  onEditTemplate: (id: number) => void;
  onAssignMembers: (id: number) => void;
  onDuplicate: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <Box sx={TABLE_ROW_SX as object}>
      {/* ── Template Info: avatar + name ── */}
      <Link
        className="table-link"
        href={`/templates/${template.id}`}
        style={{ textDecoration: "none", color: "#000000" }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {" "}
          <TemplateAvatar name={template.name} avatarUrl={template.avatarUrl} />
          <Typography sx={MEMBER_NAME_SX as object}>{template.name}</Typography>
        </Box>
      </Link>

      {/* Edit + Assign + Kebab — rendered as grid children via display:contents */}
      <TemplateRowActions
        template={template}
        onEditTemplate={onEditTemplate}
        onAssignMembers={onAssignMembers}
        onDuplicate={onDuplicate}
        onDelete={onDelete}
      />
    </Box>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <Box
      sx={{
        py: 7,
        textAlign: "center",
        color: T_COLORS.textMuted,
        fontSize: 14,
      }}
    >
      {`No templates found. Click "Add Templates +" to create one.`}
    </Box>
  );
}

// ── Table ─────────────────────────────────────────────────────────────────────
export function TemplatesTable({
  templates,
  onEditTemplate,
  onAssignMembers,
  onDuplicate,
  onDelete,
}: TemplatesTableProps) {
  return (
    <Box sx={TABLE_CARD_SX as object}>
      <TableHeader />
      {templates.length === 0 ? (
        <EmptyState />
      ) : (
        templates.map((t) => (
          <TemplateRow
            key={t.id}
            template={t}
            onEditTemplate={onEditTemplate}
            onAssignMembers={onAssignMembers}
            onDuplicate={onDuplicate}
            onDelete={onDelete}
          />
        ))
      )}
    </Box>
  );
}

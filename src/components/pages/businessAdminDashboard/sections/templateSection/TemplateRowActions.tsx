"use client";

import { useState } from "react";
import { Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import {
  T_COLORS,
  T_RADII,
  EDIT_BTN_SX,
  ASSIGN_BTN_FILLED_SX,
  ASSIGN_BTN_OUTLINE_SX,
} from "@/components/pages/businessAdminDashboard/templates/constants/Templatesstyles";
import type { Template } from "@/components/pages/businessAdminDashboard/templates/constants/templatesConstants";

interface TemplateRowActionsProps {
  template: Template;
  onEditTemplate: (id: number) => void;
  onAssignMembers: (id: number) => void;
  onDuplicate: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TemplateRowActions({
  template,
  onEditTemplate,
  onAssignMembers,
  onDuplicate,
  onDelete,
}: TemplateRowActionsProps) {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const hasMembers = template.memberCount > 0;

  return (
    <Box
      sx={{ display: "contents" }} // grid children — let parent grid place them
    >
      {/* ── Template action ── */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="outlined"
          onClick={() => onEditTemplate(template.id)}
          disableElevation
          sx={EDIT_BTN_SX as object}
        >
          Edit Template
        </Button>
      </Box>

      {/* ── Members action ── */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {hasMembers ? (
          <Button
            variant="outlined"
            onClick={() => onAssignMembers(template.id)}
            disableElevation
            sx={ASSIGN_BTN_OUTLINE_SX as object}
          >
            {template.memberCount} Member
            {template.memberCount !== 1 ? "s" : ""}
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => onAssignMembers(template.id)}
            disableElevation
            sx={ASSIGN_BTN_FILLED_SX as object}
          >
            Assign Members
          </Button>
        )}
      </Box>

      {/* ── Kebab menu ── */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <IconButton
          size="small"
          onClick={(e) => setAnchor(e.currentTarget)}
          sx={{ color: T_COLORS.textMuted }}
        >
          <MoreVertRoundedIcon sx={{ fontSize: 20 }} />
        </IconButton>

        <Menu
          anchorEl={anchor}
          open={Boolean(anchor)}
          onClose={() => setAnchor(null)}
          slotProps={{
            paper: {
              sx: {
                borderRadius: T_RADII.md,
                border: `1px solid ${T_COLORS.cardBorder}`,
                boxShadow: "0 8px 24px rgba(19,15,30,0.10)",
                minWidth: 150,
                mt: 0.5,
              },
            },
          }}
        >
          <MenuItem
            onClick={() => {
              onEditTemplate(template.id);
              setAnchor(null);
            }}
            sx={{ fontSize: 13, color: T_COLORS.textPrimary, py: 1 }}
          >
            Edit Template
          </MenuItem>
          <MenuItem
            onClick={() => {
              onDuplicate(template.id);
              setAnchor(null);
            }}
            sx={{ fontSize: 13, color: T_COLORS.textPrimary, py: 1 }}
          >
            Duplicate
          </MenuItem>
          <MenuItem
            onClick={() => {
              onDelete(template.id);
              setAnchor(null);
            }}
            sx={{ fontSize: 13, color: "#E05858", py: 1 }}
          >
            Delete
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}

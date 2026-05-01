"use client";

import { useState } from "react";
import {
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import {
  PanelTitle,
  PanelSubtitle,
  SurfaceCard,
  RowDivider,
  LogoCircle,
  PillButton,
  PanelFooter,
  TD_COLORS,
  TD_RADII,
} from "@/components/pages/businessAdminDashboard/teams/constants/Teamdetailprimitives";
import {
  DEFAULT_TEMPLATE_AUTO_ASSIGN_FORM,
  AVAILABLE_TEMPLATES,
  MAX_ASSIGNED_TEMPLATES,
  type AssignedTemplate,
  type TemplateAutoAssignFormData,
} from "@/components/pages/businessAdminDashboard/teams/constants/Templateautoassignconstants";

// ─── Single template row ──────────────────────────────────────────────────────
function TemplateRow({
  template,
  onSetDefault,
  onRemove,
}: {
  template: AssignedTemplate;
  onSetDefault: (id: number) => void;
  onRemove: (id: number) => void;
}) {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          px: 2.5,
          py: 1.8,
        }}
      >
        {/* Logo */}
        <LogoCircle
          bg={template.logoBg}
          initials={template.logoInitials}
          size={52}
        />

        {/* Name */}
        <Typography
          sx={{
            flex: 1,
            fontSize: 14,
            fontWeight: 600,
            color: TD_COLORS.textPrimary,
          }}
        >
          {template.name}
        </Typography>

        {/* Default badge */}
        {template.isDefault && (
          <Chip
            label="DEFAULT TEMPLATE"
            size="small"
            sx={{
              fontSize: 10,
              fontWeight: 700,
              height: 24,
              bgcolor: "#3D3A4A",
              color: "#fff",
              borderRadius: TD_RADII.full,
              letterSpacing: "0.04em",
            }}
          />
        )}

        {/* Kebab */}
        <IconButton
          size="small"
          onClick={(e) => setAnchor(e.currentTarget)}
          sx={{ color: TD_COLORS.textMuted, flexShrink: 0 }}
        >
          <MoreVertRoundedIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        slotProps={{
          paper: {
            sx: {
              borderRadius: TD_RADII.md,
              border: `1px solid ${TD_COLORS.cardBorder}`,
              boxShadow: "0 8px 24px rgba(19,15,30,0.10)",
              minWidth: 160,
              mt: 0.5,
            },
          },
        }}
      >
        {!template.isDefault && (
          <MenuItem
            onClick={() => {
              onSetDefault(template.id);
              setAnchor(null);
            }}
            sx={{ fontSize: 13, color: TD_COLORS.textPrimary, py: 1 }}
          >
            Set as default
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            onRemove(template.id);
            setAnchor(null);
          }}
          sx={{ fontSize: 13, color: "#E05858", py: 1 }}
        >
          Remove
        </MenuItem>
      </Menu>
    </>
  );
}

// ─── Add Templates Dialog ─────────────────────────────────────────────────────
function AddTemplatesDialog({
  open,
  onClose,
  alreadyAssigned,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  alreadyAssigned: number[];
  onAdd: (templates: AssignedTemplate[]) => void;
}) {
  const [selected, setSelected] = useState<number[]>([]);

  const toggleSelect = (id: number) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const handleConfirm = () => {
    const toAdd = AVAILABLE_TEMPLATES.filter((t) => selected.includes(t.id));
    onAdd(toAdd);
    setSelected([]);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            borderRadius: TD_RADII.lg,
            border: `1px solid ${TD_COLORS.cardBorder}`,
            minWidth: 380,
            boxShadow: "0 8px 32px rgba(19,15,30,0.12)",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          fontSize: 15,
          fontWeight: 700,
          color: TD_COLORS.textPrimary,
          pb: 1,
        }}
      >
        Add Templates
      </DialogTitle>
      <DialogContent sx={{ pt: 0 }}>
        <Typography sx={{ fontSize: 12.5, color: TD_COLORS.textMuted, mb: 2 }}>
          Select templates to assign (max {MAX_ASSIGNED_TEMPLATES} total)
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
          {AVAILABLE_TEMPLATES.map((t) => {
            const isAssigned = alreadyAssigned.includes(t.id);
            const isSelected = selected.includes(t.id);
            return (
              <Box
                key={t.id}
                onClick={() => !isAssigned && toggleSelect(t.id)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  px: 1.5,
                  py: 1.2,
                  border: `1px solid ${isSelected ? TD_COLORS.brandBorder : TD_COLORS.cardBorder}`,
                  borderRadius: TD_RADII.md,
                  bgcolor: isSelected ? TD_COLORS.brandLight : "#FAFAFA",
                  cursor: isAssigned ? "not-allowed" : "pointer",
                  opacity: isAssigned ? 0.45 : 1,
                  transition: "all 0.13s",
                  "&:hover": !isAssigned
                    ? {
                        borderColor: TD_COLORS.brandBorder,
                        bgcolor: TD_COLORS.brandLight,
                      }
                    : {},
                }}
              >
                <LogoCircle bg={t.logoBg} initials={t.logoInitials} size={38} />
                <Typography
                  sx={{
                    flex: 1,
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: TD_COLORS.textPrimary,
                  }}
                >
                  {t.name}
                </Typography>
                {isSelected && (
                  <CheckRoundedIcon
                    sx={{ fontSize: 16, color: TD_COLORS.brand }}
                  />
                )}
              </Box>
            );
          })}
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <PillButton variant="ghost" onClick={onClose}>
          Cancel
        </PillButton>
        <PillButton
          variant="primary"
          disabled={selected.length === 0}
          onClick={handleConfirm}
        >
          Add ({selected.length})
        </PillButton>
      </DialogActions>
    </Dialog>
  );
}

// ─── Main panel ───────────────────────────────────────────────────────────────
interface TemplateAutoAssignPanelProps {
  initialData?: TemplateAutoAssignFormData;
  onSave?: (data: TemplateAutoAssignFormData) => void;
}

export function TemplateAutoAssignPanel({
  initialData,
  onSave,
}: TemplateAutoAssignPanelProps) {
  const [form, setForm] = useState<TemplateAutoAssignFormData>(
    initialData ?? { ...DEFAULT_TEMPLATE_AUTO_ASSIGN_FORM },
  );
  const [addOpen, setAddOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const patch = (templates: AssignedTemplate[]) => {
    setForm({ assignedTemplates: templates });
    setHasChanges(true);
  };

  const handleSetDefault = (id: number) => {
    patch(
      form.assignedTemplates.map((t) => ({ ...t, isDefault: t.id === id })),
    );
  };

  const handleRemove = (id: number) => {
    patch(form.assignedTemplates.filter((t) => t.id !== id));
  };

  const handleAdd = (templates: AssignedTemplate[]) => {
    const current = form.assignedTemplates;
    const available = MAX_ASSIGNED_TEMPLATES - current.length;
    patch([...current, ...templates.slice(0, available)]);
  };

  const handleCancel = () => {
    setForm(initialData ?? { ...DEFAULT_TEMPLATE_AUTO_ASSIGN_FORM });
    setHasChanges(false);
  };

  const handleSave = () => {
    onSave?.(form);
    setHasChanges(false);
  };

  const canAddMore = form.assignedTemplates.length < MAX_ASSIGNED_TEMPLATES;

  return (
    <Box>
      {/* Header */}
      <PanelTitle sx={{ mb: 0.5 }}>Template Auto Assign</PanelTitle>
      <PanelSubtitle>
        Select up to three templates to be auto assigned to members upon adding
        them to a team.
      </PanelSubtitle>

      {/* Template list card */}
      <SurfaceCard>
        {form.assignedTemplates.map((template, index) => (
          <Box key={template.id}>
            <TemplateRow
              template={template}
              onSetDefault={handleSetDefault}
              onRemove={handleRemove}
            />
            {index < form.assignedTemplates.length - 1 && <RowDivider />}
          </Box>
        ))}
        {form.assignedTemplates.length === 0 && (
          <Box
            sx={{
              py: 5,
              textAlign: "center",
              color: TD_COLORS.textMuted,
              fontSize: 13.5,
            }}
          >
            {`No templates assigned. Click "Add Templates +" to get started.`}
          </Box>
        )}
      </SurfaceCard>

      {/* Footer */}
      <PanelFooter
        onCancel={handleCancel}
        onSubmit={handleSave}
        submitDisabled={!hasChanges}
        leftSlot={
          <PillButton
            variant="ghost"
            disabled={!canAddMore}
            startIcon={<AddRoundedIcon sx={{ fontSize: "15px !important" }} />}
            onClick={() => setAddOpen(true)}
            sx={{ opacity: canAddMore ? 1 : 0.5 }}
          >
            Add Templates +
          </PillButton>
        }
      />

      {/* Add Templates dialog */}
      <AddTemplatesDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        alreadyAssigned={form.assignedTemplates.map((t) => t.id)}
        onAdd={handleAdd}
      />
    </Box>
  );
}

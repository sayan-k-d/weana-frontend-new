import type { SxProps, Theme } from "@mui/material";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface AssignedTemplate {
  id: number;
  name: string;
  logoBg: string; // background color for the logo circle
  logoInitials: string; // text inside the logo circle
  isDefault: boolean;
}

export interface TemplateAutoAssignFormData {
  assignedTemplates: AssignedTemplate[];
}

// ── Constants ─────────────────────────────────────────────────────────────────

export const MAX_ASSIGNED_TEMPLATES = 3;

export const DEFAULT_TEMPLATE_AUTO_ASSIGN_FORM: TemplateAutoAssignFormData = {
  assignedTemplates: [
    {
      id: 1,
      name: "Template 1",
      logoBg: "#7B3FA0",
      logoInitials: "LO\nGO",
      isDefault: false,
    },
    {
      id: 2,
      name: "Template 2",
      logoBg: "#2C2B4A",
      logoInitials: "LO\nGO",
      isDefault: false,
    },
    {
      id: 3,
      name: "Template 13",
      logoBg: "#D4614A",
      logoInitials: "LO\nGO",
      isDefault: true,
    },
  ],
};

// ── Available templates to pick from (mock) ───────────────────────────────────
export const AVAILABLE_TEMPLATES: AssignedTemplate[] = [
  {
    id: 4,
    name: "Template 4",
    logoBg: "#2563EB",
    logoInitials: "LO\nGO",
    isDefault: false,
  },
  {
    id: 5,
    name: "Template 5",
    logoBg: "#059669",
    logoInitials: "LO\nGO",
    isDefault: false,
  },
  {
    id: 6,
    name: "Template 6",
    logoBg: "#D97706",
    logoInitials: "LO\nGO",
    isDefault: false,
  },
  {
    id: 7,
    name: "Template 7",
    logoBg: "#7C3AED",
    logoInitials: "LO\nGO",
    isDefault: false,
  },
  {
    id: 8,
    name: "Template 8",
    logoBg: "#DC2626",
    logoInitials: "LO\nGO",
    isDefault: false,
  },
];

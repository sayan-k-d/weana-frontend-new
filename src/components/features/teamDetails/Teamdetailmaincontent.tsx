"use client";

import { Box } from "@mui/material";
import { EditMembersPanel } from "./Editmemberspanel";
import {
  GeneralPanel as PlaceholderGeneralPanel,
  RestrictionsPanel as PlaceholderRestrictionsPanel,
  TemplateAutoAssignPanel as PlaceholderTemplateAutoAssignPanel,
  IntegrationsPanel as PlaceholderIntegrationsPanel,
  ViewMembersPanel,
} from "./Placeholderpanels";
import type {
  TeamDetailSectionId,
  TeamMember,
  TeamGeneralFormData,
  TeamRestrictionsFormData,
} from "@/components/pages/businessAdminDashboard/teams/constants/teamDetail";
import { GeneralPanel } from "./GeneralPanel";
import { RestrictionsPanel } from "./RestrictionsPanel";
import { TemplateAutoAssignFormData } from "@/components/pages/businessAdminDashboard/teams/constants/Templateautoassignconstants";
import { TemplateAutoAssignPanel } from "./Templateautoassignpanel";
import { IntegrationsPanel } from "./Integrationspanel";

interface TeamDetailMainContentProps {
  activeSection: TeamDetailSectionId;
  members: TeamMember[];
  onMembersUpdate: (members: TeamMember[]) => void;
  // General
  generalData?: TeamGeneralFormData;
  onGeneralSave?: (data: TeamGeneralFormData) => void;
  // Restrictions
  restrictionsData?: TeamRestrictionsFormData;
  onRestrictionsSave?: (data: TeamRestrictionsFormData) => void;
  onCopyRestrictions?: () => void;
  // Template Auto Assign
  templateAutoAssignData?: TemplateAutoAssignFormData;
  onTemplateAutoAssignSave?: (data: TemplateAutoAssignFormData) => void;
  // Integrations
  onRequestIntegration?: () => void;
}

export function TeamDetailMainContent({
  activeSection,
  members,
  onMembersUpdate,
  generalData,
  onGeneralSave,
  restrictionsData,
  onRestrictionsSave,
  onCopyRestrictions,
  templateAutoAssignData,
  onTemplateAutoAssignSave,
  onRequestIntegration,
}: TeamDetailMainContentProps) {
  const renderPanel = () => {
    switch (activeSection) {
      case "edit-members":
        return (
          <EditMembersPanel members={members} onUpdate={onMembersUpdate} />
        );
      case "general":
        return (
          <GeneralPanel initialData={generalData} onSave={onGeneralSave} />
        );
      case "restrictions":
        return (
          <RestrictionsPanel
            initialData={restrictionsData}
            onSave={onRestrictionsSave}
            onCopyFromTeam={onCopyRestrictions}
          />
        );
      case "template-auto-assign":
        return (
          <TemplateAutoAssignPanel
            initialData={templateAutoAssignData}
            onSave={onTemplateAutoAssignSave}
          />
        );
      case "integrations":
        return (
          <IntegrationsPanel onRequestIntegration={onRequestIntegration} />
        );
      case "view-members":
        return <ViewMembersPanel />;
    }
  };

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        px: 3.5,
        py: 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {renderPanel()}
    </Box>
  );
}

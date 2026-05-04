"use client";

import { useMemo, useState } from "react";
import { Box, Divider } from "@mui/material";
import { useRouter } from "next/navigation";

// ── Shared layout components ───────────────────────────────────────────────────
import { TemplateTopBar } from "@/components/features/templateDetails/TemplateTopBar";
import { TemplateSideMenu } from "@/components/features/templateDetails/TemplateSideMenu";
import { TemplateLivePreview } from "@/components/features/templateDetails/TemplateLivePreview";
import { TemplateSettingsPanel } from "@/components/features/templateDetails/TemplateSettingsPanel";

// ── Re-used member-profile section components ─────────────────────────────────
import { AboutFormSection } from "@/components/features/memberProfile";
import { FormFooter } from "@/components/features/memberProfile";
import { LinksSection } from "@/components/pages/businessAdminDashboard/sections/memberSection/LinksSection";
import {
  LeadCaptureSection,
  DEFAULT_LEAD_CAPTURE_FORM,
  type LeadCaptureFormData,
} from "@/components/features/leadcapture";
import { FollowUpEmailSection } from "@/components/features/followupEmail";
import {
  DEFAULT_FOLLOW_UP_EMAIL_FORM,
  type FollowUpEmailFormData,
} from "@/components/pages/businessAdminDashboard/members/constants/followupEmail";
import { EmailLivePreview } from "@/components/features/followupEmail/Emaillivepreview";
import { QRCodeSection } from "@/components/features/qrcodesection";
import {
  DEFAULT_QR_CODE_FORM,
  type QRCodeFormData,
} from "@/components/pages/businessAdminDashboard/members/constants/qrCode";
import { QRCodePreview } from "@/components/features/qrcodesection/Qrcodepreview";

// ── Template-specific types & constants ───────────────────────────────────────
import {
  TEMPLATE_SELF_MANAGED_FOOTER,
  DEFAULT_TEMPLATE_SETTINGS,
  type TemplateSectionId,
  type TemplateSettingsFormData,
} from "@/components/pages/businessAdminDashboard/templates/constants/templateDetailConstants";

// ── Member profile types ───────────────────────────────────────────────────────
import { DEFAULT_FORM } from "@/components/pages/businessAdminDashboard/members/constants/memberProfile";
import { initialMembers } from "@/lib/constants";
import type { MemberProfileFormData } from "@/types";

// ─── Active panel switcher ────────────────────────────────────────────────────
function ActivePanel({
  id,
  form,
  onChange,
  leadCaptureForm,
  onLeadCaptureChange,
  followUpEmailForm,
  onFollowUpEmailChange,
  qrCodeForm,
  onQRCodeChange,
  settingsForm,
  onSettingsChange,
}: {
  id: TemplateSectionId;
  form: MemberProfileFormData;
  onChange: (p: Partial<MemberProfileFormData>) => void;
  leadCaptureForm: LeadCaptureFormData;
  onLeadCaptureChange: (p: Partial<LeadCaptureFormData>) => void;
  followUpEmailForm: FollowUpEmailFormData;
  onFollowUpEmailChange: (p: Partial<FollowUpEmailFormData>) => void;
  qrCodeForm: QRCodeFormData;
  onQRCodeChange: (p: Partial<QRCodeFormData>) => void;
  settingsForm: TemplateSettingsFormData;
  onSettingsChange: (p: Partial<TemplateSettingsFormData>) => void;
}) {
  switch (id) {
    case "about":
      return <AboutFormSection form={form} onChange={onChange} />;
    case "links":
      return <LinksSection />;
    case "qr-code":
      return <QRCodeSection form={qrCodeForm} onChange={onQRCodeChange} />;
    case "contact-capture-form":
      return (
        <LeadCaptureSection
          key={leadCaptureForm.header || "reset"}
          form={leadCaptureForm}
          onChange={onLeadCaptureChange}
        />
      );
    case "follow-up-email":
      return (
        <FollowUpEmailSection
          form={followUpEmailForm}
          onChange={onFollowUpEmailChange}
        />
      );
    case "settings":
      return (
        <TemplateSettingsPanel
          initialData={settingsForm}
          onChange={onSettingsChange}
        />
      );
  }
}

// ─── Right preview panel ──────────────────────────────────────────────────────
function RightPreviewPanel({
  activeSection,
  form,
  leadCaptureForm,
  followUpEmailForm,
  qrCodeForm,
  memberName,
  cardUrl,
}: {
  activeSection: TemplateSectionId;
  form: MemberProfileFormData;
  leadCaptureForm: LeadCaptureFormData;
  followUpEmailForm: FollowUpEmailFormData;
  qrCodeForm: QRCodeFormData;
  memberName: string;
  cardUrl: string;
}) {
  if (activeSection === "follow-up-email") {
    return (
      <EmailLivePreview form={followUpEmailForm} senderName={memberName} />
    );
  }

  if (activeSection === "qr-code") {
    return <QRCodePreview form={qrCodeForm} value={cardUrl} />;
  }

  const previewLeadCapture =
    activeSection === "contact-capture-form" ? leadCaptureForm : undefined;

  // Settings has a larger preview card
  return (
    <TemplateLivePreview form={form} leadCaptureForm={previewLeadCapture} />
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
interface TemplateDetailPageProps {
  templateId: string;
}

export default function TemplateDetailPage({
  templateId,
}: TemplateDetailPageProps) {
  const router = useRouter();

  // Reuse member data as template base — swap with real template API data
  const memberData = useMemo(
    () => initialMembers.find((m) => m.id === Number(templateId)),
    [templateId],
  );

  const [activeSection, setActiveSection] =
    useState<TemplateSectionId>("about");

  const [form, setForm] = useState<MemberProfileFormData>(() => {
    if (memberData) {
      return {
        ...DEFAULT_FORM,
        cardName: memberData.name,
        name: memberData.name,
        profilePictureUrl: memberData.avatarUrl,
        email: memberData.email,
      };
    }
    return DEFAULT_FORM;
  });

  const [leadCaptureForm, setLeadCaptureForm] = useState<LeadCaptureFormData>(
    DEFAULT_LEAD_CAPTURE_FORM,
  );

  const [followUpEmailForm, setFollowUpEmailForm] =
    useState<FollowUpEmailFormData>(DEFAULT_FOLLOW_UP_EMAIL_FORM);

  const [qrCodeForm, setQRCodeForm] =
    useState<QRCodeFormData>(DEFAULT_QR_CODE_FORM);

  const [settingsForm, setSettingsForm] = useState<TemplateSettingsFormData>(
    DEFAULT_TEMPLATE_SETTINGS,
  );

  const memberName = form.name || "Diego";
  const cardUrl = `https://weana.app/card/${form.name?.toLowerCase().replace(/\s+/g, "-") ?? "user"}`;

  const handleCancel = () => setForm(form);
  const handleUpdate = () => console.log("Template updated:", form);

  // Right panel is wider on settings (shows a large card)
  const rightPanelWidth = activeSection === "settings" ? 320 : 260;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F3F2F6",
        fontFamily: 'Inter, "Segoe UI", sans-serif',
        display: "flex",
        flexDirection: "column",
      }}
      key={templateId}
    >
      {/* ── Top bar ── */}
      <TemplateTopBar
        memberName={memberName}
        memberEmail={form.email ?? ""}
        memberAvatarUrl={form.profilePictureUrl ?? undefined}
        onBack={() => router.push("/templates")}
        onAddTemplate={() => console.log("Add template")}
        onMoreOptions={() => console.log("More options")}
      />

      {/* ── Body ── */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          bgcolor: "#FFFFFF",
          overflow: "hidden",
          my: 1,
          mx: 2.5,
          borderRadius: "20px",
          border: "1px solid #EAE8F0",
          boxShadow: "0 2px 12px rgba(19,15,30,0.05)",
          justifyContent: "space-around",
        }}
      >
        {/* ── Left sidebar ── */}
        <Box sx={{ flexShrink: 0, px: 1.5, py: 2 }}>
          <TemplateSideMenu
            activeId={activeSection}
            onChange={setActiveSection}
          />
        </Box>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: "#EAE8F0" }}
        />

        {/* ── Centre: form area ── */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            py: 3,
            px: 3,
            maxWidth: 660,
          }}
        >
          <ActivePanel
            id={activeSection}
            form={form}
            onChange={(p) => setForm((prev) => ({ ...prev, ...p }))}
            leadCaptureForm={leadCaptureForm}
            onLeadCaptureChange={(p) =>
              setLeadCaptureForm((prev) => ({ ...prev, ...p }))
            }
            followUpEmailForm={followUpEmailForm}
            onFollowUpEmailChange={(p) =>
              setFollowUpEmailForm((prev) => ({ ...prev, ...p }))
            }
            qrCodeForm={qrCodeForm}
            onQRCodeChange={(p) => setQRCodeForm((prev) => ({ ...prev, ...p }))}
            settingsForm={settingsForm}
            onSettingsChange={(p) =>
              setSettingsForm((prev) => ({ ...prev, ...p }))
            }
          />

          {/* Shared footer — hidden for self-managed sections */}
          {!TEMPLATE_SELF_MANAGED_FOOTER.includes(activeSection) &&
            activeSection !== "settings" && (
              <FormFooter onCancel={handleCancel} onUpdate={handleUpdate} />
            )}
        </Box>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: "#EAE8F0" }}
        />

        {/* ── Right: live preview ── */}
        <Box
          sx={{
            width: rightPanelWidth,
            flexShrink: 0,
            px: 2.5,
            py: 2.5,
            bgcolor: "#FDFCFF",
            transition: "width 0.2s ease",
          }}
        >
          <RightPreviewPanel
            activeSection={activeSection}
            form={form}
            leadCaptureForm={leadCaptureForm}
            followUpEmailForm={followUpEmailForm}
            qrCodeForm={qrCodeForm}
            memberName={memberName}
            cardUrl={cardUrl}
          />
        </Box>
      </Box>
    </Box>
  );
}

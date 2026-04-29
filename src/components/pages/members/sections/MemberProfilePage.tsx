"use client";

import { useEffect, useMemo, useState } from "react";
import { Box, Divider } from "@mui/material";

import {
  ProfileTopBar,
  ProfileSideMenu,
  AboutFormSection,
  FormFooter,
  CardLivePreview,
  type MemberProfileFormData,
  type SideMenuItemId,
} from "@/components/features/memberProfile";
import { DEFAULT_FORM } from "@/components/pages/members/constants/memberProfile";
// import { useSearchParams } from "next/navigation";
import { initialMembers } from "@/lib/constants";
import { LinksSection } from "./LinksSection";
import {
  DEFAULT_LEAD_CAPTURE_FORM,
  LeadCaptureFormData,
  LeadCaptureSection,
} from "@/components/features/leadcapture";
import { FollowUpEmailSection } from "@/components/features/followupEmail";
import {
  DEFAULT_FOLLOW_UP_EMAIL_FORM,
  FollowUpEmailFormData,
} from "../constants/followupEmail";
import { EmailLivePreview } from "@/components/features/followupEmail/Emaillivepreview";
import { QRCodeSection } from "@/components/features/qrcodesection";
import {
  DEFAULT_QR_CODE_FORM,
  DEFAULT_VIRTUAL_BG_FORM,
  QRCodeFormData,
  VirtualBackgroundFormData,
} from "../constants/qrCode";
import { QRCodePreview } from "@/components/features/qrcodesection/Qrcodepreview";
import { VirtualBackgroundSection } from "@/components/features/virtualBackground";
import { VirtualBackgroundPreview } from "@/components/features/virtualBackground/Virtualbackgroundpreview";

// ─── Placeholder panels for non-About sections ────────────────────────────────
// Replace each with its own component when designed.

function PlaceholderPanel({ label }: { label: string }) {
  return (
    <Box sx={{ py: 6, textAlign: "center", color: "#A09EB8", fontSize: 14 }}>
      {label} — coming soon
    </Box>
  );
}

function ActivePanel({
  id,
  form,
  onChange,
  onLeadCaptureChange,
  leadCaptureForm,
  followUpEmailForm,
  onFollowUpEmailChange,
  qrCodeForm,
  onQRCodeChange,
  virtualBgForm,
  onVirtualBgChange,
}: {
  id: SideMenuItemId;
  form: MemberProfileFormData;
  onChange: (p: Partial<MemberProfileFormData>) => void;
  leadCaptureForm: LeadCaptureFormData;
  onLeadCaptureChange: (p: Partial<LeadCaptureFormData>) => void;
  followUpEmailForm: FollowUpEmailFormData;
  onFollowUpEmailChange: (p: Partial<FollowUpEmailFormData>) => void;
  qrCodeForm: QRCodeFormData;
  onQRCodeChange: (p: Partial<QRCodeFormData>) => void;
  virtualBgForm: VirtualBackgroundFormData;
  onVirtualBgChange: (p: Partial<VirtualBackgroundFormData>) => void;
}) {
  switch (id) {
    case "about":
      return <AboutFormSection form={form} onChange={onChange} />;
    case "links":
      return <LinksSection />;
    case "lead-capture-form":
      return (
        <LeadCaptureSection
          key={leadCaptureForm.header || "reset-key"}
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
    case "qr-code":
      return <QRCodeSection form={qrCodeForm} onChange={onQRCodeChange} />;
    case "virtual-background":
      return (
        <VirtualBackgroundSection
          form={virtualBgForm}
          onChange={onVirtualBgChange}
        />
      );
    case "email-signature":
      return <PlaceholderPanel label="Email Signature" />;
    case "accessories":
      return <PlaceholderPanel label="Accessories" />;
  }
}

// ─── Right panel: swaps between CardLivePreview and EmailLivePreview ──────────

function RightPreviewPanel({
  activeSection,
  form,
  leadCaptureForm,
  followUpEmailForm,
  qrCodeForm,
  virtualBgForm,
  memberName,
  cardUrl,
}: {
  activeSection: SideMenuItemId;
  form: MemberProfileFormData;
  leadCaptureForm: LeadCaptureFormData;
  followUpEmailForm: FollowUpEmailFormData;
  qrCodeForm: QRCodeFormData;
  virtualBgForm: VirtualBackgroundFormData;
  memberName: string;
  cardUrl: string;
}) {
  if (activeSection === "follow-up-email") {
    return (
      <EmailLivePreview form={followUpEmailForm} senderName={memberName} />
    );
  }

  // For lead-capture-form section pass the form so the overlay renders
  const previewLeadCapture =
    activeSection === "lead-capture-form" ? leadCaptureForm : undefined;

  if (activeSection === "qr-code") {
    return <QRCodePreview form={qrCodeForm} value={cardUrl} />;
  }

  if (activeSection === "virtual-background") {
    return (
      <VirtualBackgroundPreview
        form={virtualBgForm}
        memberName={form.name || memberName}
        jobTitle={form.jobTitle}
        company={form.company}
        location={form.location}
        onDownload={() => console.log("Download background")}
        onSaveToTeamAssets={() => console.log("Save to team assets")}
      />
    );
  }

  return <CardLivePreview form={form} leadCaptureForm={previewLeadCapture} />;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MemberProfilePage({ memberId }: { memberId: string }) {
  // const searchParams = useSearchParams();
  // const memberId = searchParams.get("id");

  const [activeSection, setActiveSection] = useState<SideMenuItemId>("about");
  const memberData = useMemo(
    () => initialMembers.find((m) => m.id === Number(memberId)),
    [memberId],
  );
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

  const [virtualBgForm, setVirtualBgForm] = useState<VirtualBackgroundFormData>(
    DEFAULT_VIRTUAL_BG_FORM,
  );

  const handleChange = (patch: Partial<MemberProfileFormData>) =>
    setForm((prev) => ({ ...prev, ...patch }));

  const handleLeadCaptureChange = (patch: Partial<LeadCaptureFormData>) =>
    setLeadCaptureForm((prev) => ({ ...prev, ...patch }));

  const handleFollowUpEmailChange = (patch: Partial<FollowUpEmailFormData>) =>
    setFollowUpEmailForm((prev) => ({ ...prev, ...patch }));

  const handleQRCodeChange = (p: Partial<QRCodeFormData>) =>
    setQRCodeForm((prev) => ({ ...prev, ...p }));

  const handleVBChange = (p: Partial<VirtualBackgroundFormData>) =>
    setVirtualBgForm((prev) => ({ ...prev, ...p }));

  const handleCancel = () => setForm(form);
  const handleUpdate = () => console.log("Updated:", form);
  const handleReset = () => setLeadCaptureForm(DEFAULT_LEAD_CAPTURE_FORM);

  const selfManagedFooter: SideMenuItemId[] = [
    "follow-up-email",
    "qr-code",
    "virtual-background",
  ];

  // Only pass leadCaptureForm to the preview when on the lead-capture-form section
  const previewLeadCapture =
    activeSection === "lead-capture-form" ? leadCaptureForm : undefined;
  const isResetVisible = activeSection === "lead-capture-form" ? true : false;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F3F2F6",
        fontFamily: 'Inter, "Segoe UI", sans-serif',
        display: "flex",
        flexDirection: "column",
      }}
      key={memberId}
    >
      {/* ── Top bar ── */}
      <ProfileTopBar
        memberName={form.name}
        memberEmail={form.email}
        memberAvatarUrl={
          form.profilePictureUrl ?? "https://i.pravatar.cc/150?img=11"
        }
        cardLabel="Default"
        initials="SD"
      />

      {/* ── Body ── */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          bgcolor: "#FFFFFF",
          overflow: "hidden",
          justifyContent: "space-around",
          my: 1,
          mx: 3,
          borderRadius: "30px",
        }}
      >
        {/* Left side menu */}
        <Box
          sx={{
            flexShrink: 0,
            px: 1.5,
            py: 2,
            // borderRight: "1px solid #EAE8F0",
          }}
        >
          <ProfileSideMenu
            activeId={activeSection}
            onChange={setActiveSection}
            lastLogin="Apr 13, 2026"
          />
        </Box>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: "#EAE8F0" }}
        />

        {/* Middle form area */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            // px: { xs: 2.5, md: 3.5 },
            py: 3,
            maxWidth: 660,
          }}
        >
          <ActivePanel
            id={activeSection}
            form={form}
            onChange={handleChange}
            leadCaptureForm={leadCaptureForm}
            onLeadCaptureChange={handleLeadCaptureChange}
            followUpEmailForm={followUpEmailForm}
            onFollowUpEmailChange={handleFollowUpEmailChange}
            qrCodeForm={qrCodeForm}
            onQRCodeChange={handleQRCodeChange}
            virtualBgForm={virtualBgForm}
            onVirtualBgChange={handleVBChange}
          />

          {!selfManagedFooter.includes(activeSection) && (
            <FormFooter
              onCancel={() => setForm(DEFAULT_FORM)}
              onUpdate={() => console.log("Updated:", form)}
              isResetVisible={isResetVisible}
              handleReset={handleReset}
            />
          )}
        </Box>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: "#EAE8F0" }}
        />

        {/* Right live preview */}
        <Box
          sx={{
            width: activeSection === "virtual-background" ? 400 : 260,
            flexShrink: 0,
            px: 2.5,
            py: 2.5,
            bgcolor: "#FDFCFF",
            // borderLeft: "1px solid #EAE8F0",
          }}
        >
          <RightPreviewPanel
            activeSection={activeSection}
            form={form}
            leadCaptureForm={leadCaptureForm}
            followUpEmailForm={followUpEmailForm}
            qrCodeForm={qrCodeForm}
            virtualBgForm={virtualBgForm}
            memberName={form.name || "Diago"}
            cardUrl={`https://weana.app/card/${form.name?.toLowerCase() ?? "user"}`}
          />
          {/* <CardLivePreview form={form} leadCaptureForm={previewLeadCapture} /> */}
        </Box>
      </Box>
    </Box>
  );
}

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
}: {
  id: SideMenuItemId;
  form: MemberProfileFormData;
  onChange: (p: Partial<MemberProfileFormData>) => void;
}) {
  switch (id) {
    case "about":
      return <AboutFormSection form={form} onChange={onChange} />;
    case "links":
      return <LinksSection />;
    case "lead-capture-form":
      return <PlaceholderPanel label="Lead Capture Form" />;
    case "follow-up-email":
      return <PlaceholderPanel label="Follow Up Email" />;
    case "qr-code":
      return <PlaceholderPanel label="QR Code" />;
    case "virtual-background":
      return <PlaceholderPanel label="Virtual Background" />;
    case "email-signature":
      return <PlaceholderPanel label="Email Signature" />;
    case "accessories":
      return <PlaceholderPanel label="Accessories" />;
  }
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

  const handleChange = (patch: Partial<MemberProfileFormData>) =>
    setForm((prev) => ({ ...prev, ...patch }));

  const handleCancel = () => setForm(DEFAULT_FORM);
  const handleUpdate = () => console.log("Updated:", form);

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
            px: { xs: 2.5, md: 3.5 },
            py: 3,
            maxWidth: 660,
          }}
        >
          <ActivePanel id={activeSection} form={form} onChange={handleChange} />
          <FormFooter onCancel={handleCancel} onUpdate={handleUpdate} />
        </Box>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: "#EAE8F0" }}
        />

        {/* Right live preview */}
        <Box
          sx={{
            width: 260,
            flexShrink: 0,
            px: 2.5,
            py: 2.5,
            bgcolor: "#FDFCFF",
            // borderLeft: "1px solid #EAE8F0",
          }}
        >
          <CardLivePreview form={form} />
        </Box>
      </Box>
    </Box>
  );
}

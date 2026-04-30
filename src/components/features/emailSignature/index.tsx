"use client";

import { useState } from "react";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { ImageUploadCircle } from "./ImageUploadCircle";
import { BannerUpload } from "./Bannerupload";
import { SignatureTextField } from "./Signaturetextfield";
import { PronounsButton } from "./Pronounsbutton";
import {
  DEFAULT_EMAIL_SIGNATURE_FORM,
  type EmailSignatureFormData,
} from "@/components/pages/businessAdminDashboard/members/constants/emailSignature";

const SAFE_DEFAULT: EmailSignatureFormData = DEFAULT_EMAIL_SIGNATURE_FORM;

interface EmailSignatureSectionProps {
  form?: EmailSignatureFormData;
  onChange?: (patch: Partial<EmailSignatureFormData>) => void;
}

export function EmailSignatureSection({
  form: externalForm,
  onChange,
}: EmailSignatureSectionProps) {
  const [form, setForm] = useState<EmailSignatureFormData>(
    () => externalForm ?? SAFE_DEFAULT,
  );

  const safeForm = form ?? SAFE_DEFAULT;

  const patch = (update: Partial<EmailSignatureFormData>) => {
    const next = { ...safeForm, ...update };
    setForm(next);
    onChange?.(update);
  };

  const handleImageUpload =
    (
      urlKey: keyof EmailSignatureFormData,
      fileKey: keyof EmailSignatureFormData,
    ) =>
    (file: File, url: string) => {
      patch({
        [urlKey]: url,
        [fileKey]: file,
      } as Partial<EmailSignatureFormData>);
    };

  return (
    <Box sx={{ px: 3, pb: 4 }}>
      {/* ── Title ── */}
      <Typography
        sx={{
          fontSize: 15,
          fontWeight: 700,
          color: "#1E1A28",
          mb: 2.5,
          letterSpacing: "-0.01em",
        }}
      >
        Email Signature
      </Typography>

      {/* ── Image uploaders row ── */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          mb: 3,
          flexWrap: "wrap",
        }}
      >
        <ImageUploadCircle
          label="Profile picture"
          tooltip="Your personal photo shown in the signature."
          imageUrl={safeForm.profilePictureUrl}
          onUpload={handleImageUpload(
            "profilePictureUrl",
            "profilePictureFile",
          )}
          shape="circle"
          size={80}
        />
        <ImageUploadCircle
          label="Company logo"
          tooltip="Your company's logo displayed prominently in the signature."
          imageUrl={safeForm.companyLogoUrl}
          onUpload={handleImageUpload("companyLogoUrl", "companyLogoFile")}
          shape="rounded"
          size={80}
        />
        <ImageUploadCircle
          label="QR Code logo"
          tooltip="Optional logo displayed in the center of your QR code."
          imageUrl={safeForm.qrCodeLogoUrl}
          onUpload={handleImageUpload("qrCodeLogoUrl", "qrCodeLogoFile")}
          shape="rounded"
          size={80}
        />
      </Box>

      {/* ── Banner ── */}
      <BannerUpload
        includeBanner={safeForm.includeBanner}
        bannerUrl={safeForm.bannerUrl}
        bannerLink={safeForm.bannerLink}
        onChange={patch}
        onBannerUpload={handleImageUpload("bannerUrl", "bannerFile")}
      />

      {/* ── Name + Pronouns ── */}
      <SignatureTextField
        label="Name"
        required
        placeholder="Diego"
        value={safeForm.name}
        onChange={(val) => patch({ name: val })}
        endAdornment={
          <PronounsButton
            value={safeForm.pronouns}
            onChange={(val) => patch({ pronouns: val })}
          />
        }
      />

      {/* ── Job Title ── */}
      <SignatureTextField
        label="Job Title"
        placeholder="Job Title"
        value={safeForm.jobTitle}
        onChange={(val) => patch({ jobTitle: val })}
      />

      {/* ── Company ── */}
      <SignatureTextField
        label="Company"
        placeholder="Company"
        value={safeForm.company}
        onChange={(val) => patch({ company: val })}
      />

      {/* ── Phone number ── */}
      <SignatureTextField
        label="Phone number"
        placeholder="Phone number"
        value={safeForm.phoneNumber}
        onChange={(val) => patch({ phoneNumber: val })}
      />

      {/* ── Location ── */}
      <SignatureTextField
        label="Location"
        placeholder="Location"
        value={safeForm.location}
        onChange={(val) => patch({ location: val })}
      />

      {/* ── Disclaimer ── */}
      <SignatureTextField
        label="Disclaimer"
        placeholder="Disclaimer"
        value={safeForm.disclaimer}
        onChange={(val) => patch({ disclaimer: val })}
        multiline
        rows={3}
      />

      {/* ── Include QR Code checkbox ── */}
      <FormControlLabel
        control={
          <Checkbox
            checked={safeForm.includeQRCode}
            onChange={(e) => patch({ includeQRCode: e.target.checked })}
            sx={{
              color: "#C4C0D8",
              "&.Mui-checked": { color: "#6B3FA0" },
              "& .MuiSvgIcon-root": { fontSize: 20, borderRadius: "4px" },
            }}
          />
        }
        label={
          <Typography
            sx={{ fontSize: 13.5, fontWeight: 600, color: "#1E1A28" }}
          >
            Include QR Code
          </Typography>
        }
        sx={{ m: 0, alignItems: "center" }}
      />
    </Box>
  );
}

"use client";

import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { ColorPicker } from "@/components/ui/common/ColorPicker";
import { CustomLogoUploader } from "./Customlogouploader";
import { QRCodeFooter } from "./Qrcodefooter";
import {
  DEFAULT_QR_CODE_FORM,
  QR_COLOR_OPTIONS,
  type QRCodeFormData,
} from "@/components/pages/businessAdminDashboard/members/constants/qrCode";

interface QRCodeSectionProps {
  form?: QRCodeFormData;
  onChange?: (patch: Partial<QRCodeFormData>) => void;
  onSave?: (form: QRCodeFormData) => void;
  onCreateEventBadge?: () => void;
  onAddToWallet?: () => void;
}

export function QRCodeSection({
  form: externalForm,
  onChange,
  onSave,
  onCreateEventBadge,
  onAddToWallet,
}: QRCodeSectionProps) {
  const [form, setForm] = useState<QRCodeFormData>(
    externalForm ?? DEFAULT_QR_CODE_FORM,
  );
  const [hasChanges, setHasChanges] = useState(false);

  const patch = (update: Partial<QRCodeFormData>) => {
    const next = { ...form, ...update };
    setForm(next);
    setHasChanges(true);
    onChange?.(update);
  };

  const handleCancel = () => {
    setForm(externalForm ?? DEFAULT_QR_CODE_FORM);
    setHasChanges(false);
  };

  const handleSave = () => {
    setHasChanges(false);
    onSave?.(form);
  };

  const actionBtnSx = {
    fontSize: 12.5,
    fontWeight: 600,
    textTransform: "none" as const,
    borderRadius: "999px",
    px: 2,
    py: 0.8,
    color: "#3D3A4A",
    borderColor: "#D8D4EC",
    bgcolor: "#FAFAFA",
    "&:hover": {
      borderColor: "#6B3FA0",
      color: "#6B3FA0",
      bgcolor: "#F3F0FB",
    },
  };

  return (
    <Box sx={{ px: 3, pb: 4 }}>
      {/* ── Title ── */}
      <Typography
        sx={{
          fontSize: 15,
          fontWeight: 700,
          color: "#1E1A28",
          mb: 2,
          letterSpacing: "-0.01em",
        }}
      >
        QR Code
      </Typography>

      {/* ── Action buttons ── */}
      <Box sx={{ display: "flex", gap: 1.2, mb: 3, flexWrap: "wrap" }}>
        <Button
          variant="outlined"
          startIcon={<AddRoundedIcon sx={{ fontSize: "15px !important" }} />}
          onClick={onCreateEventBadge}
          sx={actionBtnSx}
        >
          Create Event Badge
        </Button>

        <Button
          variant="outlined"
          startIcon={
            <AccountBalanceWalletOutlinedIcon
              sx={{ fontSize: "15px !important" }}
            />
          }
          onClick={onAddToWallet}
          sx={actionBtnSx}
        >
          Add to Wallet
        </Button>
      </Box>

      {/* ── Color picker ── */}
      <ColorPicker
        options={
          QR_COLOR_OPTIONS as unknown as { label: string; value: string }[]
        }
        value={form.color}
        onChange={(color) => patch({ color })}
      />

      {/* ── Custom logo ── */}
      <CustomLogoUploader
        logoUrl={form.logoUrl}
        onUpload={(file, url) => patch({ logoFile: file, logoUrl: url })}
        onRemove={() => patch({ logoFile: null, logoUrl: null })}
      />

      {/* ── Footer ── */}
      <QRCodeFooter
        onCancel={handleCancel}
        onSave={handleSave}
        hasChanges={hasChanges}
      />
    </Box>
  );
}

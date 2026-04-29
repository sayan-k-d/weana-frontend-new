"use client";

import { Box, Typography } from "@mui/material";
import { ContactCaptureModeToggle } from "./Contactcapturemodetoggle";
import { AdvancedOptions } from "./Advancedoptions";
import { AddFieldButton } from "./Addfieldbutton";
import { CustomFieldsList } from "./Customfieldslist";

export interface LeadCaptureFormData {
  contactCaptureMode: boolean;
  header: string;
  disclaimer: string;
  connectButtonText: string;
  customFields: CustomField[];
}

export interface CustomField {
  id: string;
  label: string;
  type: "text" | "email" | "phone" | "select";
  required: boolean;
  placeholder?: string;
}

export const DEFAULT_LEAD_CAPTURE_FORM: LeadCaptureFormData = {
  contactCaptureMode: false,
  header: "Share your info back with...",
  disclaimer: "Weana does not share or sell your data",
  connectButtonText: "Save Contact",
  customFields: [],
};

interface LeadCaptureSectionProps {
  form?: LeadCaptureFormData;
  onChange?: (patch: Partial<LeadCaptureFormData>) => void;
}

export function LeadCaptureSection({
  form = DEFAULT_LEAD_CAPTURE_FORM,
  onChange,
}: LeadCaptureSectionProps) {
  const handleChange = (patch: Partial<LeadCaptureFormData>) => {
    onChange?.(patch);
  };

  const handleAddField = (field: CustomField) => {
    const updated = [...form.customFields, field];
    handleChange({ customFields: updated });
  };

  const handleRemoveField = (id: string) => {
    const updated = form.customFields.filter((f) => f.id !== id);
    handleChange({ customFields: updated });
  };

  return (
    <Box sx={{ pb: 4 }}>
      {/* Section Title */}
      <Typography
        sx={{
          fontSize: 15,
          fontWeight: 700,
          color: "#1E1A28",
          mb: 2.5,
          letterSpacing: "-0.01em",
        }}
      >
        Lead Capture
      </Typography>

      {/* Contact Capture Mode Toggle */}
      <ContactCaptureModeToggle
        enabled={form.contactCaptureMode}
        onChange={(val) => handleChange({ contactCaptureMode: val })}
      />

      {/* Advanced Options (expandable) */}
      <AdvancedOptions
        header={form.header}
        disclaimer={form.disclaimer}
        connectButtonText={form.connectButtonText}
        onChange={handleChange}
      />

      {/* Add Field Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, mb: 1.5 }}>
        <AddFieldButton onAdd={handleAddField} />
      </Box>

      {/* Custom Fields List */}
      <CustomFieldsList
        fields={form.customFields}
        onRemove={handleRemoveField}
      />
    </Box>
  );
}

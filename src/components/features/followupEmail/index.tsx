"use client";

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { SectionToggle } from "./Sectiontoggle";
import { DelayPicker } from "./DelayPicker";
import { RecipientsField } from "./Recipientsfield";
import { SubjectField } from "./Subjectfield";
import { MessageField } from "./Messagefield";
import { AttachmentDropZone } from "./Attachmentdropzone";
import { FollowUpEmailFooter } from "./Followupemailfooter";
import {
  DEFAULT_FOLLOW_UP_EMAIL_FORM,
  type FollowUpEmailFormData,
} from "@/components/pages/members/constants/followupEmail";

interface FollowUpEmailSectionProps {
  form?: FollowUpEmailFormData;
  onChange?: (patch: Partial<FollowUpEmailFormData>) => void;
  onSave?: (form: FollowUpEmailFormData) => void;
  onSendTest?: (form: FollowUpEmailFormData) => void;
}

export function FollowUpEmailSection({
  form: externalForm,
  onChange,
  onSave,
  onSendTest,
}: FollowUpEmailSectionProps) {
  const [form, setForm] = useState<FollowUpEmailFormData>(
    externalForm ?? DEFAULT_FOLLOW_UP_EMAIL_FORM,
  );
  const [hasChanges, setHasChanges] = useState(false);

  const patch = (update: Partial<FollowUpEmailFormData>) => {
    const next = { ...form, ...update };
    setForm(next);
    setHasChanges(true);
    onChange?.(update);
  };

  const handleReset = () => {
    setForm(DEFAULT_FOLLOW_UP_EMAIL_FORM);
    setHasChanges(false);
  };

  const handleCancel = () => {
    setForm(externalForm ?? DEFAULT_FOLLOW_UP_EMAIL_FORM);
    setHasChanges(false);
  };

  const handleSave = () => {
    setHasChanges(false);
    onSave?.(form);
  };

  return (
    <Box sx={{ px: 3, pb: 3 }}>
      {/* ── Header ── */}
      <Typography
        sx={{
          fontSize: 15,
          fontWeight: 700,
          color: "#1E1A28",
          mb: 0.6,
          letterSpacing: "-0.01em",
        }}
      >
        Follow Up Email
      </Typography>

      {/* ── Enable toggle with description ── */}
      <SectionToggle
        label=""
        description="When Follow Up Email is enabled, an email intro will automatically be sent after connecting with a new lead. You can edit the email intro and the time it is sent below."
        enabled={form.enabled}
        onChange={(val) => patch({ enabled: val })}
      />

      {/* ── Delay ── */}
      <DelayPicker
        hours={form.delayHours}
        minutes={form.delayMinutes}
        onChange={(p) => patch(p)}
      />

      {/* ── To recipients ── */}
      <RecipientsField
        label="To :"
        recipients={form.toRecipients}
        onAdd={(email) =>
          patch({ toRecipients: [...form.toRecipients, email] })
        }
        onRemove={(email) =>
          patch({ toRecipients: form.toRecipients.filter((r) => r !== email) })
        }
      />

      {/* ── CC + BCC ── */}
      <RecipientsField
        label="Cc Recipients"
        recipients={form.ccRecipients}
        onAdd={(email) =>
          patch({ ccRecipients: [...form.ccRecipients, email] })
        }
        onRemove={(email) =>
          patch({ ccRecipients: form.ccRecipients.filter((r) => r !== email) })
        }
        placeholder="name@email.com"
        adornment={
          <Typography
            component="span"
            sx={{
              fontSize: 12,
              fontWeight: 600,
              color: "#6B3FA0",
              cursor: "pointer",
              "&:hover": { opacity: 0.75 },
            }}
          >
            add bcc
          </Typography>
        }
      />

      {/* ── Subject ── */}
      <SubjectField
        value={form.subject}
        onChange={(val) => patch({ subject: val })}
      />

      {/* ── Message ── */}
      <MessageField
        value={form.message}
        onChange={(val) => patch({ message: val })}
      />

      {/* ── Attachments ── */}
      <AttachmentDropZone
        files={form.attachments}
        onAdd={(files) =>
          patch({ attachments: [...form.attachments, ...files] })
        }
        onRemove={(name) =>
          patch({
            attachments: form.attachments.filter((f) => f.name !== name),
          })
        }
      />

      {/* ── Footer ── */}
      <Box sx={{ mt: 3 }}>
        <FollowUpEmailFooter
          onReset={handleReset}
          onSendTest={() => onSendTest?.(form)}
          onCancel={handleCancel}
          onSave={handleSave}
          hasChanges={hasChanges}
        />
      </Box>
    </Box>
  );
}

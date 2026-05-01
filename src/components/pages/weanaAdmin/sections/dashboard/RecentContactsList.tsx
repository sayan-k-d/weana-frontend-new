"use client";

import { Box, Typography } from "@mui/material";
import { AdminCard, AdminAvatar, SectionHeader } from "./Primitives";
import {
  ADMIN_COLORS,
  ADMIN_FONT,
} from "@/components/pages/weanaAdmin/constants/tokens";
import type { RecentContact } from "../../constants/dashboard";
import { RECENT_CONTACTS } from "../../constants/dashboard";

function ContactRow({ contact }: { contact: RecentContact }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.2,
        py: 1.1,
        borderBottom: `1px solid ${ADMIN_COLORS.cardBorder}`,
        "&:last-child": { borderBottom: "none" },
        cursor: "pointer",
        borderRadius: "8px",
        px: 0.5,
        transition: "background 0.12s",
        "&:hover": { bgcolor: ADMIN_COLORS.pageBg },
      }}
    >
      <AdminAvatar
        initials={contact.avatarInitials}
        color={contact.avatarColor}
        size={34}
      />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: ADMIN_FONT.sizes.sm,
            fontWeight: ADMIN_FONT.weights.semibold,
            color: ADMIN_COLORS.textPrimary,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {contact.name}
        </Typography>
        <Typography
          sx={{ fontSize: ADMIN_FONT.sizes.xs, color: ADMIN_COLORS.textMuted }}
        >
          {contact.subtitle}
        </Typography>
      </Box>
      <Typography
        sx={{
          fontSize: ADMIN_FONT.sizes.xs,
          color: ADMIN_COLORS.textMuted,
          flexShrink: 0,
        }}
      >
        {contact.date}
      </Typography>
    </Box>
  );
}

interface RecentContactsListProps {
  contacts?: RecentContact[];
  onViewAll?: () => void;
  /**
   * When provided, the contacts list scrolls within this pixel height.
   * The card itself stays compact — no unbounded growth.
   */
  maxHeight?: number;
}

export function RecentContactsList({
  contacts = RECENT_CONTACTS,
  onViewAll,
  maxHeight,
}: RecentContactsListProps) {
  return (
    <AdminCard sx={{ p: 2.5, display: "flex", flexDirection: "column" }}>
      <SectionHeader title="Recent Contacts Captured" onViewAll={onViewAll} />

      {/* Scrollable list area */}
      <Box
        sx={{
          overflowY: "auto",
          // When maxHeight is set the list scrolls; otherwise it grows naturally
          ...(maxHeight ? { maxHeight } : {}),
          // Thin custom scrollbar
          "&::-webkit-scrollbar": { width: 5 },
          "&::-webkit-scrollbar-track": { bgcolor: "transparent" },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: ADMIN_COLORS.cardBorder,
            borderRadius: "3px",
            "&:hover": { bgcolor: ADMIN_COLORS.brandBorder },
          },
        }}
      >
        {contacts.map((c) => (
          <ContactRow key={c.id} contact={c} />
        ))}
      </Box>
    </AdminCard>
  );
}

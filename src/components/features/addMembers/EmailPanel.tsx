"use client";

import { useState } from "react";
import { Box, Checkbox, Stack, Tooltip, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { PurpleButton } from "./PanelButtons";

export function EmailPanel() {
  const [emails, setEmails] = useState("");
  const [sendInvites, setSendInvites] = useState(true);

  return (
    <Box sx={{ px: { xs: 3, md: 4 }, py: 3.5 }}>
      {/* Title */}
      <Typography
        sx={{
          fontSize: 18,
          fontWeight: 700,
          color: "#1E1A28",
          letterSpacing: "-0.02em",
          mb: 0.8,
        }}
      >
        Invite Team Members
      </Typography>

      {/* Description */}
      <Typography
        sx={{
          fontSize: 12.5,
          color: "#9A98A7",
          lineHeight: 1.6,
          mb: 2.5,
          maxWidth: 440,
        }}
      >
        Add members to your team via email. If a Weana user with that email
        already exists, the member will be pending until the user accepts the
        email invite.
      </Typography>

      {/* Textarea */}
      <Box
        component="textarea"
        value={emails}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setEmails(e.target.value)
        }
        placeholder="Enter emails separated by commas"
        sx={{
          display: "block",
          width: "100%",
          maxWidth: 420,
          height: 90,
          resize: "none",
          border: "1.5px solid #E5E3EF",
          borderRadius: "10px",
          bgcolor: "#FAFAFA",
          px: 1.8,
          py: 1.4,
          fontSize: 13,
          color: "#2D2840",
          fontFamily: 'Inter, "Segoe UI", sans-serif',
          outline: "none",
          transition: "border-color 0.15s",
          "&::placeholder": { color: "#BBBAC5" },
          "&:focus": { borderColor: "#6B3FA0", bgcolor: "#FFFFFF" },
        }}
      />

      {/* Footer */}
      <Stack
        direction="row"
        sx={{
          mt: 2.2,
          maxWidth: 420,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack direction="row" spacing={0.8} sx={{ alignItems: "center" }}>
          <Checkbox
            checked={sendInvites}
            onChange={(e) => setSendInvites(e.target.checked)}
            size="small"
            sx={{
              p: 0,
              color: "#C9C6DB",
              "&.Mui-checked": { color: "#6B3FA0" },
            }}
          />
          <Typography sx={{ fontSize: 13, color: "#2D2840", fontWeight: 500 }}>
            Send email invites
          </Typography>
          <Tooltip
            title="Recipients will receive an email invitation to join your team"
            placement="top"
            arrow
          >
            <InfoOutlinedIcon
              sx={{
                fontSize: 15,
                color: "#BBBAC5",
                cursor: "pointer",
                "&:hover": { color: "#6B3FA0" },
              }}
            />
          </Tooltip>
        </Stack>

        <PurpleButton label="Add Teammates" />
      </Stack>
    </Box>
  );
}

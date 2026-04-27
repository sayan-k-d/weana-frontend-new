"use client";

import { useState } from "react";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { PurpleButton } from "./PanelButtons";

export function CompanyPanel() {
  const [pages, setPages] = useState("");

  return (
    <Box sx={{ px: { xs: 3, md: 4 }, py: 3.5 }}>
      {/* Title */}
      <Typography
        sx={{
          fontSize: 18,
          fontWeight: 700,
          color: "#1E1A28",
          letterSpacing: "-0.02em",
          mb: 1.2,
        }}
      >
        Add Company Pages
      </Typography>

      {/* Description — two paragraphs matching the screenshot exactly */}
      <Typography
        sx={{ fontSize: 12.5, fontWeight:600, color: "#9A98A7", lineHeight: 1.7, mb: 1 }}
      >
        Create company pages if you want to share information that is NOT
        associated with a team member.
      </Typography>
      <Typography
        sx={{
          fontSize: 12.5,
          color: "#9A98A7",
          lineHeight: 1.7,
          mb: 3,
          maxWidth: 500,
        }}
      >
        For example, if you want to share information about your company from
        your conference booth, you could use a company page to do this. Any team
        member that is sharing a profile with information about themselves
        should be added via email invite, csv upload or AD sync.
      </Typography>

      {/* Input + Button row */}
      <Stack
        direction="row"
        spacing={1.5}
        sx={{ maxWidth: 520, alignItems: "center" }}
      >
        <TextField
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          placeholder="Number of pages"
          size="small"
          sx={{
            flex: 1,
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              bgcolor: "#FAFAFA",
              fontSize: 13.5,
              "& fieldset": { borderColor: "#E5E3EF" },
              "&:hover fieldset": { borderColor: "#C5BFDF" },
              "&.Mui-focused fieldset": { borderColor: "#6B3FA0" },
            },
            "& input::placeholder": { color: "#BBBAC5", opacity: 1 },
          }}
        />
        <PurpleButton label="Add Teammates" />
      </Stack>
    </Box>
  );
}

"use client";

import { useState } from "react";
import { Box, Button, Popover, OutlinedInput, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

interface PronounsButtonProps {
  value: string;
  onChange: (val: string) => void;
}

export function PronounsButton({ value, onChange }: PronounsButtonProps) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [draft, setDraft] = useState(value);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
    setDraft(value);
    setAnchor(e.currentTarget);
  };

  const handleSave = () => {
    onChange(draft);
    setAnchor(null);
  };

  return (
    <>
      <Button
        size="small"
        startIcon={<AddRoundedIcon sx={{ fontSize: "13px !important" }} />}
        onClick={handleOpen}
        sx={{
          fontSize: 12,
          fontWeight: 600,
          color: value ? "#6B3FA0" : "#5C5874",
          textTransform: "none",
          borderRadius: "999px",
          border: "1.5px solid #D8D4EC",
          px: 1.6,
          py: 0.5,
          bgcolor: "#FAFAFA",
          whiteSpace: "nowrap",
          flexShrink: 0,
          "&:hover": {
            borderColor: "#6B3FA0",
            color: "#6B3FA0",
            bgcolor: "#F3F0FB",
          },
        }}
      >
        {value || "Pronouns"}
      </Button>

      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              mt: 0.5,
              p: 1.5,
              borderRadius: "12px",
              border: "1px solid #EAE8F0",
              boxShadow: "0 8px 24px rgba(19,15,30,0.10)",
              minWidth: 200,
            },
          },
        }}
      >
        <Typography
          sx={{ fontSize: 12, fontWeight: 600, color: "#5C5874", mb: 0.8 }}
        >
          Pronouns
        </Typography>
        <OutlinedInput
          fullWidth
          size="small"
          placeholder="e.g. they/them"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          autoFocus
          sx={{
            borderRadius: "8px",
            fontSize: 13,
            bgcolor: "#F7F6FA",
            mb: 1,
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E8E6F0" },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#6B3FA0",
              borderWidth: 1.5,
            },
          }}
        />
        <Button
          fullWidth
          variant="contained"
          disableElevation
          onClick={handleSave}
          sx={{
            fontSize: 12,
            fontWeight: 600,
            textTransform: "none",
            borderRadius: "8px",
            bgcolor: "#6B3FA0",
            "&:hover": { bgcolor: "#5A3490" },
          }}
        >
          Save
        </Button>
      </Popover>
    </>
  );
}

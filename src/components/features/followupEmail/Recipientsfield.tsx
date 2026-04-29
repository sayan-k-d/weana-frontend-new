"use client";

import { useState, KeyboardEvent } from "react";
import { Box, Chip, OutlinedInput, Typography, Stack } from "@mui/material";

interface RecipientsFieldProps {
  label: string;
  recipients: string[];
  onAdd: (email: string) => void;
  onRemove: (email: string) => void;
  placeholder?: string;
  adornment?: React.ReactNode; // e.g. "add bcc" link
}

export function RecipientsField({
  label,
  recipients,
  onAdd,
  onRemove,
  placeholder = "name@email.com",
  adornment,
}: RecipientsFieldProps) {
  const [inputVal, setInputVal] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && inputVal.trim()) {
      e.preventDefault();
      onAdd(inputVal.trim().replace(/,$/, ""));
      setInputVal("");
    }
  };

  return (
    <Box sx={{ mb: 2.5 }}>
      {/* Label row */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.8 }}>
        <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#5C5874" }}>
          {label}
        </Typography>
        {adornment}
      </Box>

      {/* Chip container */}
      <Box
        sx={{
          minHeight: 48,
          border: "1px solid #E8E6F0",
          borderRadius: "10px",
          bgcolor: "#F7F6FA",
          px: 1.5,
          py: 1,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 0.8,
          cursor: "text",
          transition: "border-color 0.15s",
          "&:focus-within": { borderColor: "#6B3FA0" },
        }}
      >
        {recipients.map((r) => (
          <Chip
            key={r}
            label={r}
            size="small"
            onDelete={() => onRemove(r)}
            sx={{
              height: 26,
              fontSize: 12,
              fontWeight: 500,
              bgcolor: "#EDE9F8",
              color: "#3D3A4A",
              border: "none",
              "& .MuiChip-deleteIcon": {
                color: "#9896A6",
                fontSize: 14,
                "&:hover": { color: "#6B3FA0" },
              },
            }}
          />
        ))}
        {/* Invisible inline input */}
        <Box
          component="input"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={recipients.length === 0 ? placeholder : ""}
          sx={{
            border: "none",
            outline: "none",
            bgcolor: "transparent",
            fontSize: 12.5,
            color: "#3D3A4A",
            flex: 1,
            minWidth: 120,
            "::placeholder": { color: "#B0AEC4" },
          }}
        />
      </Box>
    </Box>
  );
}

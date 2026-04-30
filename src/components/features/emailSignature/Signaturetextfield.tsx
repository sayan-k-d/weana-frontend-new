"use client";

import { Box, OutlinedInput, Typography } from "@mui/material";

interface SignatureTextFieldProps {
  label: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  multiline?: boolean;
  rows?: number;
  endAdornment?: React.ReactNode;
}

const inputSx = {
  borderRadius: "10px",
  fontSize: 13,
  bgcolor: "#F7F6FA",
  width: "100%",
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E8E6F0" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#C4C0D8" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#6B3FA0",
    borderWidth: 1.5,
  },
  "& .MuiOutlinedInput-input": { py: 1.4, px: 1.8, color: "#3D3A4A" },
};

export function SignatureTextField({
  label,
  required,
  placeholder,
  value,
  onChange,
  multiline,
  rows = 3,
  endAdornment,
}: SignatureTextFieldProps) {
  return (
    <Box sx={{ mb: 2.5 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.3, mb: 0.8 }}>
        <Typography sx={{ fontSize: 13.5, fontWeight: 600, color: "#1E1A28" }}>
          {label}
        </Typography>
        {required && (
          <Typography sx={{ fontSize: 13, color: "#E05858" }}>*</Typography>
        )}
      </Box>

      <OutlinedInput
        fullWidth
        multiline={multiline}
        rows={multiline ? rows : undefined}
        placeholder={placeholder ?? label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        endAdornment={endAdornment}
        sx={{
          ...inputSx,
          ...(multiline && {
            "& .MuiOutlinedInput-input": {
              py: 1.2,
              px: 1.8,
              color: "#3D3A4A",
              resize: "none",
            },
            alignItems: "flex-start",
          }),
        }}
      />
    </Box>
  );
}

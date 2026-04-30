"use client";

import { Box, Button } from "@mui/material";

interface QRCodeFooterProps {
  onCancel: () => void;
  onSave: () => void;
  hasChanges?: boolean;
}

export function QRCodeFooter({
  onCancel,
  onSave,
  hasChanges = false,
}: QRCodeFooterProps) {
  const btnSx = {
    fontSize: 13,
    fontWeight: 600,
    textTransform: "none" as const,
    borderRadius: "999px",
    px: 2.8,
    py: 1,
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1.5, mt: 1 }}>
      <Button
        variant="outlined"
        onClick={onCancel}
        sx={{
          ...btnSx,
          color: "#9896A6",
          borderColor: "#E8E6F0",
          bgcolor: "#F7F6FA",
          "&:hover": { borderColor: "#C4C0D8", bgcolor: "#F0EEF8" },
        }}
      >
        Cancel
      </Button>

      <Button
        variant="contained"
        disableElevation
        onClick={onSave}
        disabled={!hasChanges}
        sx={{
          ...btnSx,
          bgcolor: hasChanges ? "#6B3FA0" : "#EAE8F0",
          color: hasChanges ? "#fff" : "#B0AEC4",
          "&:hover": { bgcolor: hasChanges ? "#5A3490" : "#EAE8F0" },
          "&.Mui-disabled": { bgcolor: "#EAE8F0", color: "#B0AEC4" },
        }}
      >
        Save QR Code
      </Button>
    </Box>
  );
}

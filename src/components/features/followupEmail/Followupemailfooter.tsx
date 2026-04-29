"use client";

import { Box, Button, Divider } from "@mui/material";

interface FollowUpEmailFooterProps {
  onReset: () => void;
  onSendTest: () => void;
  onCancel: () => void;
  onSave: () => void;
  hasChanges?: boolean;
}

export function FollowUpEmailFooter({
  onReset,
  onSendTest,
  onCancel,
  onSave,
  hasChanges = false,
}: FollowUpEmailFooterProps) {
  const ghostBtnSx = {
    fontSize: 13,
    fontWeight: 600,
    textTransform: "none" as const,
    borderRadius: "10px",
    px: 2,
    py: 0.9,
  };

  return (
    <Box>
      <Divider sx={{ borderColor: "#EAE8F0", mb: 2 }} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1.5,
          flexWrap: "wrap",
        }}
      >
        {/* Left: Reset + Send Test */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            onClick={onReset}
            sx={{
              ...ghostBtnSx,
              color: "#5C5874",
              borderColor: "#D8D4EC",
              "&:hover": {
                borderColor: "#6B3FA0",
                color: "#6B3FA0",
                bgcolor: "transparent",
              },
            }}
          >
            Reset to default
          </Button>
          <Button
            variant="outlined"
            onClick={onSendTest}
            sx={{
              ...ghostBtnSx,
              color: "#5C5874",
              borderColor: "#D8D4EC",
              "&:hover": {
                borderColor: "#6B3FA0",
                color: "#6B3FA0",
                bgcolor: "transparent",
              },
            }}
          >
            Send Test Email
          </Button>
        </Box>

        {/* Right: Cancel + Save */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            onClick={onCancel}
            sx={{
              ...ghostBtnSx,
              color: "#9896A6",
              borderColor: "#E8E6F0",
              "&:hover": { borderColor: "#C4C0D8", bgcolor: "transparent" },
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
              ...ghostBtnSx,
              bgcolor: hasChanges ? "#6B3FA0" : "#EAE8F0",
              color: hasChanges ? "#fff" : "#B0AEC4",
              "&:hover": { bgcolor: hasChanges ? "#5A3490" : "#EAE8F0" },
              "&.Mui-disabled": { bgcolor: "#EAE8F0", color: "#B0AEC4" },
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

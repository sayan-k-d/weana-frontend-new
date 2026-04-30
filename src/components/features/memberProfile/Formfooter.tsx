import { SideMenuItemId } from "@/types";
import { Box, Button, Stack } from "@mui/material";
import { useState } from "react";

interface FormFooterProps {
  onCancel?: () => void;
  onUpdate?: () => void;
  handleReset?: () => void;
  isResetVisible?: boolean;
  isLoading?: boolean;
}

export function FormFooter({
  onCancel,
  onUpdate,
  handleReset,
  isResetVisible,
  isLoading,
}: FormFooterProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isResetVisible ? "space-between" : "flex-end",
        pt: 2,
        pb: 1,
      }}
    >
      {isResetVisible && (
        <Box>
          <Button
            onClick={handleReset}
            disableElevation
            sx={{
              // bgcolor: "#EDEAF5",
              color: "#000000",
              borderRadius: "999px",
              px: 3.5,
              py: 0.9,
              fontSize: 13.5,
              fontWeight: 600,
              textTransform: "none",
              border: "1px solid #6B6880",
              "&:hover": { bgcolor: "#E2DDF0" },
            }}
          >
            Reset to Default
          </Button>
        </Box>
      )}

      <Stack direction="row" spacing={1.5}>
        <Button
          onClick={onCancel}
          disableElevation
          sx={{
            bgcolor: "#EDEAF5",
            color: "#6B6880",
            borderRadius: "999px",
            px: 3.5,
            py: 0.9,
            fontSize: 13.5,
            fontWeight: 600,
            textTransform: "none",
            "&:hover": { bgcolor: "#E2DDF0" },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onUpdate}
          disabled={isLoading}
          disableElevation
          sx={{
            bgcolor: "#EDEAF5",
            color: "#6B6880",
            borderRadius: "999px",
            px: 3.5,
            py: 0.9,
            fontSize: 13.5,
            fontWeight: 600,
            textTransform: "none",
            "&:hover": { bgcolor: "#6B3FA0", color: "#fff" },
            transition: "all 0.18s",
          }}
        >
          Update
        </Button>
      </Stack>
    </Box>
  );
}

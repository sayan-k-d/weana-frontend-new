import { Box, Button, Stack } from "@mui/material";

interface FormFooterProps {
  onCancel?: () => void;
  onUpdate?: () => void;
  isLoading?: boolean;
}

export function FormFooter({ onCancel, onUpdate, isLoading }: FormFooterProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        pt: 2,
        pb: 1,
      }}
    >
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
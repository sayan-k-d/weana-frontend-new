import { Button } from "@mui/material";

interface PurpleButtonProps {
  label: string;
  onClick?: () => void;
  fullWidth?: boolean;
}

export function PurpleButton({ label, onClick, fullWidth }: PurpleButtonProps) {
  return (
    <Button
      variant="contained"
      disableElevation
      fullWidth={fullWidth}
      onClick={onClick}
      sx={{
        bgcolor: "#5B2D9E",
        color: "#fff",
        borderRadius: "999px",
        px: 3,
        py: 0.95,
        fontSize: 13.5,
        fontWeight: 600,
        letterSpacing: "-0.01em",
        textTransform: "none",
        whiteSpace: "nowrap",
        "&:hover": { bgcolor: "#4A2282" },
        transition: "background 0.15s",
      }}
    >
      {label}
    </Button>
  );
}

interface OutlineButtonProps {
  label: string;
  onClick?: () => void;
}

export function OutlineButton({ label, onClick }: OutlineButtonProps) {
  return (
    <Button
      variant="outlined"
      disableElevation
      onClick={onClick}
      sx={{
        borderColor: "#D6D3E3",
        color: "#2D2840",
        borderRadius: "999px",
        px: 2.8,
        py: 0.85,
        fontSize: 13.5,
        fontWeight: 600,
        letterSpacing: "-0.01em",
        textTransform: "none",
        "&:hover": { borderColor: "#5B2D9E", bgcolor: "#F5F2FC" },
        transition: "all 0.15s",
      }}
    >
      {label}
    </Button>
  );
}
import { Typography } from "@mui/material";

interface SectionLabelProps {
  label: string;
}

export function SectionLabel({ label }: SectionLabelProps) {
  return (
    <Typography
      sx={{
        fontSize: 9.5,
        fontWeight: 700,
        color: "#9896A6",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        px: 1.2,
        pt: 1.6,
        pb: 0.4,
      }}
    >
      {label}
    </Typography>
  );
}

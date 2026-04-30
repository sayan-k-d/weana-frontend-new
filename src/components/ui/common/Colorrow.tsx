import { Stack, Typography } from "@mui/material";
import { ColorSwatch } from "./ColorSwatch";
import { THEME_COLORS } from "@/components/pages/members/constants/memberProfile";

interface ColorRowProps {
  label: string;
  selected: string;
  onSelect: (value: string) => void;
}

export function ColorRow({ label, selected, onSelect }: ColorRowProps) {
  return (
    <Stack
      direction="row"
      spacing={1.2}
      sx={{ py: 1, alignItems: "center", justifyContent: "space-between" }}
    >
      <Typography
        sx={{ fontSize: 12.5, color: "#3D3A4A", fontWeight: 500, minWidth: 80 }}
      >
        {label}
      </Typography>
      {THEME_COLORS.map((c) => (
        <ColorSwatch
          key={c.value}
          color={c.value}
          label={c.label}
          selected={selected === c.value}
          onSelect={() => onSelect(c.value)}
        />
      ))}
    </Stack>
  );
}

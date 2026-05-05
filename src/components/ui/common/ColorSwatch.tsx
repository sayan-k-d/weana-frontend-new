import { Box, Tooltip } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";

interface ColorSwatchProps {
  color: string; // hex or "none"
  label: string;
  selected: boolean;
  onSelect: () => void;
  size?: number;
}

export function ColorSwatch({
  color,
  label,
  selected,
  onSelect,
  size = 24,
}: ColorSwatchProps) {
  const isNone = color === "none";

  return (
    <Tooltip title={label} placement="top" arrow>
      <Box
        onClick={onSelect}
        sx={{
          width: size,
          height: size,
          borderRadius: "50%",
          bgcolor: isNone ? "#FFFFFF" : color,
          border: selected
            ? `2.5px solid ${isNone ? "#6B3FA0" : color}`
            : `1.5px solid ${isNone ? "#D0CDE0" : color}`,
          boxShadow: selected ? `0 0 0 2px rgba(107,63,160,0.25)` : "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.15s",
          flexShrink: 0,
          "&:hover": { opacity: 0.85, transform: "scale(1.1)" },
        }}
      >
        {isNone && (
          <BlockRoundedIcon sx={{ fontSize: size * 0.55, color: "#C0BDD0" }} />
        )}
        {selected && !isNone && (
          <CheckRoundedIcon sx={{ fontSize: size * 0.55, color: "#fff" }} />
        )}
      </Box>
    </Tooltip>
  );
}

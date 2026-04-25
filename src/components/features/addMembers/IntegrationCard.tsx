import { Box, Stack, Typography } from "@mui/material";
import { OutlineButton, PurpleButton } from "./PanelButtons";

interface IntegrationCardProps {
  icon: React.ReactNode;
  name: string;
  description: string;
  primaryLabel: string;
  onPrimary?: () => void;
  onConfigure?: () => void;
}

export function IntegrationCard({
  icon,
  name,
  description,
  primaryLabel,
  onPrimary,
  onConfigure,
}: IntegrationCardProps) {
  return (
    <Box
      sx={{
        border: "1px solid #E7E5F0",
        borderRadius: "16px",
        bgcolor: "#FFFFFF",
        p: 3.5,
        maxWidth: 320,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        boxShadow: "0 1px 4px rgba(23,19,33,0.06)",
      }}
    >
      {/* Icon container — rounded grey square */}
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: "14px",
          bgcolor: "#F3F2F6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
        }}
      >
        {icon}
      </Box>

      {/* Name */}
      <Typography
        sx={{
          fontSize: 17,
          fontWeight: 700,
          color: "#1E1A28",
          letterSpacing: "-0.02em",
          mb: 1,
        }}
      >
        {name}
      </Typography>

      {/* Description */}
      <Typography
        sx={{
          fontSize: 12.5,
          color: "#9A98A7",
          lineHeight: 1.6,
          mb: 2.5,
          maxWidth: 240,
        }}
      >
        {description}
      </Typography>

      {/* Action buttons */}
      <Stack direction="row" spacing={1.2}>
        <OutlineButton label="Configure" onClick={onConfigure} />
        <PurpleButton label={primaryLabel} onClick={onPrimary} />
      </Stack>
    </Box>
  );
}

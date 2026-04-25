import { Stack, Switch, Typography } from "@mui/material";
import { purple } from "../../constants/addContent";

export default function InfoToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        height: 54,
        border: "1px solid #DEDBE5",
        borderRadius: 1.6,
        bgcolor: "#FFFFFF",
      }}
    >
      <Typography sx={{ fontSize: 14, color: "#2E253C", fontWeight: 500 }}>
        {label}
      </Typography>
      <Switch
        checked={checked}
        onChange={(_, v) => onChange(v)}
        sx={{
          "& .MuiSwitch-switchBase.Mui-checked": { color: purple },
          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
            bgcolor: `${purple} !important`,
          },
        }}
      />
    </Stack>
  );
}

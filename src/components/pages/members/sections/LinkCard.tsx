import {
  Box,
  Stack,
  Typography,
  Switch,
  Button,
  IconButton,
  Grid,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

// --- Sub-Component: Recommended Link Card ---
interface LinkCardProps {
  title: string;
  icon: string; // URL or Emoji/Icon component
  onAdd?: () => void;
}

export function LinkCard({ title, icon, onAdd }: LinkCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 1.5,
        bgcolor: "#F7F7F9",
        borderRadius: "12px",
        cursor: "pointer",
        transition: "0.2s",
        "&:hover": { bgcolor: "#F0F0F3" },
      }}
    >
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <Box
          component="img"
          src={icon}
          sx={{
            width: 40,
            height: 40,
            borderRadius: "10px",
            objectFit: "contain",
          }}
        />
        <Typography sx={{ fontSize: 15, fontWeight: 600, color: "#1E1A28" }}>
          {title}
        </Typography>
      </Stack>
      <IconButton onClick={onAdd} sx={{ color: "#C8C6D4" }}>
        <AddCircleOutlineRoundedIcon />
      </IconButton>
    </Paper>
  );
}

// --- Sub-Component: Toolbar Logic ---
export function LinkToolbar() {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ mb: 4, alignItems: "center", justifyContent: "space-between" }}
    >
      <Stack
        direction="row"
        divider={
          <Box sx={{ width: "1px", height: 24, bgcolor: "#EAE8F0", mx: 1 }} />
        }
        sx={{
          border: "1px solid #EAE8F0",
          borderRadius: "100px",
          px: 2,
          py: 0.5,
          bgcolor: "#FFFFFF",
          alignItems: "center",
        }}
      >
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Typography sx={{ fontSize: 13, color: "#6B6880" }}>
            Contact Capture
          </Typography>
          <Switch size="small" />
        </Stack>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Typography sx={{ fontSize: 13, color: "#6B6880" }}>
            Single Link
          </Typography>
          <Switch size="small" />
        </Stack>
        <IconButton size="small" sx={{ color: "#B0AEC0" }}>
          <GridViewRoundedIcon fontSize="small" />
        </IconButton>
      </Stack>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{
          bgcolor: "#6B3FA0",
          borderRadius: "100px",
          textTransform: "none",
          px: 3,
          py: 1.2,
          fontSize: 14,
          fontWeight: 600,
          "&:hover": { bgcolor: "#563285" },
        }}
      >
        Add Links and Contact Info
      </Button>
    </Stack>
  );
}

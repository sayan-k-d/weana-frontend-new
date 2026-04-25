import { SwapVerticalCircleOutlined } from "@mui/icons-material";
import { Box, Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";
import FilterListIcon from "@mui/icons-material/FilterList";
import { ViewMode } from "@/types";
import { useRouter } from "next/navigation";

export default function PageActions({
  view,
  onViewChange,
  routePath,
  buttonText,
  setOpen,
}: {
  view: string;
  onViewChange: (
    _: React.MouseEvent<HTMLElement>,
    newView: ViewMode | null,
  ) => void;
  routePath?: string;
  buttonText: string;
  setOpen?: (isOpen: boolean) => void;
}) {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        flexWrap: "wrap",
      }}
    >
      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={onViewChange}
        size="small"
        sx={{
          background: "#E2E8F0",
          borderRadius: "999px",
          padding: "3px",
          display: "inline-flex",
          gap: "2px",

          "& .MuiToggleButtonGroup-grouped": {
            border: "none",
            borderRadius: "999px !important",
            px: 1.5,
            py: 0.5,
            fontSize: 13,
            fontWeight: 500,
            color: "#1E1E1E",
            textTransform: "none",
            gap: "4px",

            "&.Mui-selected": {
              background: "#FFFFFF",
              color: "#1A1A2E",
              boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
              fontWeight: 600,
            },

            "&:hover": {
              background: "#E5E7EB",
            },
          },
        }}
      >
        <ToggleButton value="list">
          <ViewListIcon sx={{ fontSize: 16 }} />
          List
        </ToggleButton>

        <ToggleButton value="grid">
          <GridViewIcon sx={{ fontSize: 16 }} />
          Grid
        </ToggleButton>
      </ToggleButtonGroup>

      <Button
        variant="outlined"
        startIcon={<FilterListIcon sx={{ fontSize: 16 }} />}
        size="small"
        sx={{
          border: "2px solid #E2E8F0",
          color: "#374151",
          fontSize: 13,
          borderRadius: 50,
          "&:hover": {
            background: "#F9FAFB",
            borderColor: "#D1D5DB",
          },
        }}
      >
        Filter
      </Button>

      <Button
        variant="outlined"
        startIcon={<SwapVerticalCircleOutlined sx={{ fontSize: 16 }} />}
        size="small"
        sx={{
          border: "2px solid #E2E8F0",
          color: "#374151",
          fontSize: 13,
          borderRadius: 50,
          "&:hover": {
            background: "#F9FAFB",
            borderColor: "#D1D5DB",
          },
        }}
      >
        Sort
      </Button>
      <Button
        variant="contained"
        endIcon={<ChevronRightRoundedIcon />}
        onClick={() => (routePath ? router.push(routePath) : setOpen?.(true))}
        sx={{
          textTransform: "none",
          bgcolor: "#6750A4",
          borderRadius: 50,
          px: 3.8,
          py: 0.75,
          fontSize: 13,
          fontWeight: 600,
          boxShadow: "none",
          ml: 0.5,
        }}
      >
        {buttonText}
      </Button>
    </Box>
  );
}

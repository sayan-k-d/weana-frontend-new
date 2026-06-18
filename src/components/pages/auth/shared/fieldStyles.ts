import type { SxProps, Theme } from "@mui/material/styles";

export const authFieldSx: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#F7F0FF",
    borderRadius: "10px",
    fontSize: 14,
    "& fieldset": {
      borderColor: "#E1D2F0",
    },
    "&:hover fieldset": {
      borderColor: "#C9B6E0",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#7B49B1",
      borderWidth: 1,
    },
    "& input": {
      padding: "12px 14px",
      color: "#333333",
    },
    "& input::placeholder": {
      color: "#AAA9A9",
      opacity: 1,
    },
  },
};

export const authLabelSx = {
  color: "#333333",
  fontSize: 13,
  fontWeight: 600,
  mb: 0.75,
};

export const authPrimaryButtonSx = {
  bgcolor: "#7B49B1",
  color: "#FFFFFF",
  textTransform: "none",
  fontSize: 14,
  fontWeight: 600,
  borderRadius: "10px",
  py: 1.25,
  boxShadow: "none",
  "&:hover": {
    bgcolor: "#6A3F9A",
    boxShadow: "none",
  },
  "&.Mui-disabled": {
    bgcolor: "#C7B3DC",
    color: "#FFFFFF",
  },
};

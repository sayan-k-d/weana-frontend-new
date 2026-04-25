import { IconButton, InputAdornment, TextField } from "@mui/material";
import { ChangeEvent } from "react";

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

export default function SearchBox({
  search,
  setSearch,
  placeholderText = "Search",
}: {
  search: string;
  setSearch: (value: string) => void;
  placeholderText?: string;
}) {
  return (
    <TextField
      fullWidth
      placeholder={placeholderText}
      value={search}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
      size="small"
      sx={{
        mb: 2.5,
        "& .MuiOutlinedInput-root": {
          background: "#fff",
          borderRadius: 3,
          fontSize: 13.5,
          "& fieldset": { borderColor: "#E5E7EB" },
          "&:hover fieldset": { borderColor: "#D1D5DB" },
          "&.Mui-focused fieldset": {
            borderColor: "#6B3FA0",
            borderWidth: 1.5,
          },
        },
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ fontSize: 18, color: "#9CA3AF" }} />
            </InputAdornment>
          ),
          endAdornment: search ? (
            <InputAdornment position="end">
              <IconButton size="small" onClick={() => setSearch("")}>
                <CloseIcon sx={{ fontSize: 16, color: "#9CA3AF" }} />
              </IconButton>
            </InputAdornment>
          ) : null,
        },
      }}
    />
  );
}

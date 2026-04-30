"use client";

import { useState } from "react";
import {
  Box,
  OutlinedInput,
  Typography,
  Button,
  Popover,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import {
  VARIABLE_OPTIONS,
  type VariableToken,
} from "@/components/pages/members/constants/followupEmail";

interface SubjectFieldProps {
  value: string;
  onChange: (val: string) => void;
}

export function SubjectField({ value, onChange }: SubjectFieldProps) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const insertVariable = (token: VariableToken) => {
    onChange(value + token);
    setAnchor(null);
  };

  return (
    <Box sx={{ mb: 2.5 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.4, mb: 0.8 }}>
        <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#5C5874" }}>
          Subject
        </Typography>
        <Typography sx={{ fontSize: 13, color: "#E05858" }}>*</Typography>
      </Box>

      <OutlinedInput
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
        endAdornment={
          <>
            <Button
              size="small"
              endIcon={
                <KeyboardArrowDownRoundedIcon
                  sx={{ fontSize: "14px !important" }}
                />
              }
              onClick={(e) => setAnchor(e.currentTarget)}
              sx={{
                fontSize: 11.5,
                fontWeight: 600,
                color: "#6B3FA0",
                textTransform: "none",
                whiteSpace: "nowrap",
                px: 1.2,
                py: 0.4,
                border: "1px solid #D8D2F0",
                borderRadius: "8px",
                bgcolor: "#F3F0FB",
                "&:hover": { bgcolor: "#EAE4F8" },
                minWidth: 0,
              }}
            >
              Add Variable
            </Button>

            <Popover
              open={Boolean(anchor)}
              anchorEl={anchor}
              onClose={() => setAnchor(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              slotProps={{
                paper: {
                  sx: {
                    mt: 0.5,
                    borderRadius: "12px",
                    border: "1px solid #EAE8F0",
                    boxShadow: "0 8px 24px rgba(19,15,30,0.10)",
                    minWidth: 200,
                    overflow: "hidden",
                  },
                },
              }}
            >
              <Box sx={{ px: 1.5, pt: 1.5, pb: 0.5 }}>
                <Typography
                  sx={{
                    fontSize: 10.5,
                    fontWeight: 700,
                    color: "#A09EB8",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  Insert Variable
                </Typography>
              </Box>
              <List dense disablePadding sx={{ pb: 1 }}>
                {VARIABLE_OPTIONS.map((token) => (
                  <ListItemButton
                    key={token}
                    onClick={() => insertVariable(token)}
                    sx={{
                      px: 1.5,
                      py: 0.7,
                      mx: 0.5,
                      borderRadius: "8px",
                      "&:hover": { bgcolor: "#F3F1F8" },
                    }}
                  >
                    <ListItemText
                      primary={token}
                      slotProps={{
                        primary: {
                          sx: {
                            fontSize: 12.5,
                            fontWeight: 500,
                            color: "#3D3A4A",
                          },
                        },
                      }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Popover>
          </>
        }
        sx={{
          borderRadius: "10px",
          fontSize: 13,
          color: "#3D3A4A",
          bgcolor: "#F7F6FA",
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E8E6F0" },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#C4C0D8",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#6B3FA0",
            borderWidth: 1.5,
          },
          "& .MuiOutlinedInput-input": { py: 1.3, px: 1.8, fontSize: 13 },
        }}
      />
    </Box>
  );
}

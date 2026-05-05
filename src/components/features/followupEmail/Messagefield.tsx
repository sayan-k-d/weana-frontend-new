"use client";

import { useState, useRef } from "react";
import {
  Box,
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
} from "@/components/pages/businessAdminDashboard/members/constants/followupEmail";

interface MessageFieldProps {
  value: string;
  onChange: (val: string) => void;
}

export function MessageField({ value, onChange }: MessageFieldProps) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertVariable = (token: VariableToken) => {
    const el = textareaRef.current;
    if (el) {
      const start = el.selectionStart ?? value.length;
      const end = el.selectionEnd ?? value.length;
      const next = value.slice(0, start) + token + value.slice(end);
      onChange(next);
    } else {
      onChange(value + token);
    }
    setAnchor(null);
  };

  // Render message with clickable "digital business card" link styled in preview
  const renderPreviewLines = () =>
    value.split("\n").map((line, i) => (
      <Typography
        key={i}
        sx={{
          fontSize: 12.5,
          color: line === "" ? undefined : "#3D3A4A",
          lineHeight: 1.7,
          minHeight: line === "" ? "1em" : undefined,
        }}
      >
        {line || "\u00A0"}
      </Typography>
    ));

  return (
    <Box sx={{ mb: 2.5 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.4, mb: 0.8 }}>
        <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#5C5874" }}>
          Message
        </Typography>
        <Typography sx={{ fontSize: 13, color: "#E05858" }}>*</Typography>
      </Box>

      {/* Textarea container */}
      <Box
        sx={{
          border: "1px solid #E8E6F0",
          borderRadius: "10px",
          bgcolor: "#F7F6FA",
          overflow: "hidden",
          transition: "border-color 0.15s",
          "&:focus-within": { borderColor: "#6B3FA0" },
        }}
      >
        <Box
          component="textarea"
          ref={textareaRef}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            onChange(e.target.value)
          }
          rows={8}
          sx={{
            display: "block",
            width: "100%",
            border: "none",
            outline: "none",
            resize: "none",
            bgcolor: "transparent",
            px: 2,
            pt: 1.8,
            pb: 0.5,
            fontSize: 13,
            fontFamily: 'Inter, "Segoe UI", sans-serif',
            color: "#3D3A4A",
            lineHeight: 1.7,
            boxSizing: "border-box",
            "::placeholder": { color: "#B0AEC4" },
          }}
        />

        {/* Toolbar row */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            px: 1.5,
            py: 1,
            borderTop: "1px solid #EAE8F0",
          }}
        >
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
              px: 1.2,
              py: 0.4,
              border: "1px solid #D8D2F0",
              borderRadius: "8px",
              bgcolor: "#F3F0FB",
              "&:hover": { bgcolor: "#EAE4F8" },
            }}
          >
            Add Variable
          </Button>

          <Popover
            open={Boolean(anchor)}
            anchorEl={anchor}
            onClose={() => setAnchor(null)}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            transformOrigin={{ vertical: "bottom", horizontal: "left" }}
            slotProps={{
              paper: {
                sx: {
                  mb: 0.5,
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
        </Box>
      </Box>
    </Box>
  );
}

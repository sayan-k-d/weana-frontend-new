"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Popover,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Paper,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import type { CustomField } from "./index";

const FIELD_TYPES: { type: CustomField["type"]; label: string }[] = [
  { type: "text", label: "Text" },
  { type: "email", label: "Email" },
  { type: "phone", label: "Phone" },
  { type: "select", label: "Dropdown" },
];

interface AddFieldButtonProps {
  onAdd: (field: CustomField) => void;
}

export function AddFieldButton({ onAdd }: AddFieldButtonProps) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const handleSelect = (type: CustomField["type"]) => {
    const labelMap: Record<CustomField["type"], string> = {
      text: "Text Field",
      email: "Email",
      phone: "Phone Number",
      select: "Dropdown",
    };
    onAdd({
      id: `field-${crypto.randomUUID()}`,
      label: labelMap[type],
      type,
      required: false,
      placeholder: "",
    });
    setAnchor(null);
  };

  return (
    <>
      <Button
        startIcon={<AddRoundedIcon sx={{ fontSize: "15px !important" }} />}
        onClick={(e) => setAnchor(e.currentTarget)}
        sx={{
          fontSize: 13,
          fontWeight: 600,
          color: "#6B3FA0",
          textTransform: "none",
          px: 0,
          minWidth: 0,
          "&:hover": { bgcolor: "transparent", opacity: 0.75 },
        }}
        disableRipple
      >
        Add field
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
              minWidth: 160,
              overflow: "hidden",
            },
          },
        }}
      >
        <Box sx={{ px: 1.5, pt: 1.5, pb: 0.5 }}>
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 700,
              color: "#A09EB8",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Field Type
          </Typography>
        </Box>
        <List dense disablePadding sx={{ pb: 1 }}>
          {FIELD_TYPES.map(({ type, label }) => (
            <ListItemButton
              key={type}
              onClick={() => handleSelect(type)}
              sx={{
                px: 1.5,
                py: 0.8,
                borderRadius: "8px",
                mx: 0.5,
                "&:hover": { bgcolor: "#F3F1F8" },
              }}
            >
              <ListItemText
                primary={label}
                slotProps={{
                  primary: {
                    sx: {
                      fontSize: 13,
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
  );
}

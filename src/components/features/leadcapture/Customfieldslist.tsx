"use client";

import { Box, Typography, IconButton, Stack } from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import DragIndicatorRoundedIcon from "@mui/icons-material/DragIndicatorRounded";
import type { CustomField } from "./index";

interface CustomFieldsListProps {
  fields: CustomField[];
  onRemove: (id: string) => void;
}

const TYPE_LABEL: Record<CustomField["type"], string> = {
  text: "Text",
  email: "Email",
  phone: "Phone",
  select: "Dropdown",
};

export function CustomFieldsList({ fields, onRemove }: CustomFieldsListProps) {
  if (fields.length === 0) {
    return (
      <Box
        sx={{
          py: 4,
          textAlign: "center",
          border: "1px solid #EAE8F0",
          borderRadius: "12px",
          bgcolor: "#FAFAFA",
        }}
      >
        <Typography
          sx={{ fontSize: 13.5, fontWeight: 600, color: "#3D3A4A", mb: 0.5 }}
        >
          No fields added
        </Typography>
        <Typography sx={{ fontSize: 12.5, color: "#A09EB8" }}>
          Add fields to collect more context on each lead
        </Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={1}>
      {fields.map((field) => (
        <Box
          key={field.id}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 1.5,
            py: 1.4,
            border: "1px solid #EAE8F0",
            borderRadius: "12px",
            bgcolor: "#FAFAFA",
            "&:hover": { bgcolor: "#F3F1F8", borderColor: "#C4C0D8" },
            transition: "all 0.15s",
          }}
        >
          {/* Drag handle */}
          <DragIndicatorRoundedIcon
            sx={{
              fontSize: 18,
              color: "#C4C0D8",
              cursor: "grab",
              flexShrink: 0,
            }}
          />

          {/* Label + type */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 600,
                color: "#3D3A4A",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {field.label}
            </Typography>
            <Typography sx={{ fontSize: 11.5, color: "#A09EB8" }}>
              {TYPE_LABEL[field.type]}
              {field.required ? " · Required" : ""}
            </Typography>
          </Box>

          {/* Remove */}
          <IconButton
            size="small"
            onClick={() => onRemove(field.id)}
            sx={{
              color: "#C4C0D8",
              flexShrink: 0,
              "&:hover": { color: "#E05858", bgcolor: "#FEF2F2" },
            }}
          >
            <DeleteOutlineRoundedIcon sx={{ fontSize: 17 }} />
          </IconButton>
        </Box>
      ))}
    </Stack>
  );
}

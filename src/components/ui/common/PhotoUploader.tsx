import { Box, Stack, Tooltip, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined"; // Closer icon match
import { useState, useRef } from "react";

// --- Defining types for clarity ---
type ShapeType = "circle" | "rect";
type ColorPalette = {
  text: string;
  label: string;
  placeholderText: string;
  icon: string;
  borderDisabled: string;
  bgDisabled: string;
};

// -- Define the palette to match the image --
const pal: ColorPalette = {
  text: "#606060", // Dark gray for main labels
  label: "#B8B8B8", // Light gray for info icons/text
  placeholderText: "#A0A0A0", // Medium gray for placeholder text
  icon: "#909090", // Gray for the upload icon
  borderDisabled: "#E0E0E0", // Very light gray border
  bgDisabled: "#F0F0F0", // Light gray background
};

interface PhotoUploaderProps {
  label: string;
  info?: React.ReactNode;
  shape?: ShapeType;
  width?: number;
  height?: number; // Keep height fixed
  disabled?: boolean;
  disabledMessage?: string;
  value?: string | null;
  justContent?: string | null;
  onChange?: (file: File, url: string) => void;
}

export function PhotoUploader({
  label,
  info,
  shape = "circle",
  height = 100, // Slightly taller default for spacing
  width = 100,
  disabled = false,
  disabledMessage,
  justContent,
  value,
  onChange,
}: PhotoUploaderProps) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    onChange?.(file, url);
  };

  const borderRadius = shape === "circle" ? "50%" : "16px"; // Softer curve for rect

  // Helper function for placeholder contents (matches image)
  const renderPlaceholder = () => {
    const icon = disabled ? (
      <InfoOutlinedIcon sx={{ fontSize: 32, color: pal.placeholderText }} />
    ) : (
      <AddPhotoAlternateOutlinedIcon sx={{ fontSize: 26, color: pal.icon }} />
    );

    const message =
      disabled && disabledMessage
        ? disabledMessage
        : "Select file or\ndrag and drop\none here";

    return (
      <Stack
        spacing={disabled ? 1 : 0.5}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          px: shape === "circle" ? 1.5 : 4, // Padding depends on shape
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
        <Typography
          sx={{
            fontSize: shape === "circle" ? 10 : 11, // Match font size logic
            color: disabled ? pal.placeholderText : pal.placeholderText,
            lineHeight: 1.3,
            whiteSpace: "pre-wrap", // Essential for '\n' to work
            fontWeight: 400,
          }}
        >
          {message}
        </Typography>
      </Stack>
    );
  };

  return (
    <Stack
      spacing={1.5}
      // 3. Aligns the label and upload section in the center horizontally
      sx={{
        // 1. Logic to take space proportionally (rectangle takes more)
        flex: shape === "rect" ? 1.8 : 1,
        minWidth: shape === "rect" ? 220 : 100, // Provide safe minimums
        maxWidth: shape === "rect" ? 380 : 150,
        alignItems: "center",
      }}
    >
      {/* 2. New centered label structure */}
      <Stack
        direction="row"
        spacing={0.5}
        sx={{
          width: "100%",
          alignItems: "center",
          justifyContent: justContent ?? "space-between",
        }}
      >
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 500,
            color: pal.text,
            textAlign: "center",
          }}
        >
          {label}
        </Typography>
        {info && (
          <Tooltip title={info} placement="top" arrow>
            <Box
              component="span"
              sx={{
                ml: 0.2,
                color: pal.label,
                fontSize: 14,
                cursor: "pointer",
                fontWeight: 400,
                lineHeight: 1,
              }}
            >
              {info}
            </Box>
          </Tooltip>
        )}
      </Stack>

      <Box
        onClick={() => !disabled && inputRef.current?.click()}
        onDragOver={(e) => {
          if (!disabled) {
            e.preventDefault();
            setDragOver(true);
          }
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (!disabled) {
            const file = e.dataTransfer.files[0];
            if (file) handleFile(file);
          }
        }}
        sx={{
          // Fluid width within the flex container
          width: width ?? "100%",
          height: height,
          borderRadius,
          // Match border style in image (solid vs dashed?)
          border: disabled ? "none" : "1.5px dashed",
          borderColor: dragOver ? "#6B3FA0" : pal.placeholderText,
          // Replicate background colors
          bgcolor: disabled ? pal.bgDisabled : dragOver ? "#F0EDFB" : "#F8F8F8",
          cursor: disabled ? "not-allowed" : "pointer",
          overflow: "hidden",
          position: "relative",
          transition: "all 0.1s",
          "&:hover": !disabled
            ? { borderColor: "#6B3FA0", bgcolor: "#F0EDFB" }
            : {},
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />

        {value && !disabled ? (
          <Box
            component="img"
            src={value}
            alt={label}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          renderPlaceholder()
        )}
      </Box>
    </Stack>
  );
}

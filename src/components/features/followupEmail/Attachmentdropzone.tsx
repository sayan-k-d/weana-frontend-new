"use client";

import { useRef, useState, DragEvent, ChangeEvent } from "react";
import { Box, Typography, IconButton, Stack } from "@mui/material";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";

interface AttachmentDropZoneProps {
  files: File[];
  onAdd: (files: File[]) => void;
  onRemove: (name: string) => void;
  maxSizeMB?: number;
}

export function AttachmentDropZone({
  files,
  onAdd,
  onRemove,
  maxSizeMB = 30,
}: AttachmentDropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const valid = Array.from(incoming).filter(
      (f) => f.size <= maxSizeMB * 1024 * 1024,
    );
    onAdd(valid);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <Box sx={{ mb: 1 }}>
      <Typography
        sx={{ fontSize: 13, fontWeight: 600, color: "#5C5874", mb: 1 }}
      >
        Add Attachment
      </Typography>

      {/* Drop zone */}
      <Box
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        sx={{
          border: `1.5px dashed ${dragging ? "#6B3FA0" : "#D8D4EC"}`,
          borderRadius: "12px",
          bgcolor: dragging ? "#F3F0FB" : "#FAFAFA",
          py: 2.5,
          px: 2,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          cursor: "pointer",
          transition: "all 0.15s",
          "&:hover": { borderColor: "#6B3FA0", bgcolor: "#F8F6FD" },
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "10px",
            bgcolor: "#EDE9F8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <AttachFileRoundedIcon sx={{ fontSize: 18, color: "#6B3FA0" }} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#3D3A4A" }}>
            Click Or Drop Files Here
          </Typography>
          <Typography sx={{ fontSize: 11.5, color: "#A09EB8" }}>
            Max Size: {maxSizeMB}MB
          </Typography>
        </Box>
      </Box>

      {/* Hidden input */}
      <input
        ref={inputRef}
        type="file"
        multiple
        style={{ display: "none" }}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleFiles(e.target.files)
        }
      />

      {/* Attached files list */}
      {files.length > 0 && (
        <Stack spacing={0.8} sx={{ mt: 1.5 }}>
          {files.map((file) => (
            <Box
              key={file.name}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 1.5,
                py: 1,
                border: "1px solid #E8E6F0",
                borderRadius: "10px",
                bgcolor: "#FAFAFA",
              }}
            >
              <InsertDriveFileOutlinedIcon
                sx={{ fontSize: 16, color: "#9896A6", flexShrink: 0 }}
              />
              <Typography
                sx={{
                  flex: 1,
                  fontSize: 12.5,
                  color: "#3D3A4A",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {file.name}
              </Typography>
              <Typography
                sx={{ fontSize: 11, color: "#A09EB8", flexShrink: 0 }}
              >
                {(file.size / 1024).toFixed(0)}KB
              </Typography>
              <IconButton
                size="small"
                onClick={() => onRemove(file.name)}
                sx={{
                  color: "#C4C0D8",
                  p: 0.3,
                  "&:hover": { color: "#E05858", bgcolor: "#FEF2F2" },
                }}
              >
                <CloseRoundedIcon sx={{ fontSize: 14 }} />
              </IconButton>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
}

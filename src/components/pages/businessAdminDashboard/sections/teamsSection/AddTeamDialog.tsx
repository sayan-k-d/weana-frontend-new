"use client";

import { useRef, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  InputBase,
  Typography,
  Stack,
  Paper,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { AddTeamDialogProps } from "@/types";
import { inputSx } from "../../teams/constants/sharedInputStyle";

// ─── Dialog component ─────────────────────────────────────────────────────────

export function AddTeamDialog({ open, onClose, onSubmit }: AddTeamDialogProps) {
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setLogo(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleSubmit = () => {
    if (!teamName.trim()) return;
    onSubmit?.({ logo, teamName, description });
    handleClose();
  };

  const handleClose = () => {
    setLogo(null);
    setLogoPreview(null);
    setTeamName("");
    setDescription("");
    onClose();
  };

  const isReady = teamName.trim().length > 0;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false}
      slotProps={{
        paper: {
          sx: {
            width: "min(680px, calc(100vw - 40px))",
            borderRadius: "24px",
            boxShadow: "0 24px 64px rgba(19,15,30,0.18)",
            p: 0,
            overflow: "hidden",
          },
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ px: 4, pt: 4, pb: 4 }}>
          {/* ── Header ── */}
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            <Typography
              sx={{
                fontSize: 26,
                fontWeight: 700,
                color: "#111018",
                letterSpacing: "-0.03em",
              }}
            >
              Add Team
            </Typography>
            <IconButton
              onClick={handleClose}
              size="small"
              sx={{
                color: "#9896A6",
                "&:hover": { bgcolor: "#F3F2F6", color: "#1E1A28" },
              }}
            >
              <CloseRoundedIcon sx={{ fontSize: 22 }} />
            </IconButton>
          </Stack>

          {/* ── Team logo ── */}
          <Typography
            sx={{ fontSize: 14, fontWeight: 600, color: "#1E1A28", mb: 1.4 }}
          >
            Team logo
          </Typography>

          <Stack
            direction="row"
            spacing={2.5}
            sx={{
              alignItems: "center",
              mb: 2.5,
            }}
          >
            {/* Drop zone / preview circle */}
            <Box
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              sx={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                border: "1.5px dashed",
                borderColor: dragOver ? "#6B3FA0" : "#C8C6D4",
                bgcolor: dragOver ? "#F0EDFB" : "#F5F4F8",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
                overflow: "hidden",
                transition: "all 0.15s",
                "&:hover": { borderColor: "#6B3FA0", bgcolor: "#F0EDFB" },
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                }}
              />

              {logoPreview ? (
                <Box
                  component="img"
                  src={logoPreview}
                  alt="Team logo preview"
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <>
                  <ImageOutlinedIcon
                    sx={{ fontSize: 26, color: "#B0AEC0", mb: 0.5 }}
                  />
                  <Typography
                    sx={{
                      fontSize: 10,
                      color: "#A09EB0",
                      textAlign: "center",
                      lineHeight: 1.4,
                      px: 1,
                    }}
                  >
                    Select file or
                    <br />
                    drag and drop
                    <br />
                    one here
                  </Typography>
                </>
              )}
            </Box>

            {/* Upload hint text */}
            <Box>
              <Typography
                sx={{ fontSize: 14, color: "#6B6880", lineHeight: 1.6, mb: 1 }}
              >
                Help your teammates represent their team
                <br />
                by adding a logo.
              </Typography>
              <Typography
                onClick={() => fileInputRef.current?.click()}
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#5B2D9E",
                  cursor: "pointer",
                  display: "inline",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Upload photo
              </Typography>
            </Box>
          </Stack>

          {/* ── Team name ── */}
          <Box sx={{ mb: 2.5 }}>
            <Stack
              direction="row"
              spacing={0.4}
              sx={{ alignItems: "center", mb: 1 }}
            >
              <Typography
                sx={{ fontSize: 14, fontWeight: 600, color: "#1E1A28" }}
              >
                Team name
              </Typography>
              <Typography
                sx={{ fontSize: 14, fontWeight: 600, color: "#E05252" }}
              >
                *
              </Typography>
            </Stack>
            <InputBase
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder=""
              sx={{ ...inputSx, height: 46 }}
            />
          </Box>

          {/* ── Description ── */}
          <Box sx={{ mb: 4 }}>
            <Typography
              sx={{ fontSize: 14, fontWeight: 600, color: "#1E1A28", mb: 1 }}
            >
              Description
            </Typography>
            <InputBase
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder=""
              multiline
              rows={3}
              sx={{ ...inputSx, alignItems: "flex-start", py: 1.4 }}
            />
          </Box>

          {/* ── Submit button ── */}
          <Stack sx={{ alignItems: "flex-end" }}>
            <Button
              onClick={handleSubmit}
              disabled={!isReady}
              disableElevation
              variant="contained"
              sx={{
                bgcolor: isReady ? "#5B2D9E" : "#D8D6E3",
                color: isReady ? "#FFFFFF" : "#A09EB8",
                borderRadius: "999px",
                px: 4,
                py: 1.1,
                fontSize: 14,
                fontWeight: 600,
                textTransform: "none",
                letterSpacing: "-0.01em",
                transition: "all 0.2s",
                "&:hover": {
                  bgcolor: isReady ? "#4A2282" : "#D8D6E3",
                },
                "&.Mui-disabled": {
                  bgcolor: "#D8D6E3",
                  color: "#A09EB8",
                },
              }}
            >
              Add Team
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

// ─── Trigger button + self-contained demo wrapper ─────────────────────────────

export default function AddTeamDialogDemo() {
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F3F2F6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: 'Inter, "Segoe UI", sans-serif',
      }}
    >
      <Button
        variant="contained"
        disableElevation
        onClick={() => setOpen(true)}
        sx={{
          bgcolor: "#5B2D9E",
          color: "#fff",
          borderRadius: "999px",
          px: 3.5,
          py: 1.1,
          fontSize: 14,
          fontWeight: 600,
          textTransform: "none",
          "&:hover": { bgcolor: "#4A2282" },
        }}
      >
        + Add Team
      </Button>

      <AddTeamDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={(data) => {
          console.log("New team:", data);
          setOpen(false);
        }}
      />
    </Box>
  );
}

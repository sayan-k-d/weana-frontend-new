"use client";

import { useRef, useState } from "react";
import { Box, Chip, Icon, Stack, Typography } from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';

// ─── Field chips shown in the purple info banner ──────────────────────────────
const CSV_FIELDS = [
  "Email (required)",
  "Name",
  "Title",
  "Company",
  "Location",
  "Photo (URL)",
];

// ─── Step tab pill ─────────────────────────────────────────────────────────────
function StepTab({ label, active }: { label: string; active: boolean }) {
  return (
    <Box
      sx={{
        px: 2.2,
        py: 0.6,
        borderRadius: "999px",
        bgcolor: active ? "#FFFFFF" : "#EEECF5",
        border: "1px solid",
        borderColor: active ? "#D6D3E3" : "transparent",
        boxShadow: active ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
        cursor: "pointer",
        transition: "all 0.15s",
      }}
    >
      <Typography
        sx={{
          fontSize: 13,
          fontWeight: active ? 600 : 500,
          color: active ? "#1E1A28" : "#9490A8",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

export function CsvPanel() {
  const [step, setStep] = useState<1 | 2>(1);
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => setFileName(file.name);

  return (
    <Box sx={{ px: { xs: 3, md: 4 }, py: 3.5 }}>
      {/* Header row */}
      <Stack
        direction="row"
        sx={{ mb: 2.5, alignItems: "center", justifyContent: "space-between" }}
      >
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 700,
            color: "#1E1A28",
            letterSpacing: "-0.02em",
          }}
        >
          Import Members
        </Typography>

        {/* Step tabs */}
        <Stack
          direction="row"
          spacing={0.6}
          sx={{ bgcolor: "#EEECF5", borderRadius: "999px", p: 0.4 }}
        >
          <Box onClick={() => setStep(1)}>
            <StepTab label="1 - Upload" active={step === 1} />
          </Box>
          <Box onClick={() => setStep(2)}>
            <StepTab label="2 - Mapping" active={step === 2} />
          </Box>
        </Stack>
      </Stack>

      {step === 1 && (
        /* ── Upload step ── */
        <Box
          sx={{
            border: "1.5px dashed #D0CCE8",
            borderRadius: "14px",
            bgcolor: "#FDFCFF",
            overflow: "hidden",
          }}
        >
          {/* Field chips banner */}
          <Box
            sx={{
              bgcolor: "#F0EDFB",
              px: 2.5,
              py: 1.6,
              borderBottom: "1.5px dashed #D0CCE8",
            }}
          >
            <Stack
              direction="row"
              sx={{ alignItems: "center", justifyContent:"center", gap: 1, flexWrap: "wrap" }}
            >
              <Typography sx={{ fontSize: 12.5, color: "#1E1A28" }}>
                <strong>Email is required.</strong>&nbsp;&nbsp;All other fields
                are optional.
              </Typography>
            </Stack>
            <Stack direction="row" sx={{ flexWrap: "wrap",justifyContent:"center", gap: 1, mt: 1.2 }}>
              {CSV_FIELDS.map((f) => (
                <Chip
                  key={f}
                  label={f}
                  size="small"
                  sx={{
                    bgcolor: "#FFFFFF",
                    border: "1px solid #DDD9EE",
                    color: "#2D2840",
                    fontSize: 12,
                    fontWeight: 500,
                    borderRadius: "999px",
                    height: 28,
                    p: 1.5
                  }}
                />
              ))}
            </Stack>
          </Box>

          {/* Drop zone */}
          <Box
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              const file = e.dataTransfer.files[0];
              if (file) handleFile(file);
            }}
            onClick={() => inputRef.current?.click()}
            sx={{
              py: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              bgcolor: dragOver ? "#F0EDFB" : "transparent",
              transition: "background 0.15s",
            }}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              style={{ display: "none" }}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
              }}
            />

            {/* CSV file icon */}
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: 50,
                bgcolor: "#EEECF5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <UploadFileIcon sx={{ fontSize: 28, color: "#5B2D9E" }} />
            </Box>

            {fileName ? (
              <Typography
                sx={{ fontSize: 14, fontWeight: 600, color: "#1E1A28" }}
              >
                {fileName}
              </Typography>
            ) : (
              <>
                <Typography
                  sx={{ fontSize: 15, fontWeight: 500, color: "#2D2840" }}
                >
                  <Box
                    component="span"
                    sx={{ color: "#5B2D9E", fontWeight: 700 }}
                  >
                    Select CSV or Excel file
                  </Box>{" "}
                  to upload
                </Typography>
                <Typography sx={{ fontSize: 12.5, color: "#9A98A7", mt: 0.6 }}>
                  or drag and drop it here
                </Typography>
              </>
            )}
          </Box>
        </Box>
      )}

      {step === 2 && (
        /* ── Mapping step placeholder ── */
        <Box
          sx={{
            border: "1.5px dashed #D0CCE8",
            borderRadius: "14px",
            bgcolor: "#FDFCFF",
            py: 6,
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontSize: 14, color: "#9A98A7" }}>
            Map your CSV columns to Weana fields after uploading a file.
          </Typography>
        </Box>
      )}
    </Box>
  );
}

"use client";

import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

interface AddContentDialogProps {
  open: boolean;
  onClose: () => void;
}

type ContentItem = {
  id: string;
  label: string;
};

const categories = [
  "Contact",
  "Social Media",
  "Business",
  "Content",
  "Real Estate",
  "Payment",
  "Music",
  "More",
];

const recommendedItems: ContentItem[] = [
  { id: "text", label: "Text" },
  { id: "email", label: "Email" },
  { id: "instagram", label: "Instagram" },
  { id: "website", label: "Website" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "call", label: "Call" },
];

const contactItems: ContentItem[] = [
  { id: "contact-text", label: "Text" },
  { id: "contact-call", label: "Call" },
  { id: "contact-email", label: "Email" },
  { id: "address", label: "Address" },
  { id: "facetime", label: "FaceTime" },
  { id: "whatsapp", label: "WhatsApp" },
];

function SectionCard({ title, items }: { title: string; items: ContentItem[] }) {
  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid #DAD6E2",
        borderRadius: 1.8,
        bgcolor: "#F4F3F7",
        p: 1.4,
      }}
    >
      <Typography sx={{ fontSize: 11.5, color: "#6E6880", fontWeight: 600, mb: 1.1 }}>
        {title}
      </Typography>

      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 1 }}>
        {items.map((item) => (
          <Paper
            key={item.id}
            elevation={0}
            sx={{
              borderRadius: 1.6,
              border: "1px solid #E3DFEB",
              bgcolor: "#FFFFFF",
              px: 1.1,
              py: 0.9,
            }}
          >
            <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
              <Typography sx={{ fontSize: 13, color: "#271E36", fontWeight: 500 }}>
                {item.label}
              </Typography>
              <IconButton size="small" sx={{ color: "#A09AAE" }}>
                <AddCircleOutlineRoundedIcon sx={{ fontSize: 17 }} />
              </IconButton>
            </Stack>
          </Paper>
        ))}
      </Box>
    </Paper>
  );
}

export default function AddContentDialog({ open, onClose }: AddContentDialogProps) {
  return (
    <Dialog
      open={open}
      maxWidth={false}
      onClose={(_, reason) => {
        if (reason === "backdropClick") return;
        onClose();
      }}
      slotProps={{
        paper: {
          sx: {
            width: "min(840px, calc(100vw - 48px))",
            borderRadius: "24px",
            m: 2,
            p: 0,
            overflow: "hidden",
            boxShadow: "0 18px 56px rgba(19, 15, 30, 0.24)",
          },
        },
      }}
    >
      <Box sx={{ px: 3.2, pt: 2.4, pb: 2.6, bgcolor: "#FFFFFF" }}>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography sx={{ fontSize: 26, fontWeight: 700, color: "#241B33", lineHeight: 1 }}>
            Add content
          </Typography>
          <IconButton onClick={onClose} sx={{ color: "#9E98AC", mr: -0.4 }}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Stack
          direction="row"
          spacing={1.4}
          sx={{ mt: 1.2, mb: 1.9, alignItems: "center", justifyContent: "space-between" }}
        >
          <Typography sx={{ fontSize: 13, color: "#7F7890" }}>
            Select from our wide variety of links and contact info below
          </Typography>
          <TextField
            size="small"
            placeholder="Search"
            sx={{
              width: 272,
              "& .MuiOutlinedInput-root": {
                borderRadius: 99,
                bgcolor: "#F3F2F6",
                "& fieldset": { borderColor: "transparent" },
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 16, color: "#8E889D" }} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Stack>

        <Stack direction="row" spacing={0.7} sx={{ flexWrap: "wrap", gap: 0.7, mb: 1.6 }}>
          {categories.map((category) => (
            <Button
              key={category}
              variant="contained"
              sx={{
                textTransform: "none",
                minWidth: "unset",
                borderRadius: 1.4,
                px: 1.35,
                py: 0.55,
                bgcolor: "#5E2D93",
                fontSize: 11,
                fontWeight: 600,
                boxShadow: "none",
                "&:hover": { bgcolor: "#4E237D", boxShadow: "none" },
              }}
            >
              {category}
            </Button>
          ))}
        </Stack>

        <Box sx={{ maxHeight: "58vh", overflowY: "auto", pr: 0.5 }}>
          <Stack spacing={1.6}>
            <SectionCard title="Recommended" items={recommendedItems} />
            <SectionCard title="Contact" items={contactItems} />
          </Stack>
        </Box>
      </Box>
    </Dialog>
  );
}

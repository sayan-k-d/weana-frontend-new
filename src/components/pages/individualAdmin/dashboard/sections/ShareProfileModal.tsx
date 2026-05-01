"use client";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, Dialog, IconButton, Typography } from "@mui/material";
import Image from "next/image";

type ShareProfileModalProps = {
  open: boolean;
  onClose: () => void;
};

const options = [
  {
    label: "Myself",
    image: "/images/vector.png",
  },
  {
    label: "My Team",
    image: "/images/multiple-users.png",
  },
];

export default function ShareProfileModal({ open, onClose }: ShareProfileModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      slotProps={{
        paper: {
          sx: {
            width: 420,
            borderRadius: 3.2,
            p: 2,
            pt: 2.3,
            bgcolor: "#FFFFFF",
            boxShadow: "0 18px 50px rgba(20, 17, 28, 0.24)",
            overflow: "visible",
          },
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 10,
          top: 10,
          color: "#A09AAD",
          zIndex: 2,
          bgcolor: "#FFFFFF",
          "&:hover": { bgcolor: "#F8F6FC" },
        }}
      >
        <CloseRoundedIcon sx={{ fontSize: 18 }} />
      </IconButton>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 1.4,
          mt: 0.7,
          pr: 2.6,
        }}
      >
        {options.map((option) => (
          <Box
            key={option.label}
            sx={{
              border: "1px solid #ECE8F2",
              borderRadius: 1.6,
              height: 112,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              cursor: "pointer",
              bgcolor: "#FFFFFF",
              "&:hover": { bgcolor: "#FAF9FC" },
            }}
          >
            <Box sx={{ position: "relative", width: 30, height: 30 }}>
              <Image
                src={option.image}
                alt={option.label}
                fill
                sizes="30px"
                style={{ objectFit: "contain" }}
              />
            </Box>
            <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#2D2739" }}>
              {option.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Dialog>
  );
}

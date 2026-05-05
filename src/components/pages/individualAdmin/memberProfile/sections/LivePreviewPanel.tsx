"use client";

import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";

export default function LivePreviewPanel() {
  return (
    <Box
      sx={{
        width: 220,
        borderLeft: "1px solid #E7E3EE",
        px: 1.8,
        py: 2.2,
        bgcolor: "#FFFFFF",
      }}
    >
      <Typography sx={{ fontSize: 12.5, color: "#423C52", textAlign: "center" }}>
        Card live preview
      </Typography>
      <Typography sx={{ fontSize: 22, color: "#2B9CFF", textAlign: "center", mb: 1.2 }}>
        Add More
      </Typography>

      <Box
        sx={{
          borderRadius: 2.2,
          border: "1px solid #DFDBE9",
          overflow: "hidden",
          bgcolor: "#FFFFFF",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <Box sx={{ position: "relative", height: 140 }}>
          <Image src="/images/Rectangle-2414.png" alt="preview" fill sizes="220px" style={{ objectFit: "cover" }} />
        </Box>
        <Box sx={{ p: 1.5 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#262132", mb: 3 }}>
            Diago
          </Typography>
          <Button
            variant="contained"
            sx={{
              borderRadius: "999px",
              textTransform: "none",
              width: "100%",
              bgcolor: "#6D3FB0",
              boxShadow: "none",
            }}
          >
            Save Contact
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

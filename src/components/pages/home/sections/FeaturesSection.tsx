import Image from "next/image";
import { Box, Button, Paper, Typography } from "@mui/material";

import { FEATURE_CARDS } from "@/lib/constants";
import { whiteCardStyles } from "@/lib/utils";

// ─── Become an Expert card ────────────────────────────────────────────────────

export function ExpertCard() {
  return (
    <Paper elevation={0} sx={{ ...whiteCardStyles(), p: 2 }}>
      <Typography
        sx={{
          fontSize: 16,
          color: "#1E1A28",
          fontWeight: 700,
          mb: 0.8,
          letterSpacing: "-0.01em",
        }}
      >
        Become A Popl Teams Expert
      </Typography>
      <Typography
        sx={{ fontSize: 12, color: "#9E9CAA", mb: 1.8, lineHeight: 1.4 }}
      >
        Provide maximum value to your team by learning how to use the features
        most valuable for your team.
      </Typography>
      <Button
        variant="outlined"
        sx={{ borderRadius: "999px", px: 1.8, fontSize: 12, color: "#2B2736" }}
      >
        View Tutorials
      </Button>
    </Paper>
  );
}

// ─── Explore Features section ─────────────────────────────────────────────────

export function FeatureExplorer() {
  return (
    <Paper elevation={0} sx={{ ...whiteCardStyles(), p: 2 }}>
      <Typography
        sx={{
          fontSize: 16,
          color: "#1E1A28",
          fontWeight: 700,
          mb: 1.2,
          letterSpacing: "-0.01em",
        }}
      >
        Explore our features
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1.2,
        }}
      >
        {FEATURE_CARDS.map((card, index) => (
          <Paper
            key={`${card.title}-${index}`}
            elevation={0}
            sx={{ border: "1px solid #ECECF2", borderRadius: 2, p: 1.4 }}
          >
            <Box
              sx={{
                border: "1px solid #EFEFF4",
                borderRadius: 1.6,
                p: 0.9,
                mb: 1,
              }}
            >
              <Image
                src="/images/create_screen_img.png"
                alt={card.title}
                width={290}
                height={115}
                style={{
                  width: "100%",
                  height: 94,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
            </Box>
            <Typography
              sx={{
                fontSize: 16,
                color: "#24212F",
                fontWeight: 700,
                mb: 0.6,
                letterSpacing: "-0.01em",
              }}
            >
              {card.title}
            </Typography>
            <Typography
              sx={{ fontSize: 10.5, color: "#9B98A8", lineHeight: 1.4 }}
            >
              {card.body}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Paper>
  );
}

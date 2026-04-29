import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { LinkCard, LinkToolbar } from "./LinkCard";
import AddIcon from "@mui/icons-material/Add";

export function LinksSection() {
  const recommendedLinks = [
    { title: "Email", icon: "/icons/email.png" },
    { title: "Call", icon: "/icons/call.png" },
    { title: "Website", icon: "/icons/website.png" },
    { title: "LinkedIn", icon: "/icons/linkedin.png" },
  ];

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{ mb: 3, fontWeight: 700, color: "#1E1A28" }}
      >
        Links
      </Typography>

      <LinkToolbar />

      <Stack
        direction="row"
        sx={{ mb: 1, justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography sx={{ fontSize: 16, fontWeight: 700, color: "#1E1A28" }}>
          Recommended links
        </Typography>
        <Button
          endIcon={<AddIcon sx={{ fontSize: 14 }} />}
          sx={{
            textTransform: "none",
            color: "#6B3FA0",
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          Explore all links
        </Button>
      </Stack>

      <Typography sx={{ fontSize: 13, color: "#9896A6", mb: 3 }}>
        {`This template doesn't have any linked content yet. Start by adding our
        most popular links`}
      </Typography>

      <Grid container spacing={2}>
        {recommendedLinks.map((link) => (
          <Grid size={{ xs: 12, sm: 6 }} key={link.title}>
            <LinkCard title={link.title} icon={link.icon} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

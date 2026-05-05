import { Box, Button, Stack, Typography } from "@mui/material";
import WhiteCard from "@/components/ui/cards/WhiteCard";

export default function ExpertSection() {
  return (
    <WhiteCard sx={{ p: 2, mb: 2 }}>
      <Stack spacing={2}>
        <Typography>Need Expert Help?</Typography>

        <Typography sx={{ fontSize: 14 }} color="#6E6A7D">
          Talk to our experts to boost your performance
        </Typography>

        <Box>
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: "#5F5CF1",
            }}
          >
            Book a Call
          </Button>
        </Box>
      </Stack>
    </WhiteCard>
  );
}

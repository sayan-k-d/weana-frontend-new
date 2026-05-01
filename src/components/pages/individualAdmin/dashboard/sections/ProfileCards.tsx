"use client";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";

type ProfileCardsProps = {
  onShareProfileClick: () => void;
  onCreateNewProfileClick: () => void;
};

export default function ProfileCards({
  onShareProfileClick,
  onCreateNewProfileClick,
}: ProfileCardsProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 2.2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          bgcolor: "#FFFFFF",
          border: "1px solid #EFEAF6",
          p: 1.7,
          minHeight: 316,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: 96,
            borderRadius: 2,
            overflow: "hidden",
            mb: 1.7,
            position: "relative",
          }}
        >
          <Image
            src="/images/Rectangle-2464.png"
            alt="Profile cover"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
            priority
          />
        </Box>

        <Box
          sx={{
            width: 92,
            height: 92,
            borderRadius: "50%",
            border: "3px solid #FFFFFF",
            mt: -5.2,
            mb: 1.3,
            overflow: "hidden",
            bgcolor: "#ECE8F4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Image
            src="/images/Frame-322.png"
            alt="Profile avatar"
            fill
            sizes="92px"
            style={{ objectFit: "cover" }}
          />
        </Box>

        <Typography sx={{ fontSize: 32, fontWeight: 500, color: "#231D31", mb: 1.5 }}>
          abc@gmail.com
        </Typography>

        <Stack direction="row" spacing={1.1}>
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              borderRadius: "999px",
              borderColor: "#D9D4E5",
              color: "#2F293B",
              fontWeight: 600,
              px: 2.4,
            }}
          >
            Edit Profile
          </Button>
          <Button
            variant="contained"
            endIcon={<NorthEastRoundedIcon sx={{ fontSize: 14 }} />}
            onClick={onShareProfileClick}
            sx={{
              textTransform: "none",
              borderRadius: "999px",
              bgcolor: "#6F3AB1",
              fontWeight: 600,
              px: 2.3,
              boxShadow: "none",
              "&:hover": { bgcolor: "#5F2D9E", boxShadow: "none" },
            }}
          >
            Share Profile
          </Button>
        </Stack>
      </Paper>

      <Paper
        elevation={0}
        onClick={onCreateNewProfileClick}
        sx={{
          borderRadius: 3,
          bgcolor: "#FFFFFF",
          border: "1px solid #EFEAF6",
          minHeight: 316,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 1.1,
          color: "#2D2739",
          cursor: "pointer",
        }}
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            bgcolor: "#F5F2FB",
            border: "1px solid #E7DFF8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AddRoundedIcon sx={{ fontSize: 33, color: "#2D2739" }} />
        </Box>
        <Typography sx={{ fontSize: 37, fontWeight: 500 }}>
          Create New Profile
        </Typography>
      </Paper>
    </Box>
  );
}

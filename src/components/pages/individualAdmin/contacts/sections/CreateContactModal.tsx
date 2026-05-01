"use client";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

type CreateContactModalProps = {
  open: boolean;
  onClose: () => void;
};

const INPUT_STYLES = {
  "& .MuiOutlinedInput-root": {
    height: 56,
    borderRadius: 1.2,
    fontSize: 14,
    bgcolor: "#FAFAFC",
    "& fieldset": { border: "1px solid #E7E2EE" },
    "&:hover fieldset": { borderColor: "#DED7E9" },
    "&.Mui-focused fieldset": { borderColor: "#BBAAD9" },
    "& input": {
      py: 1.8,
    },
  },
};

export default function CreateContactModal({
  open,
  onClose,
}: CreateContactModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      slotProps={{
        paper: {
          sx: {
            width: 640,
            minHeight: 550,
            borderRadius: 3.2,
            bgcolor: "#FFFFFF",
            boxShadow: "0 16px 50px rgba(19, 16, 27, 0.25)",
            overflow: "hidden",
          },
        },
      }}
    >
      <Box sx={{ px: 2.2, pt: 2.2, pb: 2.1, position: "relative" }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            color: "#A09AAD",
          }}
        >
          <CloseRoundedIcon sx={{ fontSize: 18 }} />
        </IconButton>

        <Typography sx={{ fontSize: 28, fontWeight: 700, color: "#1F1A2A", mb: 0.2 }}>
          Create New Contact
        </Typography>
        <Typography sx={{ fontSize: 13, color: "#9B94AA", mb: 1.8 }}>
          Fill in the details below to create a new contact.
        </Typography>

        <Typography sx={{ fontSize: 12, fontWeight: 600, color: "#2D2739", mb: 0.65 }}>
          Contact Owner
        </Typography>

        <Box
          sx={{
            height: 48,
            border: "1px solid #E8E2EE",
            borderRadius: 1.2,
            px: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: "#FAFAFC",
            mb: 1.8,
          }}
        >
          <Stack direction="row" spacing={0.8} sx={{ alignItems: "center" }}>
            <Avatar sx={{ width: 24, height: 24, bgcolor: "#EF7D72", fontSize: 8 }}>
              LOGO
            </Avatar>
            <Typography sx={{ fontSize: 11.8, color: "#2E283A" }}>
              abc@gmail.com
            </Typography>
          </Stack>
          <Button
            sx={{
              textTransform: "none",
              minWidth: "auto",
              p: 0,
              fontSize: 11.5,
              color: "#7A56B6",
              fontWeight: 600,
            }}
          >
            Edit
          </Button>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.2, mb: 2 }}>
          <Box>
            <Typography sx={{ fontSize: 11.5, fontWeight: 600, color: "#2D2739", mb: 0.55 }}>
              Assign to Event
            </Typography>
            <TextField
              fullWidth
              placeholder="No Event"
              size="small"
              slotProps={{
                input: {
                  endAdornment: (
                    <KeyboardArrowDownRoundedIcon
                      sx={{ color: "#A59CB6", fontSize: 17 }}
                    />
                  ),
                },
              }}
              sx={INPUT_STYLES}
            />
          </Box>

          <Box>
            <Typography sx={{ fontSize: 11.5, fontWeight: 600, color: "#2D2739", mb: 0.55 }}>
              Template Contact Capture Form
            </Typography>
            <TextField
              fullWidth
              placeholder="Designers Global Template"
              size="small"
              slotProps={{
                input: {
                  endAdornment: (
                    <KeyboardArrowDownRoundedIcon
                      sx={{ color: "#A59CB6", fontSize: 17 }}
                    />
                  ),
                },
              }}
              sx={INPUT_STYLES}
            />
          </Box>
        </Box>

        <Box sx={{ borderTop: "1px solid #ECE8F2", mb: 2 }} />

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.2 }}>
          <Box>
            <Typography sx={{ fontSize: 11.5, fontWeight: 600, color: "#2D2739", mb: 0.55 }}>
              Full Name <Box component="span" sx={{ color: "#D65858" }}>*</Box>
            </Typography>
            <TextField fullWidth placeholder="Full Name" size="small" sx={INPUT_STYLES} />
          </Box>

          <Box>
            <Typography sx={{ fontSize: 11.5, fontWeight: 600, color: "#2D2739", mb: 0.55 }}>
              Phone Number <Box component="span" sx={{ color: "#D65858" }}>*</Box>
            </Typography>
            <TextField
              fullWidth
              placeholder="Phone Number"
              size="small"
              sx={INPUT_STYLES}
            />
          </Box>

          <Box>
            <Typography sx={{ fontSize: 11.5, fontWeight: 600, color: "#2D2739", mb: 0.55 }}>
              Email <Box component="span" sx={{ color: "#D65858" }}>*</Box>
            </Typography>
            <TextField fullWidth placeholder="Email" size="small" sx={INPUT_STYLES} />
          </Box>

          <Box>
            <Typography sx={{ fontSize: 11.5, fontWeight: 600, color: "#2D2739", mb: 0.55 }}>
              Company
            </Typography>
            <TextField fullWidth placeholder="Company" size="small" sx={INPUT_STYLES} />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          borderTop: "1px solid #ECE8F2",
          px: 2.1,
          py: 1.3,
          display: "flex",
          justifyContent: "flex-end",
          gap: 0.9,
          bgcolor: "#FFFFFF",
        }}
      >
        <Button
          variant="outlined"
          sx={{
            textTransform: "none",
            borderRadius: "999px",
            borderColor: "#E2DCEC",
            color: "#4A435A",
            fontSize: 12,
            fontWeight: 600,
            px: 1.2,
            py: 0.35,
          }}
        >
          Autofill Test Contact
        </Button>
        <Button
          variant="outlined"
          sx={{
            textTransform: "none",
            borderRadius: "999px",
            borderColor: "#E2DCEC",
            color: "#4A435A",
            fontSize: 12,
            fontWeight: 600,
            px: 1.2,
            py: 0.35,
          }}
        >
          Save as VCF
        </Button>
        <Button
          disabled
          variant="contained"
          sx={{
            textTransform: "none",
            borderRadius: "999px",
            fontSize: 12,
            fontWeight: 600,
            px: 1.3,
            py: 0.35,
            boxShadow: "none",
            bgcolor: "#E3DEE9",
            color: "#AFA7BC",
            "&.Mui-disabled": {
              bgcolor: "#E3DEE9",
              color: "#AFA7BC",
            },
          }}
        >
          Create Contact
        </Button>
      </Box>
    </Dialog>
  );
}

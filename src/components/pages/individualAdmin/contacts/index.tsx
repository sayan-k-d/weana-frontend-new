"use client";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CachedRoundedIcon from "@mui/icons-material/CachedRounded";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ContactsTable from "./sections/ContactsTable";
import CreateContactModal from "./sections/CreateContactModal";
import { CONTACT_ROWS } from "./constants";

const circleIconButtonSx = {
  width: 32,
  height: 32,
  border: "1px solid #E7E2EF",
  bgcolor: "#FFFFFF",
  color: "#7E778E",
  "&:hover": { bgcolor: "#F7F4FB" },
};

export default function IndividualAdminContactsPage() {
  const router = useRouter();
  const [isCreateContactModalOpen, setIsCreateContactModalOpen] = useState(false);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F7F7F7",
        px: 3,
        py: 2.5,
        fontFamily: 'Inter, "Segoe UI", sans-serif',
      }}
    >
      <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 1.7 }}>
        <Typography sx={{ fontSize: 21, fontWeight: 700, color: "#3B3151" }}>
          Contacts{" "}
          <Typography component="span" sx={{ fontSize: 14, color: "#AAA2BA" }}>
            ({CONTACT_ROWS.length})
          </Typography>
        </Typography>

        <Stack direction="row" spacing={0.8} sx={{ alignItems: "center" }}>
          <IconButton sx={circleIconButtonSx}>
            <CachedRoundedIcon sx={{ fontSize: 16 }} />
          </IconButton>
          <IconButton sx={circleIconButtonSx}>
            <FilterAltOutlinedIcon sx={{ fontSize: 15.5 }} />
          </IconButton>
          <IconButton sx={circleIconButtonSx}>
            <EventOutlinedIcon sx={{ fontSize: 16 }} />
          </IconButton>

          <Button
            variant="outlined"
            endIcon={
              <AddIcon
                sx={{
                  fontSize: 17,
                  transform: "rotate(0deg)",
                }}
              />
            }
            sx={{
              borderRadius: "999px",
              textTransform: "none",
              borderColor: "#E2DCEC",
              color: "#4A435A",
              px: 1.5,
              py: 0.55,
              fontSize: 12.5,
              fontWeight: 600,
              bgcolor: "#FFFFFF",
            }}
            onClick={() => setIsCreateContactModalOpen(true)}
          >
            Create Contact
          </Button>

          <Button
            variant="outlined"
            endIcon={<OpenInNewRoundedIcon sx={{ fontSize: 14 }} />}
            sx={{
              borderRadius: "999px",
              textTransform: "none",
              borderColor: "#E2DCEC",
              color: "#4A435A",
              px: 1.35,
              py: 0.55,
              fontSize: 12.5,
              fontWeight: 600,
              bgcolor: "#FFFFFF",
            }}
            onClick={() => router.push("/individual-admin/contacts/import")}
          >
            Import
          </Button>

          <Button
            variant="outlined"
            endIcon={<OpenInNewRoundedIcon sx={{ fontSize: 14 }} />}
            sx={{
              borderRadius: "999px",
              textTransform: "none",
              borderColor: "#E2DCEC",
              color: "#4A435A",
              px: 1.35,
              py: 0.55,
              fontSize: 12.5,
              fontWeight: 600,
              bgcolor: "#FFFFFF",
            }}
          >
            Export
          </Button>

          <Button
            variant="contained"
            endIcon={<KeyboardArrowDownRoundedIcon sx={{ fontSize: 17 }} />}
            sx={{
              borderRadius: "999px",
              textTransform: "none",
              bgcolor: "#6B39AE",
              px: 1.7,
              py: 0.58,
              fontSize: 12.5,
              fontWeight: 600,
              boxShadow: "none",
              "&:hover": { bgcolor: "#5A2E94", boxShadow: "none" },
            }}
          >
            Sync to CRM
          </Button>
        </Stack>
      </Stack>

      <TextField
        fullWidth
        placeholder="Search by name, email or company"
        size="small"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon sx={{ fontSize: 16, color: "#A69EB6" }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          mb: 1.8,
          "& .MuiOutlinedInput-root": {
            bgcolor: "#ededed",
            borderRadius: "999px",
            height: 40,
            fontSize: 13,
            color: "#6D6680",
            "& fieldset": { border: "1px solid #E8E2F1" },
            "&:hover fieldset": { borderColor: "#DED6EA" },
            "&.Mui-focused fieldset": { borderColor: "#B8A8D6" },
          },
        }}
      />

      <ContactsTable
        rows={CONTACT_ROWS}
        onRowClick={(id) => router.push(`/individual-admin/contacts/profile/${id}`)}
      />
      <CreateContactModal
        open={isCreateContactModalOpen}
        onClose={() => setIsCreateContactModalOpen(false)}
      />
    </Box>
  );
}

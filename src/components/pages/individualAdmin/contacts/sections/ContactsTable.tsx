"use client";

import Image from "next/image";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import {
  Avatar,
  Box,
  Checkbox,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import type { ContactRow } from "../constants";

const TABLE_COLUMNS = [
  "",
  "Contacts",
  "Tag",
  "Connect with",
  "Type",
  "Date",
  "Sync & Export",
  "",
];

export default function ContactsTable({
  rows,
  onRowClick,
}: {
  rows: ContactRow[];
  onRowClick?: (id: number) => void;
}) {
  return (
    <Box
      sx={{
        border: "1px solid #EEEAF4",
        borderRadius: "14px",
        overflow: "hidden",
        bgcolor: "#FFFFFF",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "44px minmax(220px, 2fr) 1fr 1fr 0.8fr 1fr 1fr 44px",
          alignItems: "center",
          px: 1.5,
          py: 1.3,
          borderBottom: "1px solid #EEEAF4",
          bgcolor: "#FFFFFF",
        }}
      >
        {TABLE_COLUMNS.map((column, index) => (
          <Typography
            key={`${column}-${index}`}
            sx={{ fontSize: 12.5, fontWeight: 600, color: "#8A829A" }}
          >
            {column}
          </Typography>
        ))}
      </Box>

      {rows.map((row) => (
        <Box
          key={row.id}
          sx={{
            display: "grid",
            gridTemplateColumns: "44px minmax(220px, 2fr) 1fr 1fr 0.8fr 1fr 1fr 44px",
            alignItems: "center",
            px: 1.5,
            py: 1.15,
            borderBottom: "1px solid #F2EFF7",
            "&:last-of-type": { borderBottom: "none" },
            cursor: onRowClick ? "pointer" : "default",
            "&:hover": onRowClick ? { bgcolor: "#FBFAFD" } : undefined,
          }}
          onClick={() => onRowClick?.(row.id)}
        >
          <Checkbox
            size="small"
            sx={{
              p: 0,
              ml: 0.2,
              color: "#D2CBDD",
              "&.Mui-checked": { color: "#6C3DB0" },
            }}
          />

          <Stack direction="row" spacing={1.2} sx={{ alignItems: "center" }}>
            <Avatar
              sx={{
                width: 30,
                height: 30,
                bgcolor: row.avatarColor,
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              {row.initials}
            </Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontSize: 13.5, fontWeight: 600, color: "#2D2739" }}>
                {row.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: 11.5,
                  color: "#A198AF",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {row.email}
              </Typography>
            </Box>
          </Stack>

          <Typography sx={{ fontSize: 12.5, color: "#BCB4CB" }}>-</Typography>

          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              border: "1px solid #E5DFF0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src="/images/user-line.png"
              alt="Connect with"
              width={14}
              height={14}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Image
              src={row.type === "calendar" ? "/images/notes.png" : "/images/vector1.png"}
              alt="Type"
              width={16}
              height={16}
            />
          </Box>

          <Typography sx={{ fontSize: 12.5, color: "#7A748A", fontWeight: 500 }}>
            {row.date}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Image
              src="/images/frame-205.png"
              alt="Sync and export"
              width={30}
              height={30}
            />
          </Box>

          <IconButton size="small" sx={{ color: "#8E889C", justifySelf: "end" }}>
            <MoreVertRoundedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
}

"use client";

import { Member } from "@/types";
import { Box, Typography, Avatar, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function MemberCard({ member }: { member: Member }) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: "16px",
        border: "1px solid #E5E7EB",
        background: "#fff",
        transition: "0.2s",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        },
        minHeight: 140,
      }}
    >
      {/* Top Section */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Avatar src={member.avatarUrl} sx={{ width: 40, height: 40 }} />
        <Box>
          <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
            {member.name}
          </Typography>
          <Typography sx={{ fontSize: 12, color: "#6B7280" }}>
            {member.email}
          </Typography>
        </Box>
      </Box>

      {/* Template */}
      <Box sx={{ mt: 1.5 }}>
        <Chip
          label={member.template}
          size="small"
          sx={{
            background: "#F9FAFB",
            border: "1px solid #E5E7EB",
            fontSize: 12,
          }}
        />
      </Box>

      {/* Team Colors */}

      {/* LEFT SIDE */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.2,
          justifyContent: "space-between",
          width: "100%",
          mt: 1.5,
        }}
      >
        {member.teamColors.length > 0 && (
          <Box
            sx={{
              borderRadius: 50,
              border: "1px solid #C5C5C5",
              px: 0.75,
              py: 0.5,
              display: "flex",
              alignItems: "center",
              maxWidth: 90,
            }}
          >
            <Box sx={{ display: "flex" }}>
              {member.teamColors.map((c, i) => (
                <Box
                  key={i}
                  sx={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background: c,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    ml: i === 0 ? 0 : -0.8, // 👈 overlap effect
                    border: "2px solid white",
                  }}
                >
                  <Typography sx={{ color: "#fff", fontSize: 8 }}>
                    {member.name.slice(0, 2).toUpperCase()}
                  </Typography>
                </Box>
              ))}
            </Box>

            <AddIcon
              sx={{
                fontSize: 14,
                ml: 0.5,
                width: 18,
                height: 18,
                backgroundColor: "#CFCFCF",
                borderRadius: "50%",
                p: 0.3,
              }}
            />
          </Box>
        )}
        <Chip
          size="small"
          label={member.status}
          sx={{
            backgroundColor:
              member.status === "Activated"
                ? "#EAFFE5"
                : member.status === "Pending"
                  ? "#BB7DFF30"
                  : "#FF000021",
            color: "#6B3FA0",
            fontWeight: 600,
            p: 1,
            borderRadius: 50,
          }}
        />
      </Box>
    </Box>
  );
}

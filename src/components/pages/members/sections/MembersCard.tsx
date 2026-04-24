"use client";

import { Member } from "@/types";
import { Box, Typography, Avatar, Chip } from "@mui/material";

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
      <Box sx={{ mt: 1.5, display: "flex", gap: 0.5 }}>
        {member.teamColors.map((color, i) => (
          <Box
            key={i}
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: color,
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

"use client";

import { Team } from "@/types";
import { Box, Typography, Avatar, Chip, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

export default function TeamsCard({ team }: { team: Team }) {
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
        minHeight: 165,
      }}
    >
      {/* Top Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        {team.avatarUrl ? (
          <Avatar src={team.avatarUrl} sx={{ width: 40, height: 40 }} />
        ) : (
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: `${team.department.color}` || "#C5C5C5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}
            >
              {team.department.name.charAt(0) +
                team.department.name.split(" ")[1].charAt(0)}
            </Typography>
          </Box>
        )}

        <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
          {team.department.name}
        </Typography>
      </Box>

      {/* Template */}
      <Box sx={{ mt: 1.5, textAlign: "center" }}>
        {team?.membersCount ? (
          <Chip
            sx={{ py: "4px", px: "6px", borderRadius: 50 }}
            label={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  gap: 0.5,
                }}
              >
                <PersonOutlineOutlinedIcon
                  sx={{ color: "#797979", fontSize: "1rem" }}
                />
                <Typography
                  sx={{ fontSize: 14, fontWeight: 600, color: "#797979" }}
                >
                  {team.membersCount}
                </Typography>
              </Box>
            }
            size="small"
          />
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "150px",
            }}
          >
            <Button
              variant="outlined"
              size="small"
              sx={{
                textTransform: "none",
                bgcolor: "#FFFFFF",
                borderRadius: 50,
                fontSize: 13,
                boxShadow: "none",
                border: "2px solid #E2E8F0",
                color: "#1E1E1E",
                fontWeight: 600,
                py: 0.5,
              }}
            >
              Add Members
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ColumnDef } from "@tanstack/react-table";
import { Member, Team } from "@/types";
import Link from "next/link";

export const columns = (
  selected: number[],
  setSelected: React.Dispatch<React.SetStateAction<number[]>>,
  data: Team[],
): ColumnDef<Team>[] => [
  {
    id: "select",

    header: () => {
      const allSelected =
        data.length > 0 &&
        (data as Team[]).every((t) => selected.includes(t.id));

      return (
        <Checkbox
          size="small"
          checked={allSelected}
          indeterminate={selected.length > 0 && !allSelected}
          onChange={(e) => {
            if (e.target.checked) {
              setSelected(data.map((m) => m.id));
            } else {
              setSelected([]);
            }
          }}
        />
      );
    },

    cell: ({ row }) => {
      const id = row.original.id;

      return (
        <Checkbox
          size="small"
          checked={selected.includes(id)}
          onChange={() => {
            setSelected((prev) =>
              prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
            );
          }}
        />
      );
    },

    size: 40,
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => {
      const t = row.original;

      return (
        <Link
          className="table-link"
          href={`/business-admin/teams/${t.id}`}
          style={{ textDecoration: "none", color: "#000000" }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {t.avatarUrl ? (
              <Avatar src={t.avatarUrl} sx={{ width: 36, height: 36 }} />
            ) : (
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: `${t.department.color}` || "#C5C5C5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}
                >
                  {t.department.name.charAt(0) +
                    t.department.name.split(" ")[1].charAt(0)}
                </Typography>
              </Box>
            )}
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
              {t.department.name}
            </Typography>
          </Box>
        </Link>
      );
    },
  },

  {
    id: "team",
    header: "Subteam Admins",
    cell: ({ row }) => {
      const t = row.original;

      return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
          {t.teamColors.length > 0 && (
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
                {t.teamColors.map((c, i) => (
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
                      {t.department.name.slice(0, 2).toUpperCase()}
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
        </Box>
      );
    },
  },

  {
    accessorKey: "members",
    header: "Members",
    cell: ({ row }) => {
      const t = row.original;
      return t?.membersCount ? (
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
                {t.membersCount}
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
            justifyContent: "space-between",
            width: "150px",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              bgcolor: "#FFFFFF",
              borderRadius: 50,
              fontSize: 13,
              boxShadow: "none",
              border: "2px solid #E2E8F0",
              color: "#1E1E1E",
              fontWeight: 600,
            }}
          >
            Add Members
          </Button>
        </Box>
      );
    },
  },
];

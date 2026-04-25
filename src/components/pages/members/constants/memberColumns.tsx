import {
  Avatar,
  Box,
  Checkbox,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ColumnDef } from "@tanstack/react-table";
import { Member } from "@/types";

export const columns = (
  selected: number[],
  setSelected: React.Dispatch<React.SetStateAction<number[]>>,
  data: Member[],
): ColumnDef<Member>[] => [
  {
    id: "select",

    header: () => {
      const allSelected =
        data.length > 0 &&
        (data as Member[]).every((m) => selected.includes(m.id));

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
    accessorKey: "name",
    header: "Member",
    cell: ({ row }) => {
      const m = row.original;

      return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar src={m.avatarUrl} sx={{ width: 36, height: 36 }} />
          <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
            {m.name}
          </Typography>
        </Box>
      );
    },
  },

  {
    accessorKey: "email",
    header: "Email",
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => (
      <Chip
        sx={{
          backgroundColor:
            getValue() === "Activated"
              ? "#EAFFE5"
              : getValue() === "Pending"
                ? "#BB7DFF30"
                : "#FF000021",
          color: "#6B3FA0",
          fontWeight: 600,
          p: 2,
        }}
        label={getValue() as string}
        size="small"
      />
    ),
  },

  {
    accessorKey: "template",
    header: "Template",
    cell: ({ getValue }) => (
      <Chip
        sx={{ p: 2, borderRadius: 50 }}
        label={getValue() as string}
        size="small"
      />
    ),
  },

  {
    id: "team",
    header: "Team",
    cell: ({ row }) => {
      const m = row.original;

      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* LEFT SIDE */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
            {m.teamColors.length > 0 && (
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
                  {m.teamColors.map((c, i) => (
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
                        {m.name.slice(0, 2).toUpperCase()}
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

          {/* RIGHT SIDE (ALWAYS PRESENT) */}
          <IconButton size="small">
            <MoreVertIcon />
          </IconButton>
        </Box>
      );
    },
  },
];

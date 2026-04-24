import { Avatar, Box, Checkbox, Chip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
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
    accessorKey: "template",
    header: "Template",
    cell: ({ getValue }) => <Chip label={getValue() as string} size="small" />,
  },

  {
    id: "team",
    header: "Team",
    cell: ({ row }) => {
      const m = row.original;

      return (
        m.teamColors.length > 0 && (
          <Box
            sx={{
              borderRadius: 50,
              border: "1px solid #C5C5C5",
              p: 0.75,
              maxHeight: 25,
              maxWidth: 70,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box sx={{ flex: 1, display: "flex" }}>
              {m.teamColors.map((c, i) => (
                <Box
                  key={i}
                  sx={{
                    width: 15,
                    height: 15,
                    borderRadius: 50,
                    background: c,
                    textAlign: "center",
                    lineHeight: "15px",
                  }}
                >
                  <Typography sx={{ color: "white", fontSize: 8 }}>
                    {m.name.charAt(0) + m.name.charAt(1)}
                  </Typography>
                </Box>
              ))}
            </Box>
            <AddIcon
              sx={{
                fontSize: 16,
                width: 15,
                height: 15,
                backgroundColor: "#CFCFCF",
                borderRadius: "50%",
              }}
            />
          </Box>
        )
      );
    },
  },
];

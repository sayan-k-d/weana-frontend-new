import {
  Avatar,
  Box,
  Button,
  Chip,
  Icon,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ColumnDef } from "@tanstack/react-table";
import { Directory } from "@/types";

export const columns: ColumnDef<Directory>[] = [
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      const m = row.original;

      return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          {m.avatarUrl ? (
            <Avatar src={m.avatarUrl} sx={{ width: 36, height: 36 }} />
          ) : (
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "#512B7A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}
              >
                {m.name.charAt(0) + m.name.split(" ")[1].charAt(0)}
              </Typography>
            </Box>
          )}
          <Box>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
              {m.name}
            </Typography>
            <Typography sx={{ fontSize: 14 }}>{m.email}</Typography>
          </Box>
        </Box>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => (
      <Chip
        sx={{
          backgroundColor:
            getValue() === "Invited"
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
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const m = row.original;
      return <Typography>{m.role}</Typography>;
    },
  },

  {
    accessorKey: "number_of_cards",
    header: "Number of Cards",
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return <Typography>{value}</Typography>;
    },
  },

  {
    id: "connect_with_users",
    header: "Connect with Users",
    cell: () => {
      return (
        <Button
          variant="contained"
          sx={{
            bgcolor: "#FFFFFF",
            borderRadius: 50,
            px: 3.8,
            py: 0.75,
            fontSize: 13,
            fontWeight: 600,
            boxShadow: "none",
            ml: 0.5,
            border: "2px solid #E2E8F0",
            color: "#000000",
          }}
        >
          Connect
        </Button>
      );
    },
  },
];

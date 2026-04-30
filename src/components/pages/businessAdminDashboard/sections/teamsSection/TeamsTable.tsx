import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

import { Box, Typography } from "@mui/material";
import { columns } from "../../teams/constants/teamColumns";
import { Member, Team } from "@/types";
import React, { useMemo } from "react";

export default function TeamsTable({
  data,
  selected,
  setSelected,
}: {
  data: Team[];
  selected: number[];
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  const memberColumns = useMemo(
    () => columns(selected, setSelected, data),
    [selected, data],
  );
  const table = useReactTable({
    data,
    columns: memberColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "grid",
          alignItems: "center",
          gridTemplateColumns: "44px 1fr 1fr 1fr",
          px: 2,
          py: 1,
          background: "#FAFAFA",
          borderBottom: "1px solid #eee",
        }}
      >
        {table.getHeaderGroups().map((headerGroup) =>
          headerGroup.headers.map((header) => (
            <Typography
              key={header.id}
              sx={{ fontWeight: 600, color: "#6B7280" }}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
            </Typography>
          )),
        )}
      </Box>

      {/* Rows */}
      {table.getRowModel().rows.map((row) => (
        <Box
          key={row.id}
          sx={{
            display: "grid",
            gridTemplateColumns: "44px 1fr 1fr 1fr",
            px: 2,
            py: 1.5,
            borderBottom: "1px solid #F3F4F6",
          }}
        >
          {row.getVisibleCells().map((cell) => (
            <Box key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}

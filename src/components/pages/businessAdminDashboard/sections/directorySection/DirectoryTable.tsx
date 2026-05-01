import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

import { Box, Typography } from "@mui/material";
import { columns } from "../../directory/constants/directoryColumns";
import { Directory, Member } from "@/types";
import React, { useMemo } from "react";

export default function DirectoryTable({ data }: { data: Directory[] }) {
  const directoryColumns = columns;
  const table = useReactTable({
    data,
    columns: directoryColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "grid",
          alignItems: "center",
          gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
          px: 2,
          py: 1,
          background: "#FAFAFA",
          borderBottom: "1px solid #eee",
          color: "#858585",
          "& > :not(:first-of-type)": {
            textAlign: "center",
          },
        }}
      >
        {table.getHeaderGroups().map((headerGroup) =>
          headerGroup.headers.map((header) => (
            <Typography key={header.id} sx={{ fontWeight: 600 }}>
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
            gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
            px: 2,
            py: 1.5,
            borderBottom: "1px solid #F3F4F6",
            "& > :not(:first-of-type)": {
              textAlign: "center",
            },
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

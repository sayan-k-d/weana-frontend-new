"use client";

import AddIcon from "@mui/icons-material/Add";
import SearchBox from "@/components/ui/common/Searchbox";
import { initialDirectories } from "@/lib/constants";
import { Directory, ViewMode } from "@/types";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DirectoryTable from "../sections/directorySection/DirectoryTable";

export default function DirectoryPage() {
  const [directories, setDirectories] =
    useState<Directory[]>(initialDirectories);
  const [selected, setSelected] = useState<number[]>([]);
  const [search, setSearch] = useState<string>("");

  const router = useRouter();

  const filtered: Directory[] = directories.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.email.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F3F2F6",
        fontFamily: 'Inter, "Segoe UI", sans-serif',
        p: 2.2,
      }}
    >
      {/* Breadcrumb + action */}
      <Stack
        direction="row"
        sx={{
          mb: 1.6,
          pl: 0.6,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack
          direction="row"
          spacing={0.7}
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Typography
            sx={{
              fontSize: 16,
              color: "#512B7A",
              fontWeight: 700,
              letterSpacing: "-0.01em",
            }}
          >
            Directory {`(${directories.length})`}
          </Typography>
        </Stack>
      </Stack>
      {/* ── Search ── */}
      <SearchBox search={search} setSearch={setSearch} />

      {/* ── Directory Table ── */}
      <Paper
        elevation={0}
        sx={{
          border: "1px solid #E5E7EB",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <DirectoryTable data={filtered} />
      </Paper>
    </Box>
  );
}

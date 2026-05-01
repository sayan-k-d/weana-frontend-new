import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import GridViewIcon from "@mui/icons-material/GridView";
import type { AddMethod, MethodId } from "@/types";
import Image from "next/image";

// ─── Method list ──────────────────────────────────────────────────────────────

export const ADD_METHODS: AddMethod[] = [
  { id: "email", label: "Add by Email" },
  { id: "csv", label: "Import via CSV" },
  { id: "company", label: "Add Company Pages" },
  { id: "activedirectory", label: "Sync with Active Directory" },
  { id: "eventbrite", label: "Sync with Eventbrite" },
];

// ─── Large icon variants (used in integration cards) ──────────────────────────

export function ActiveDirectoryIconLarge() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="9" height="9" rx="1" fill="#5B2D9E" />
      <rect x="13" y="2" width="9" height="9" rx="1" fill="#5B2D9E" />
      <rect x="2" y="13" width="9" height="9" rx="1" fill="#5B2D9E" />
      <rect x="13" y="13" width="9" height="9" rx="1" fill="#5B2D9E" />
    </svg>
  );
}

export function EventbriteIconLarge() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9.5" stroke="#5B2D9E" strokeWidth="1.6" />
      <text
        x="12"
        y="16.5"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill="#5B2D9E"
        fontFamily="Georgia, serif"
        fontStyle="italic"
      >
        e
      </text>
    </svg>
  );
}

// ─── Sidebar icon dispatcher ──────────────────────────────────────────────────

export function MethodIcon({ id, active }: { id: MethodId; active: boolean }) {
  const color = active ? "#5B2D9E" : "#512B7A";
  switch (id) {
    case "email":
      return <EmailOutlinedIcon sx={{ fontSize: 22, color }} />;
    case "csv":
      return <UploadFileIcon sx={{ fontSize: 22, color }} />;
    case "company":
      return <CorporateFareOutlinedIcon sx={{ fontSize: 22, color }} />;
    case "activedirectory":
      return <GridViewIcon sx={{ fontSize: 22, color }} />;
    case "eventbrite":
      return (
        <Image
          src="/images/eventbrite.png"
          width={22}
          height={22}
          alt="eventbrite"
          unoptimized
        />
      );
  }
}

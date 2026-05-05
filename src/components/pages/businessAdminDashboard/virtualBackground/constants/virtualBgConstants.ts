// ─── Types ────────────────────────────────────────────────────────────────────

export type VBTab = "team-assets" | "library" | "upload";

export interface VBImage {
  id: string;
  src: string;
  alt: string;
}

export interface VirtualBgFormData {
  backgroundName: string;
  color: string;
  showQRCode: boolean;
  showName: boolean;
  showCompany: boolean;
  showJobTitle: boolean;
  showLocation: boolean;
  activeTab: VBTab;
  selectedImageId: string | null;
  uploadedImageUrl: string | null;
  uploadedImageFile: File | null;
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

export const DEFAULT_VIRTUAL_BG_FORM: VirtualBgFormData = {
  backgroundName: "",
  color: "#000000",
  showQRCode: true,
  showName: true,
  showCompany: true,
  showJobTitle: true,
  showLocation: true,
  activeTab: "team-assets",
  selectedImageId: "room-1",
  uploadedImageUrl: null,
  uploadedImageFile: null,
};

// ─── Color swatches ───────────────────────────────────────────────────────────

export const VB_COLOR_OPTIONS = [
  { label: "Transparent", value: "transparent" },
  { label: "Black", value: "#000000" },
  { label: "Red", value: "#E84040" },
  { label: "Orange", value: "#F5873A" },
  { label: "Yellow", value: "#F5C842" },
  { label: "Green", value: "#1A8A3A" },
  { label: "Blue", value: "#3A6EF5" },
  { label: "Purple", value: "#7B3FA0" },
] as const;

// ─── Tabs ─────────────────────────────────────────────────────────────────────

export const VB_TABS: { id: VBTab; label: string }[] = [
  { id: "team-assets", label: "Team Assets" },
  { id: "library", label: "Choose from library" },
  { id: "upload", label: "Upload image" },
];

// ─── Image libraries ──────────────────────────────────────────────────────────

export const LIBRARY_IMAGES: VBImage[] = [
  {
    id: "room-1",
    src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
    alt: "Modern living room",
  },
  {
    id: "room-2",
    src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    alt: "Cozy sofa room",
  },
  {
    id: "room-3",
    src: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&q=80",
    alt: "Bright living space",
  },
  {
    id: "room-4",
    src: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80",
    alt: "Minimal workspace",
  },
  {
    id: "room-5",
    src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80",
    alt: "Office bookshelf",
  },
  {
    id: "room-6",
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    alt: "Contemporary office",
  },
];

// Team assets reuse the same images (swap with real API data)
export const TEAM_ASSET_IMAGES: VBImage[] = LIBRARY_IMAGES.slice(0, 3);

// ─── Field checkboxes config ──────────────────────────────────────────────────

export const VB_FIELD_CHECKBOXES: {
  key: keyof Pick<
    VirtualBgFormData,
    "showQRCode" | "showName" | "showCompany" | "showJobTitle" | "showLocation"
  >;
  label: string;
  subtitle?: string;
}[] = [
  {
    key: "showQRCode",
    label: "QR Code",
    subtitle: "QR Code can be customized in the QR Code section",
  },
  { key: "showName", label: "Name" },
  { key: "showCompany", label: "Company" },
  { key: "showJobTitle", label: "Job Title" },
  { key: "showLocation", label: "Location" },
];

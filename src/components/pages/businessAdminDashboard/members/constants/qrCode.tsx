export interface QRCodeFormData {
  color: string; // hex color for QR dots
  logoFile: File | null;
  logoUrl: string | null; // preview URL
}

export const QR_COLOR_OPTIONS = [
  { label: "Transparent", value: "transparent" },
  { label: "Black", value: "#000000" },
  { label: "Red", value: "#E84040" },
  { label: "Orange", value: "#F5873A" },
  { label: "Yellow", value: "#F5C842" },
  { label: "Green", value: "#1A8A3A" },
  { label: "Blue", value: "#3A6EF5" },
  { label: "Purple", value: "#7B3FA0" },
] as const;

export const DEFAULT_QR_CODE_FORM: QRCodeFormData = {
  color: "#000000",
  logoFile: null,
  logoUrl: null,
};

export interface VirtualBackgroundFormData {
  color: string;
  condensedView: boolean; // Optimal for Microsoft Teams
  showQRCode: boolean;
  showName: boolean;
  showCompany: boolean;
  showJobTitle: boolean;
  showLocation: boolean;
  activeTab: "team-assets" | "library" | "upload";
  selectedImageId: string | null; // id from LIBRARY_IMAGES or team assets
  uploadedImageUrl: string | null;
  uploadedImageFile: File | null;
}

export const DEFAULT_VIRTUAL_BG_FORM: VirtualBackgroundFormData = {
  color: "#000000",
  condensedView: false,
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

// Shared color swatches (same set as QR Code)
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

// Mock library / team-asset images (room backgrounds)
export const LIBRARY_IMAGES = [
  {
    id: "room-1",
    src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80",
    alt: "Modern living room",
  },
  {
    id: "room-2",
    src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
    alt: "Cozy sofa room",
  },
  {
    id: "room-3",
    src: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=400&q=80",
    alt: "Bright living space",
  },
  {
    id: "room-4",
    src: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&q=80",
    alt: "Minimal workspace",
  },
  {
    id: "room-5",
    src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&q=80",
    alt: "Office bookshelf",
  },
  {
    id: "room-6",
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80",
    alt: "Contemporary office",
  },
];

export interface EmailSignatureFormData {
  // Images
  profilePictureUrl: string | null;
  profilePictureFile: File | null;
  companyLogoUrl: string | null;
  companyLogoFile: File | null;
  qrCodeLogoUrl: string | null;
  qrCodeLogoFile: File | null;

  // Banner
  includeBanner: boolean;
  bannerUrl: string | null;
  bannerFile: File | null;
  bannerLink: string;

  // Text fields
  name: string;
  pronouns: string;
  jobTitle: string;
  company: string;
  phoneNumber: string;
  location: string;
  disclaimer: string;

  // Options
  includeQRCode: boolean;
}

export const DEFAULT_EMAIL_SIGNATURE_FORM: EmailSignatureFormData = {
  profilePictureUrl: null,
  profilePictureFile: null,
  companyLogoUrl: null,
  companyLogoFile: null,
  qrCodeLogoUrl: null,
  qrCodeLogoFile: null,

  includeBanner: true,
  bannerUrl: null,
  bannerFile: null,
  bannerLink: "",

  name: "Diego",
  pronouns: "",
  jobTitle: "",
  company: "xyz International Trading Co",
  phoneNumber: "+97234567890",
  location: "",
  disclaimer: "",

  includeQRCode: true,
};

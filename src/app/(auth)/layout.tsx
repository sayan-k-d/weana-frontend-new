import { Box } from "@mui/material";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3.5,
        px: 2,
        py: 6,
        background:
          "radial-gradient(50% 50% at 47.3% 55.53%, #F4E8FF 0%, #F1E2FF 50.48%, #FBF7FF 100%)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Image
          src="/images/logo.png"
          alt="Weana"
          width={140}
          height={42}
          priority
          style={{ height: "auto", width: 140 }}
        />
      </Box>
      {children}
    </Box>
  );
}
